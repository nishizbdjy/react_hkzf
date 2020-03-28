import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from '../../../utils/request';
import FilterPanelCss from './index.module.scss'
import { PickerView } from 'antd-mobile';
//滑动组件
import Huadong from '../../../components/ChoutiHuadong'
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
        currentIndex: -1
    }
    componentDidMount() {
        console.log(this.state.currentIndex)
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
                filterList[3] = [{ title: '户型', children: body.roomType },
                { title: '朝向', children: body.oriented },
                { title: '楼层', children: body.floor },
                { title: '房屋亮点', children: body.characteristic },
                ]
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
            return <><div className={FilterPanelCss.PickerView}> <PickerView
                cols={topList[currentIndex].cols}
                data={filterList[currentIndex]}
            />
                {/* 确认 */}
                <div className={FilterPanelCss.xuanzeqr}>
                    {/* 占位距离 */}
                    <div className={FilterPanelCss.zanwei}>
                    </div>
                    <div className={FilterPanelCss.bottom}>
                        <div className={FilterPanelCss.bottom_cancel} onClick={() => this.setState({ currentIndex: -1 })}>取消</div>
                        <div className={FilterPanelCss.bottom_affirm}>确认</div>
                    </div>
                </div>
            </div>
            </>
        } else if (currentIndex == 3) {
            return <>
                <div className={FilterPanelCss.huadong}>
                    <Huadong weizhi="right">
                        <div className={FilterPanelCss.huadong_cacao}>
                            <div className={FilterPanelCss.huadong_content}>
                                {filterList[currentIndex].map((v, i) => {
                                    return <div className={FilterPanelCss.huadong_item} key={i}>
                                        <div className={FilterPanelCss.item_title}>{v.title}</div>
                                        <div className={FilterPanelCss.item_content}>
                                            {v.children.map((v, i) => {
                                                return <div key={i}>{v.label}</div>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                            <div className={FilterPanelCss.btn}>
                                <div className={FilterPanelCss.quxiao} onClick={() => this.setState({ currentIndex: -1 })}>清除</div>
                                <div className={FilterPanelCss.queren}>确认</div>
                            </div>
                        </div>
                    </Huadong>
                </div>
            </>
        }
    }
    render() {
        return <div>
            <div className={FilterPanelCss.screen}>
                {/* 遮罩层 */}
                <div hidden={this.state.currentIndex == -1} className={FilterPanelCss.zzc}></div>
                {/* 判断索引=3，将层级降级 */}
                <div className={[FilterPanelCss.screen_kuai,this.state.currentIndex == 3 ? FilterPanelCss.gaocj : ''].join(" ")}>
                    {/* 头部列表 */}
                    <div className={FilterPanelCss.screen_top}>
                        {/* 区域 */}
                        {this.state.topList.map((v, i) => <div onClick={() => this.setState({ currentIndex: i })}
                            key={i}
                            className={[i == this.state.currentIndex ? FilterPanelCss.active : '']}>{v.value}< i className={["iconfont", "icon-arrow", i == this.state.currentIndex ? FilterPanelCss.active : ''].join(" ")} /></div>
                        )}
                    </div>
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