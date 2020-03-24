import React, { Component, Fragment } from 'react';
//引入轮播图
import { Carousel, WingBlank } from 'antd-mobile';
//引入封装的axios
import axios, { baseURL } from '../../utils/request';
//引入自定义输入框组件
import ZdyInput from '../../components/CityInput/index.js'
//引入本地图片
import img1 from '../../assets//images/nav-1.png'
import img2 from '../../assets//images/nav-2.png'
import img3 from '../../assets//images/nav-3.png'
import img4 from '../../assets//images/nav-4.png'
//样式文件
import NavCss from './index.module.scss'
class Index extends React.Component {
  state = {
    carouselList: [],
    imgHeight: 180,
    //本地图片
    bendiImg: [
      { id: 0, text: "整租", imgSrc: img1 },
      { id: 1, text: "合租", imgSrc: img2 },
      { id: 2, text: "地图找房", imgSrc: img3 },
      { id: 3, text: "去出租", imgSrc: img4 }
    ],
    //租房小组数据
    groups: [],
    //资讯数据
    newsList: []
  }
  componentDidMount() {
    //调用获取轮播图数据
    this.carouselGet()
    //调用获取租房小组数据
    this.groupsGet()
    //获取资讯
    this.newsGet()
  }
  //获取轮播图数据
  carouselGet = async () => {
    let res = await axios.get('/home/swiper')
    this.setState({
      carouselList: res.data.body
    })
  }
  //获取租房小组数据
  groupsGet = async () => {
    let res = await axios.get("/home/groups?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState({
      groups: res.data.body
    })
  }
  newsGet = async () => {
    let res = await axios.get("/home/news?area=AREA%7C88cff55c-aaa4-e2e0")
    this.setState({
      newsList: res.data.body
    })
  }
  render() {
    return (
      <div className={NavCss.index}>
        {/* 输入框组件 */}
        <div className={NavCss.zdyInput}>
        <ZdyInput/>
        </div>
        {/*轮播图部分*/}
        <WingBlank style={{ margin: 0 }}>
          {this.state.carouselList.length && <Carousel
            autoplay
            infinite
          >
            {this.state.carouselList.map(val => (
              <a
                key={val.id}
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
                <img
                  src={baseURL + val.imgSrc}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>}
        </WingBlank>
        {/* 列表导航*/}
        <div className={NavCss.index_nav}>
          {this.state.bendiImg.map(v => <div className={NavCss.nav_item}
            key={v.id}
          >
            <img src={v.imgSrc} alt="" />
            <p>{v.text}</p>
          </div>)}
        </div>
        {/*租房小组 */}
        <div className={NavCss.zufangxz}>
          <div className={NavCss.zu_title}>
            <h4>租房小组</h4>
            <a href="#">更多</a>
          </div>
          <div className={NavCss.zu_content}>
            {this.state.groups.map((v, i) => {
              return <div className={NavCss.zf_item} key={i}>
                <div className={NavCss.left}>
                  <span>{v.title}</span>
                  <span>{v.desc}</span>
                </div>
                <div className={NavCss.right}>
                  <img src={baseURL + v.imgSrc} alt="" />
                </div>
              </div>
            })}
          </div>
        </div>
        {/* 资讯 */}
        <div className={NavCss.zixun}>
          <div className={NavCss.zixun_title}>
            <h4>最新资讯</h4>
          </div>
            {this.state.
              newsList.map((v, i) => {
                return <div className={NavCss.zixun_item} key={i}>
                  <div className={NavCss.img}><img src={baseURL + v.imgSrc} /></div>
                  <div className={NavCss.zixun_wenzi}>
                    <h4>{v.title}</h4>
                    <div>
                      <span>{v.from}</span>
                      <span>{v.date}</span>
                    </div>
                  </div>
                </div>
              })}
        </div>
      </div>
    );
  }
}
export default Index