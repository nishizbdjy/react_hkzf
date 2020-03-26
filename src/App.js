import React, { Component } from 'react';
//路由
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
//首页 ：tabBar页
import Home from "../src/pages/home";
//地图找房  非tabBar
import MapFound from './pages/mapFound';
//城市列表  非tabBar
import CitySelect from './pages/citySelect';
//引入连接仓库的
import { connect } from "react-redux";
//分拆action
import { yibuaction } from "./store/fenchaiStore/index.js";
class App extends Component {
  componentDidMount = () => [
    //调用分拆action获取城市
    // this.props.paifachaifen()
  ]
  render() {
    return (
      <div>
        {/* 有城市数据再渲染组件 */}
        {this.props.CityGPS.name && <Router>
          {/* 首页tabBar */}
          <Route path="/home" component={Home}></Route>
          {/* 首页重定向 */}
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          {/* 地图找房 */}
          <Route exact path="/mapFound" component={MapFound}></Route>
          {/* 城市列表 */}
          <Route exact path="/citySelect" component={CitySelect}></Route>
        </Router>}
      </div>
    );
  }
}
//获取城市数据
//重命名
const chongmingming = (state) => {
  //state ：管理员仓库里面的defaultState
  return {
    CityGPS: state.CityMap.city
  }
}
//让所有页面都可以获取到 获取位置(异步action)
const paifa = (dispatch) => {
  return {
    paifachaifen: function (data) {
      dispatch(yibuaction(data))
    }
  }
}
export default connect(chongmingming, paifa)(App);
