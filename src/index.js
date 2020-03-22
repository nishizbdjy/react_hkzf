import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//字体图标
import "./assets/fonts/iconfont.css"
//引入仓库
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

