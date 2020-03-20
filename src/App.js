import React from 'react';
//路由
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
//首页 ：tabBar页
import Home from "../src/pages/home";
//地图找房  非tabBar
import MapFound from './pages/mapFound';
//城市列表  非tabBar
import CitySelect from './pages/citySelect';
function App() {
  return (
    <div>
      <Router>
        {/* 首页tabBar */}
        <Route  path="/home" component={Home}></Route>
        {/* 首页重定向 */}
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route>
        {/* 地图找房 */}
        <Route exact path="/mapFound" component={MapFound}></Route>
        {/* 城市列表 */}
        <Route exact path="/citySelect" component={CitySelect}></Route>
      </Router>
    </div>
  );
}

export default App;
