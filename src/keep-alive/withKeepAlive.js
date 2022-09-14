import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { create, created, changeSrcoll } from './store/cacheAction';
import * as types from './store/cache-types';

const withKeepAlive = (OldComponent, {cacheId = window.location.pathname, scroll}) => {

  return function() {
    const dispatch = useDispatch();
    const cacheDiv = useRef(null)
    const cacheStates = useSelector(state => state.keepAlive )
    const cacheState = cacheStates[cacheId];

    useEffect(() => {
      if(!cacheState) { // 若仓库中不存在当前组件的缓存，则发起创建
        dispatch(create({cacheId, reactElement: <OldComponent/>}))
      }else if(cacheState.status === types.DESTROY) { // 若仓库中存在当前组件缓存，但为已被销毁状态，则移除DOM元素，并且重新发起创建
        const doms = cacheState.doms;
        doms.forEach(dom => {
          dom.parentNode.removeChild(dom);
        }) 
        dispatch(create({cacheId, reactElement: <OldComponent/>}))
      }else if(cacheState && cacheState.doms && cacheState.status === types.CREATED) { // 若仓库中存在当前组件缓存，且状态为已创建，则使用该缓存，append该缓存下的DOM
        const doms = cacheState.doms;
        doms.forEach(dom => cacheDiv.current.appendChild(dom));

        if(scroll && cacheState.scrolls) { // 若开启记录滑动位置，则同时还原每个DOM上的scrollTop
          doms.forEach(dom => {
            dom.scrollTop = cacheState.scrolls[dom]
          })
        }
      }
    }, [cacheState, dispatch])

  
    const saveScroll = useCallback((cacheId, event) => { // 保存每个DOM上滑动的信息，这里直接通过引用地址修改仓库中的数据，可以优化通过dispatch提交修改，做一个防抖
        if(cacheState) {
          const target = event.target;
          const scrolls = cacheState.scrolls;
          scrolls[target] = target.scrollTop;
          // dispatch(changeSrcoll({cacheId,target}))
        }
    }, [cacheState])

    useEffect(() => { // 根据scroll判断是否需要监听滑动，或者取消监听
      if(scroll && cacheDiv.current) {
        const onScroll = saveScroll.bind(null, cacheId);
        cacheDiv.current.addEventListener('scroll', onScroll, true) // 监听捕获阶段
      }else if(!scroll && cacheDiv.current){
        const onScroll = saveScroll.bind(null, cacheId);
        cacheDiv.current.removeEventListener('scroll', onScroll, true) // 监听移除阶段
      }
    }, [saveScroll])
    
    return <>
            {
              !cacheState || Object.keys(cacheStates).length === 0 || cacheState.status === types.CREATE ? 
                <div id={`keepAlive-${cacheId}`} 
                ref={ (divDom) => {
                  if(Object.keys(cacheStates).length !== 0){
                    if(divDom && !cacheState?.doms && cacheState) {
                      const doms = Array.from(divDom.childNodes);
                      dispatch(created({cacheId, doms}))
                    }
                  }
                } }><OldComponent /></div>
              :
                <div id={`cacheComponent-${cacheId}`} ref={cacheDiv} /> 
              
            }
    
    </>

  }
}

export default withKeepAlive