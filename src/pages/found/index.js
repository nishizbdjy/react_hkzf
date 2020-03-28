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
    {
      // const seasons = [
      //   [
      //     {
      //       label: '2013',
      //       value: '2013',
      //     },
      //     {
      //       label: '2014',
      //       value: '2014',
      //     },
      //   ],
      //   [
      //     {
      //       label: '春',
      //       value: '春',
      //     },
      //     {
      //       label: '夏',
      //       value: '夏',
      //     },
      //   ],
      // ];
      // const season = [
      //   {
      //     label: '春',
      //     value: '春',
      //   },
      //   {
      //     label: '夏',
      //     value: '夏',
      //   },
      // ];
      // const province = [
      //   {
      //     label: '北京',
      //     value: '01',
      //     children: [
      //       {
      //         label: '东城区',
      //         value: '01-1',
      //       },
      //       {
      //         label: '西城区',
      //         value: '01-2',
      //       },
      //       {
      //         label: '崇文区',
      //         value: '01-3',
      //       },
      //       {
      //         label: '宣武区',
      //         value: '01-4',
      //       },
      //     ],
      //   },
      //   {
      //     label: '浙江',
      //     value: '02',
      //     children: [
      //       {
      //         label: '杭州',
      //         value: '02-1',
      //         children: [
      //           {
      //             label: '西湖区',
      //             value: '02-1-1',
      //           },
      //           {
      //             label: '上城区',
      //             value: '02-1-2',
      //           },
      //           {
      //             label: '江干区',
      //             value: '02-1-3',
      //           },
      //           {
      //             label: '下城区',
      //             value: '02-1-4',
      //           },
      //         ],
      //       },
      //       {
      //         label: '宁波',
      //         value: '02-2',
      //         children: [
      //           {
      //             label: 'xx区',
      //             value: '02-2-1',
      //           },
      //           {
      //             label: 'yy区',
      //             value: '02-2-2',
      //           },
      //         ],
      //       },
      //       {
      //         label: '温州',
      //         value: '02-3',
      //       },
      //       {
      //         label: '嘉兴',
      //         value: '02-4',
      //       },
      //       {
      //         label: '湖州',
      //         value: '02-5',
      //       },
      //       {
      //         label: '绍兴',
      //         value: '02-6',
      //       },
      //     ],
      //   },
    // =];
    }
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