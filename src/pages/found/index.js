import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
//输入框
import Input from '../../components/CityInput';
import foundCss from './index.module.scss';
import axios from '../../utils/request';
//筛选组件
import FilterPanel from './FilterPanel'
class Found extends Component {
  componentDidMount() {

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
        <FilterPanel/>
      </div>
    );
  }
}


export default Found;