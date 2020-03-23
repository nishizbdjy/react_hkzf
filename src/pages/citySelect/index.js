import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import axios from "../../utils/request";
import { connect } from "react-redux";
import CityCss from './index.module.scss'
class citySelect extends Component {
  state = {
    List: []
  }
  componentDidMount = async () => {
    //城市列表
    let CityList = []
    //获取热门城市
    const not = (await axios.get('/area/hot')).data.body
    //将当前城市跟热门城市添加到数组中
    CityList.push({
      name: '当前定位',
      values: [{
        name: this.props.dqCity
      }]
    })
    CityList.push({
      name: '热门城市',
      values: not.map(v => { return { name: v.label } })
    })
    //获取城市列表
    const sycity = (await axios.get('/area/city?level=1')).data.body
    // console.log(sycity)
    //将城市列表排序
    sycity.sort((a, b) => a.short < b.short ? -1 : 1)
    //将城市列表渲染改造添加到数组中
    sycity.forEach((v) => {
      //获取首字母大写
      const Dxzm = (v.short[0]).toUpperCase()
      // console.log(Dxzm)
      //找满足条件的第一个元素 数组中每一项有name="A/B/C"的 
      const index = CityList.findIndex((value) => value.name === Dxzm)
      //判断name属性 ABC... 是否已经存在
      if (index == -1) {
        //不存在 添加
        CityList.push({
          name: Dxzm,
          values: [{ name: v.label }]
        })
      } else {
        //存在 ,将当前项添加到存在的项里面就可以了
        CityList[index].values.push({ name: v.label })
      }
    });
    //赋值到state
    this.setState({
      List: CityList
    })
  }
  render() {
    return (
      <div className={CityCss.citySelect}>
        <NavBar
          mode="light"
          style={{background:"#f6f5f6"}}
          icon={<Icon type="left" color="#505050" size="md" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
        {/* 城市列表 */}
        <div className={CityCss.CityList}>
          {this.state.List.map((v, i) => {
            return <div key={i} className={CityCss.City_item}>
              <div className={CityCss.div}>{v.name}</div>
              {v.values.map((v, i) => {
                return <div key={i} className={CityCss.item_item}>{v.name}</div>
              })}
            </div>
          })}
        </div>
      </div>
    );
  }
}
//获取redux城市
const dangqainchengshi = (state) => {
  return {
    dqCity: state.CityMap.city.name
  }
}
export default connect(dangqainchengshi, null)(citySelect);