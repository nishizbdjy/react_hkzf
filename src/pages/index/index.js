import React, { Component, Fragment } from 'react';
//引入轮播图
import { Carousel, WingBlank } from 'antd-mobile';
//引入封装的axios
import axios, { baseURL } from '../utils/request'
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
    ]
  }
  async componentDidMount() {
    let res = await axios.get('/home/swiper')
    this.setState({
      carouselList: res.data.body
    })
  }
  render() {
    return (
      <div>
        {/*轮播图部分*/}
        <WingBlank style={{margin:0}}>
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
      </div>
    );
  }
}
export default Index