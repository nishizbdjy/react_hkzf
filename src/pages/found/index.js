import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
//输入框
import Input from '../../components/CityInput';
import foundCss from './index.module.scss';
import { connect } from 'react-redux';
import axios from '../../utils/request'
class Found extends Component {
  state = {
    //头部筛选的列表
    topList: ['区域', '方式', '租金', '筛选']
  }
  componentDidMount() {
    //当前城市
    const { name } = this.props.dqweizhi
    //获取城市id
    axios.get('/area/info?name=' + name).then(res => {
      //根据id获取筛选信息
      const { value } = res.data.body
      axios.get('/houses/condition?id=' + value).then(res => {
        console.log(res)
      })
    })

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
        <div className={foundCss.screen}>
          {/* 头部列表 */}
          <div className={foundCss.screen_top}>
            {/* 区域 */}
            {this.state.topList.map((v, i) => <div key={i}>{v}< i className="iconfont icon-arrow"/></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dqweizhi: state.CityMap.city
})


export default connect(mapStateToProps)(Found);