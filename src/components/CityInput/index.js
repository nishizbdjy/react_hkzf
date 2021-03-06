import React, { Component } from 'react';
//样式文件
import InputCss from "./index.module.scss";
//引入连接仓库的
import { connect } from "react-redux";
//增强获取路由对象的
import {withRouter} from "react-router-dom"
const  CityInput = React.memo( (props)=>{
    return <div className={InputCss.zdy_input}>
    <div className={InputCss.left}>
        <div className={InputCss.City} onClick={(()=>{props.history.push("/citySelect")})}>
            <span>{(props.CityGPS.name)}</span>
            <i className={["iconfont", "icon-arrow", InputCss.arrow].join(" ")}></i>
        </div>
        <div className={InputCss.input}>
            <i className={["iconfont", "icon-seach", InputCss.seach].join(" ")}></i>
            <span>请输入小区或地址</span>
        </div>
    </div>
    <div className={InputCss.right} onClick={(()=>{props.history.push("/mapFound")})}>
        <i style={props.style} className={["iconfont", "icon-map", InputCss.map].join(" ")}></i>
    </div>
</div>
})
//重命名
const chongmingming = (state) => {
    //state ：管理员仓库里面的defaultState
    return {
        CityGPS: state.CityMap.city
    }
}
//
//将全局数据映射到组件身上
const connFunc = connect(chongmingming, null);
export default connFunc(withRouter(CityInput));