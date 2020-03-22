//引入管理员
import reducer from "./reducer";
//中间件
//创建仓库          compose//浏览器插件
import { createStore,applyMiddleware,compose } from "redux";
//异步
import thunk from "redux-thunk";
//添加浏览器插件支持代码
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
//与管理员一起导出去
const store = createStore(reducer, enhancer);
export default  store;