import React from 'react';
import { useDispatch } from 'react-redux';
import { destroy } from '../keep-alive/store/cacheAction';

const Home = (props) => {
  const dispatch = useDispatch()
  return (
    <div>
      Home
      <br />
      <button onClick={ () => { dispatch(destroy({cacheId:'List'})) } } >重置List</button>
        &nbsp;
      <button onClick={ () => { dispatch( destroy({cacheId:'Input'}) )}} >重置Input</button>
    </div>
  )
}

export default Home