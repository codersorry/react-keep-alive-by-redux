import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './page/home';
import List from './page/list';
import Input from './page/input';
import store from './store';
import { Provider } from 'react-redux';
import { withKeepAlive } from './keep-alive';

// const KeepAliveHome = withKeepAlive(Home, {cacheId: 'Home'})
const KeepAliveList = withKeepAlive(List, {cacheId: 'List', scroll: true})
const KeepAliveInput = withKeepAlive(Input, {cacheId: 'Input'})


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      <Provider store={store}>
          <br />
          <Link to='/'><button>Home</button></Link>
          &nbsp;
          <Link to='/list'><button>List</button></Link>
          &nbsp;
          <Link to='input'><button>Input</button></Link>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/list' element={<KeepAliveList/>} />
            <Route path='/input' element={<KeepAliveInput/>} />
          </Routes>
      </Provider>
    </BrowserRouter>
);


