import React from 'react';
import ReactDOM from 'react-dom';
//全局引入rem.js和清除默认样式
import './assets/js/remScale.js'
import './assets/css/reset.css'
import './index.css';
import App from './App';
// 路由模式
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
