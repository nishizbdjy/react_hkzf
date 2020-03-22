//调用封装的百度地图
import { Gatweizhi } from '../../pages/utils/baiduMap'
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
