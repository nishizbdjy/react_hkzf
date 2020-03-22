import React, { Component } from 'react';
//样式文件
import InputCss from "./index.module.scss"
class CityInput extends Component {
    render() {
        //获取定位信息
        var myCity = new window.BMap.LocalCity();
        myCity.get(function (result) {
          console.log(result);
        });
        return <div className={InputCss.zdy_input}>
            <div className={InputCss.left}>
                <div className={InputCss.City}>
                    <span>上海</span>
                    <i className={["iconfont", "icon-arrow", InputCss.arrow].join(" ")}></i>
                </div>
                <div className={InputCss.input}>
                    <i className={["iconfont", "icon-seach", InputCss.seach].join(" ")}></i>
                    <span>请输入小区或地址</span>
                </div>
            </div>
            <div className={InputCss.right}>
                <i className={["iconfont", "icon-map", InputCss.map].join(" ")}></i>
            </div>
        </div>
    }
}
export default CityInput