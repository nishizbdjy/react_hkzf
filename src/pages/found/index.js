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
import { connect } from 'react-redux'
class Found extends Component {
  state = {
    //筛选条件的分页
    params: {
      cityId: '',//城市id
      start: 1, //开始
      end: 20,//结束
    },
    list: [],//城市列表
    //筛选条件
    screen: []
  }
  async componentDidMount() {
    const { cityName } = this.props
    //获取城市id
    let id = (await axios.get('/area/info?name=' + cityName)).data.body.value
    //赋值
    this.setState({ city: id })
    //调用获取房源列表
    this.getList()
  }
  //接收筛选组件的函数,子组件会调用
  handleFiltrate = (data) => {
    console.log(data)
  }
  //筛选获取列表
  getList = async () => {
    const { params, screen } = this.state
    const res = (await axios.get("/houses", { Params: { ...params, ...screen } })).data.body
    const { list } = res
    //赋值
    this.setState({ list: list })
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
        <div className={foundCss.Found_List}>
          {this.state.list.map((v, i) => {
            return <div className={foundCss.Found_List_item} key={i}><FoundList item={v} />
            </div>
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cityName: state.CityMap.city.name
})


export default connect(mapStateToProps)(Found);