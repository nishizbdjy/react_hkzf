import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
//输入框
import Input from '../../components/CityInput';
import foundCss from './index.module.scss';
import axios from '../../utils/request';
//筛选组件
import FilterPanel from './FilterPanel';
//列表组件
import FoundList from '../../components/FoundList';
import { connect } from 'react-redux';
//可视化组件
import { List } from 'react-virtualized'
class Found extends Component {
  state = {
    list: [],//城市列表
    //筛选条件
    screen: [],
    //总长度
    Count: 0
  }
  //筛选条件的分页
  params = {
    cityId: '',//城市id
    start: 1, //开始
    end: 20,//结束
  }
  //请求开关
  IsLoadding = false
  async componentDidMount() {
    const { cityName } = this.props
    console.log(cityName)
    //获取城市id
    let id = (await axios.get('/area/info?name=' + cityName)).data.body.value
    //赋值
    this.params.cityId = id
    //调用获取房源列表
    this.getList()
  }
  //接收筛选组件的函数,子组件会调用
  handleFiltrate = (screen) => {
    // 重置 页码 和 数组 
    this.params.start = 1;
    this.params.end = 20;
    //给筛选条件赋值  、列表清空
    this.setState({ screen, list: [] })
    //调用筛选请求
    this.getList()
  }
  //筛选获取列表
  getList = async () => {
    const { screen } = this.state
    const res = (await axios.get("/houses", { params: { ...this.params, ...screen } })).data.body
    //总长度
    const { list } = res
    //赋值 push
    this.setState({ list: [...this.state.list, ...list], Count: res.count })
    //开关设为空闲
    this.IsLoadding = false
  }
  //可视化插件滑动事件
  huadong = ({ clientHeight, scrollHeight, scrollTop }) => {
    console.clear()
    console.log("clientHeight    " + clientHeight)
    console.log("scrollHeight    " + scrollHeight)
    console.log("scrollTop   " + scrollTop)
    const { Count, list } = this.state
    //（滚动长列表的高度-滚动区域高度）-滚动条距离底部的高度 <5触发触底加载
    const tiaojian = scrollHeight - clientHeight - scrollTop < 5
    //  是否还有下一页 开始条数不能大于总条数（还可以判断长度与总数）
    const hasMore = this.params.start < Count;
    //list长度不为零才触发事件
    const hasLength = this.state.list.length > 0;
    //节流阀
    const kaiguan = this.IsLoadding == false
    if (tiaojian && hasMore && hasLength && kaiguan) {
      this.IsLoadding = true
      //加载下一页
      this.params.start += 20
      this.params.end += 20
      //请求
      this.getList()
    } else {
      console.log('不满足条件')
    }
  }
  //可视化组件渲染函数
  Listhanshu = ({ style, key, index }) => {
    return <div style={style} className={foundCss.Found_List_item} key={key}><FoundList item={this.state.list[index]} />
    </div>
  }
  render() {
    return (
      <div>
        <div className={foundCss.top}>
          <NavBar
            style={{ background: "#f6f5f6" }}
            mode="light"
            icon={<Icon type="left" size="md" color="#b6b6b6" />}
            onLeftClick={() => this.props.history.go(-1)}
          >地图找房
        </NavBar>
          {/* 输入框组件 */}
          <div className={foundCss.input}>
            <Input style={{ color: "#0eb26e" }} />
          </div>
        </div>
        {/* 筛选列表 */}
        <div className={foundCss.shaixuanzujian}>
          <FilterPanel shaixuan={this.handleFiltrate} />
        </div>
        {/* 房源列表展示 */}
        {/* 可视化组件 */}
        <div className={foundCss.Found_List}>
          <List
            width={window.screen.width}
            height={window.screen.height - 135}
            rowCount={this.state.list.length}
            rowHeight={128}
            rowRenderer={this.Listhanshu}
            onScroll={this.huadong}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cityName: state.CityMap.city.name
})


export default connect(mapStateToProps)(Found);