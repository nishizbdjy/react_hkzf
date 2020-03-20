import React from "react";
import { TabBar } from 'antd-mobile';
//路由
import { HashRouter as Router, Route, Link } from "react-router-dom";
//引入tabBar页面
//真正的首页           防止有个index文件，写全路径
import Index from '../index/index.js'
//找房
import Found from "../found";
//我的
import Mind from "../mind";
//资讯
import News from "../news";
class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
    //初始化默认显示
    if(this.props.location.pathname==='/home'){
      //跳转到默认项
      this.props.history.push("/home/index") 
    }
  }
  render() {
    //获取当前URL
    console.log(this.props)
    const { location } = this.props
    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#25ba7c"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={<i className="iconfont icon-ind"></i>}
            selectedIcon={<i className="iconfont icon-ind"></i>}
            selected={location.pathname === '/home/index'}
            onPress={() => { this.props.history.push("/home/index") }}
          >
            {/* 组件内容路由 */}
            <Route component={Index} path="/home/index"></Route>
          </TabBar.Item>
          <TabBar.Item
            title="找房"
            key="found"
            icon={<i className="iconfont icon-findHouse"></i>}
            selectedIcon={<i className="iconfont icon-findHouse"></i>}
            selected={location.pathname === '/home/found'}
            onPress={() => { this.props.history.push("/home/found") }}
          >
            {/* 组件内容路由 */}
            <Route component={Found} path="/home/found"></Route>
          </TabBar.Item>
          <TabBar.Item
            title="资讯"
            key="news"
            icon={<i className="iconfont icon-infom"></i>}
            selectedIcon={<i className="iconfont icon-infom"></i>}
            selected={location.pathname === '/home/news'}
            onPress={() => { this.props.history.push("/home/news") }}
          >
            {/* 组件内容路由 */}
            <Route component={News} path="/home/news"></Route>
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="mind"
            icon={<i className="iconfont icon-my"></i>}
            selectedIcon={<i className="iconfont icon-my"></i>}
            selected={location.pathname === '/home/mind'}
            onPress={() => { this.props.history.push("/home/mind") }}
          >
            {/* 组件内容路由 */}
            <Route component={Mind} path="/home/mind"></Route>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default TabBarExample