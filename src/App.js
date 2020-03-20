import React from 'react';
//路由
import { HashRouter as Router, Route, Link } from "react-router-dom";
//找房
import { Found } from "../src/pages/found";
//首页 ：tabBar页
import Home from "../src/pages/home";
//我的
import Mind from "../src/pages/mind";
//资讯
import News from "../src/pages/news";
//地图找房  非tabBar
import MapFound from './pages/mapFound';
//城市列表  非tabBar
import CitySelect from './pages/citySelect';
//引入 tabBar页
// import TabBarExample  from "./pages/index";
function App() {
  return (
    <div>
      <Router>
        {/* 首页tabBar */}
        <Route exact path="/" component={Home}></Route>
        {/* 地图找房 */}
        <Route exact path="/mapFound" component={MapFound}></Route>
        {/* 城市列表 */}
        <Route exact path="/citySelect" component={CitySelect}></Route>
      </Router>
    </div>
  );
}

export default App;
