import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../../utils/request';
import FilterPanelCss from './index.module.scss'
import { PickerView } from 'antd-mobile';
class FilterPanel extends Component {
    state = {
        //头部筛选的列表
        topList: [{ value: '区域', cols: 3 }, { value: '方式', cols: 1 }, { value: '租金', cols: 1 }, { value: '筛选', cols: -1 }],
        //筛选数据源
        filterList: [
            [], [], [], []
        ],
        //当前显示的变量
        show: false,
        //当前显示项的索引
        currentIndex: 3
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
                const { body } = res.data;
                let filterList = []
                //区域
                filterList[0] = [body.area, body.subway]
                //方式
                filterList[1] = body.rentType
                //租金
                filterList[2] = body.price
                //筛选
                //赋值
                this.setState({
                    filterList
                })
                console.log(this.state.filterList)
            })
        })
    }
    //渲染函数
    xuanran = () => {
        const { topList, filterList, currentIndex } = this.state
        if (currentIndex == -1) {
            return <></>
        } else if ([0, 1, 2].includes(currentIndex)) {
            return <><PickerView
                cols={topList[currentIndex].cols}
                data={filterList[currentIndex]}
            />
                {/* 确认 */}
                <div className={FilterPanelCss.xuanzeqr}>
                    {/* 占位距离 */}
                    <div className={FilterPanelCss.zanwei}>
                    </div>
                    <div className={FilterPanelCss.bottom}>
                        <div className={FilterPanelCss.bottom_cancel} onClick={() => this.setState({currentIndex:-1})}>取消</div>
                        <div className={FilterPanelCss.bottom_affirm}>确认</div>
                    </div>
                </div>
            </>
        } else if (currentIndex == 3) {
            return <>
            
            </>
        }
    }
    render() {
        return <div>
            <div className={FilterPanelCss.screen}>
                {/* 头部列表 */}
                <div className={FilterPanelCss.screen_top}>
                    {/* 区域 */}
                    {this.state.topList.map((v, i) => <div onClick={() => this.setState({ currentIndex: i })}
                        key={i}
                        className={[i == this.state.currentIndex ? FilterPanelCss.active : '']}>{v.value}< i className={["iconfont", "icon-arrow", i == this.state.currentIndex ? FilterPanelCss.active : ''].join(" ")} /></div>
                    )}
                </div>
                {/* pickerView插件 */}
                {this.xuanran()}
            </div>
        </div>
    }
}
const mapStateToProps = (state) => ({
    dqweizhi: state.CityMap.city
})


export default connect(mapStateToProps)(FilterPanel);