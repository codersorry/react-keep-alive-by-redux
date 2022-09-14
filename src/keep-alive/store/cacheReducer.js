import * as typs from './cache-types';

const initState = {}

const keepAlive = (cacheStates = initState, action) => {
  const { payload } = action;
  switch(action.type){
    case typs.CREATE :
      return {
        ...cacheStates,
        [payload.cacheId]: {
          status: typs.CREATE,
          cacheId: payload.cacheId,
          scrolls: {},
          test:1,
          reactElement: payload.reactElement,
          doms: null
        }
      };
      case typs.CREATED :
        return {
          ...cacheStates,
          [payload.cacheId]: {
            ...cacheStates[payload.cacheId],
            status: typs.CREATED,
            doms: payload.doms
          }
        };
      case typs.DESTROY :
        return {
          ...cacheStates,
          [payload.cacheId]: {
            ...cacheStates[payload.cacheId],
            status: typs.DESTROY,
          }
        };
      case typs.SCROLL : 
      return {
        ...cacheStates,
        [payload.cacheId]: {
          ...cacheStates[payload.cacheId],
          scrolls: {
            ...cacheStates[payload.cacheId].scrolls,
            [payload.target]: payload.target.scrollTop
          }
        }
      }
    default :
      return cacheStates
  }
}

export default keepAlive