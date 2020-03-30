//调用封装的百度地图
import { Gatweizhi,Nijiexi } from '../../utils/baiduMap'
// export const huoquweizhi = (data) => {
//     //返回告诉管理员的对象
//     return {
//         type: 'Map',
//     }
// }
export const yibuaction = () => {
    // 1 返回一个函数 还有一个形参 dispatch
    return (dispatch) => {
        // 2 发送异步请求
        Gatweizhi().then((res) => {
            dispatch({
                type: "Map",
                res
            })
        })
    }
}
//选择城市
export const yibuxuanzeCity=(cityName)=>{
    //cityName :当前城市
    return (dispatch)=>{
        //逆解析到经纬度
        Nijiexi({city:cityName}).then(res=>{
            dispatch({
                type: "Map",
                res:{center:res,name:cityName}
            })
        })
    }
}
//清空当前城市
export const qingkongCity =()=>{
    return {
        type:"qingkong"
    }
}