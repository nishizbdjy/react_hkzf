//引入管理员
import reducer from "./reducer";
//中间件
//创建仓库
import { createStore,applyMiddleware  } from "redux";
//异步
import thunk from "redux-thunk";
//与管理员一起导出去
export default createStore(reducer,applyMiddleware(thunk));