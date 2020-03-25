import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import axios from "../../utils/request";
import { connect } from "react-redux";
import CityCss from './index.module.scss'
//可视化插件
import { List } from 'react-virtualized';
class citySelect extends Component {
  state = {
    //城市列表
    List: [],
    //字母列表
    letter: [],
    //渲染项索引
    XuanIndex: 0
  }
  componentDidMount = async () => {
    //字母列表
    let letter = []
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
    //添加字母列表
    letter.push('#', '热')
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
        //添加字母列表
        letter.push(Dxzm)
      } else {
        //存在 ,将当前项添加到存在的项里面就可以了
        CityList[index].values.push({ name: v.label })
      }
    });
    //赋值到state
    this.setState({
      List: CityList,
      //添加字母列表
      letter
    })
  }
  //插件渲染的函数
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    return (
      <div className={CityCss.City_item} key={key} style={style}>

        <div className={CityCss.div}>{this.state.List[index].name}</div>
        <div>
          {this.state.List[index].values.map((v, i) => {
            return <div key={i} className={CityCss.item_item}>{v.name}</div>
          })}
        </div>
      </div>
    );
  }
  //当前项行高的事件
  itemgao = ({ index }) => {
    //判断最后一个高一点
    if (index == this.state.List.length - 1) {
      return 50 + this.state.List[index].values.length * 40
    }
    //当前项的高度 = 标题40 + (当前项的数组长度 * 40) 注：高度必须跟css一致
    return 40 + this.state.List[index].values.length * 40
  }
  //点击字母切换索引
  handleZimu = (XuanIndex) => {
    //修改索引
    this.setState({ XuanIndex })
  }
  //滑动触发
  onRowsRendered = ({ startIndex }) => {
   //赋值
    this.setState({ XuanIndex: startIndex });
  }
  render() {
    return (
      <div className={CityCss.citySelect}>
        <NavBar
          mode="light"
          style={{ background: "#f6f5f6" }}
          icon={<Icon type="left" color="#505050" size="md" />}
          onLeftClick={() => this.props.history.go(-1)}
        >城市选择</NavBar>
        {/* 城市列表 */}
        <div className={CityCss.CityList}>
          <List
            width={window.screen.width}
            height={window.screen.height - 45}
            rowCount={this.state.List.length}
            rowHeight={this.itemgao}
            rowRenderer={this.rowRenderer}
            onRowsRendered={this.onRowsRendered}
            scrollToIndex={this.state.XuanIndex}
            scrollToAlignment="start"
          />
          {/* 右边字母快捷 */}
          <div className={CityCss.City_zimu}>
            {this.state.letter.map((v, i) => {
              return <div key={i} onClick={() => this.handleZimu(i)}
                className={i == this.state.XuanIndex ? CityCss.pitch : ''}>{v}</div>
            })}
          </div>
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