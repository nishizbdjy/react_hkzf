//获取当前位置
export const Gatweizhi = () => {
    return new Promise((reslove, reject) => {
        //获取定位信息
        var myCity = new window.BMap.LocalCity();
        myCity.get(function (result) {
            console.log(11)
            reslove(result)
        });
    })
}