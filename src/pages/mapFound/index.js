import React, { Component, Fragment } from 'react';
//导航栏
import { NavBar, Icon } from 'antd-mobile';
import MapCss from './index.module.scss';
import { connect } from 'react-redux';
import axios from '../../utils/request';

const BMap = window.BMap
class mapFound extends Component {
  componentDidMount = async () => {
    //redux当前定位信息
    const { name, center } = this.props.dqCity
    console.log(this.props.dqCity)
    var map = new BMap.Map("container");    // 创建Map实例
    //当前所在的地理位置
    var point = new BMap.Point(center.lng, center.lat)
    map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
    //添加地图类型控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity(name);
    //允许滚动
    map.enableScrollWheelZoom(true);
    //根据城市获取到id
    const res = await axios.get("/area/info?name=" + name)
    //城市 id 
    const { value } = res.data.body;
    //根据id获取当前区域信息
    const arr = await axios.get('/area/map?id=' + value)
    //房源信息
    const { body } = arr.data;
    console.log(body)
    //循环添加覆盖物
    body.forEach((v) => {
      const pit = new BMap.Point(v.coord.longitude,v.coord.latitude)
      var opts = {
        position: pit,    // 指定文本标注所在的地理位置
        offset: new BMap.Size(30, -30)    //设置文本偏移量
      }
      var label = new BMap.Label(`<div class="${MapCss.fgw}"><div><span>${v.label}</span><span>${v.count}套</span></div></div>`, opts);  // 创建文本标注对象
      label.setStyle({
         background:"none",
         border:"none"
      });
      map.addOverlay(label);
    })
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