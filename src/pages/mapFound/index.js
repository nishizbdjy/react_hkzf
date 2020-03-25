import React, { Component, Fragment } from 'react';
//导航栏
import { NavBar, Icon } from 'antd-mobile';
import MapCss from './index.module.scss';
import { connect } from 'react-redux'
class mapFound extends Component {
  componentDidMount = () => {
    //redux当前定位信息
    const { name, center } = this.props.dqCity
    var map = new window.BMap.Map("container");    // 创建Map实例
    map.centerAndZoom(new window.BMap.Point(center.lng, center.lat), 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new window.BMap.NavigationControl());    
    map.addControl(new window.BMap.ScaleControl());    
    map.addControl(new window.BMap.OverviewMapControl());    
    map.addControl(new window.BMap.MapTypeControl());    
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity(name);
    //允许滚动
    map.enableScrollWheelZoom(true);
  }
  render() {
    return (
      // <Fragment>地图找房</Fragment>
      <div className={MapCss.content}>
        {/* 导航栏 */}
        <NavBar
          style={{ background: "#f6f5f6" }}
          mode="light"
          icon={<Icon type="left" size="md" color="#505050" />}
          onLeftClick={() => this.props.history.go(-1)}
        >地图找房</NavBar>
        <div className={MapCss.Map}>
          <div id="container" className={MapCss.xianshiMap}>dd</div>
        </div>
      </div>
    );
  }
}
//获取redux当前城市
const GetmapFoundCity = (state) => {
  return {
    dqCity: state.CityMap.city
  }
}
export default connect(GetmapFoundCity, null)(mapFound);