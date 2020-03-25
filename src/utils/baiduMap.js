//获取当前位置
export const Gatweizhi = () => {
    return new Promise((reslove, reject) => {
        //获取定位信息
        var myCity = new window.BMap.LocalCity();
        myCity.get(function (result) {
            //将"市"去掉
            result.name = result.name.substring(0, result.name.length - 1)
            reslove(result)
        });
    })
}
//地址逆解析
export const Nijiexi = ({ city, address }) => {
    //判断是否有详细地址
    if (!address) {
        //没有就等于城市
        address = city
    }
    return new Promise((reslove, reject) => {
        var myGeo = new window.BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(address, function (point) {
            if (point) {
                reslove(point)
            } else {
                // alert("您选择地址没有解析到结果!");
                reject(point)
            }
        }, city);
    })

}