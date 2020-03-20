import React, { Component, Fragment } from 'react';
//引入轮播图
import { Carousel, WingBlank } from 'antd-mobile';
// import axios from 'axios'
//引入封装的axios
import axios,{baseURL} from '../utils/request'
class Index extends React.Component {
  state = {
    carouselList:[],
    imgHeight: 180,
  }
 async componentDidMount() {
 let res = await axios.get('/home/swiper')
   this.setState({
     carouselList: res.data.body
   })
  }
  render() {
    return (
      <WingBlank>
        {this.state.carouselList.length&&<Carousel
          autoplay
          infinite
        >
          {this.state.carouselList.map(val => (
            <a
              key={val.id}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={baseURL+val.imgSrc}
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
    );
  }
}
export default Index