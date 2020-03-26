import React, { Component, Fragment } from 'react';
//导航栏
import { NavBar, Icon } from 'antd-mobile';
import MapCss from './index.module.scss';
import { connect } from 'react-redux';
import axios, { baseURL } from '../../utils/request';

const BMap = window.BMap;
let map = null
class mapFound extends Component {
  //房源列表
  state = {
    foundList: [],
    //列表的显示
    ListShow: false
  }
  //闭包实现 +自调用函数 +匿名函数
  bibaoBl = (() => {
    //根据点击次数选择对应的项
    let arr = [
      {
        suoyin: 0,
        zoom: 10,
        cls: "fgw"
      },
      {
        suoyin: 1,
        zoom: 12,
        cls: "fgw"
      },
      {
        suoyin: 2,
        zoom: 15,
        cls: "xiao"
      }
    ]
    let index = -1
    return () => {
      index++
      return arr[index]
    }
  })()
  async  componentDidMount() {
    //redux当前定位信息
    const { name, center } = this.props.dqCity
    map = new BMap.Map("container");    // 创建Map实例
    //当前所在的地理位置
    var point = new BMap.Point(center.lng, center.lat)
    //添加地图类型控件
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    // 设置地图显示的城市 此项是必须设置的
    map.setCurrentCity(name);
    //允许滚动
    map.enableScrollWheelZoom(true);
    //根据城市获取到id
    const res = await axios.get("/area/info?name=" + name)
    //城市 id 
    const { value } = res.data.body;
    //调用生成覆盖物
    this.fugaiwu(value, name)
  }
  //封装覆盖物
  /**
   * @id:当前城市的id
   * @dangqianchengshi:当前城市位置
   */
  fugaiwu = async (id, dangqainweizhi) => {
    //调用闭包的函数
    const kzshuzu = this.bibaoBl()
    // const zoomObj = this.zoomLevels[index]
    // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(dangqainweizhi, kzshuzu.zoom);
    //根据id获取当前区域信息
    const arr = await axios.get('/area/map?id=' + id)
    //房源信息
    const { body } = arr.data;
    //循环添加覆盖物
    body.forEach((v) => {
      const pit = new BMap.Point(v.coord.longitude, v.coord.latitude)
      var opts = {
        position: pit,    // 指定文本标注所在的地理位置
        // offset: new BMap.Size(30, -30)    //设置文本偏移量
      }
      var label = new BMap.Label(`<div class="${MapCss[kzshuzu.cls]}"><div><span>${v.label}</span><span>${v.count}套</span></div></div>`, opts);  // 创建文本标注对象
      label.setStyle({
        background: "none",
        border: "none"
      });
      //注册点击事件
      label.addEventListener("click", () => {
        if (kzshuzu.suoyin < 2) {
          //递归
          this.fugaiwu(v.value, pit)
          //清除之前的覆盖物
          setTimeout(() => {
            map.clearOverlays()
          }, 0)
        } else {
          // 展示房源列表
          console.log(v)
          //根据id查询房源列表
          axios.get('/houses?cityId=' + v.value).then(res => {
            console.log(res)
            this.setState({
              foundList: res.data.body.list,
              ListShow: true
            })
          })

        }
      })
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
          {/* 房源列表 */}
          {this.state.ListShow && <div className={MapCss.foundList}>
            <div className={MapCss.foundLiist_title}><span>房屋列表</span><span>更多房源</span></div>
            <div className={MapCss.foundList_bottom}>
              {this.state.foundList.map((v, i) => {
                return <div className={MapCss.fl_content} key={i}>
                  <div className={MapCss.fl_img}>
                    <img src={baseURL + v.houseImg} />
                  </div>
                  <div className={MapCss.fl_right}>
                    <div className={MapCss.right_title}>{v.title}</div>
                    <div className={MapCss.right_dizhi}>{v.desc}</div>
                    <div className={MapCss.right_tedian}>
                      {v.tags.map((v, i) => {
                        return <span key={i}>{v}</span>
                      })}
                    </div>
                    <div className={MapCss.right_price}><span>{v.price}</span>元/月</div>
                  </div>
                </div>
              })}
            </div>
          </div>}
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