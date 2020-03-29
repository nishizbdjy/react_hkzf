import React, { Fragment, Component } from 'react';
import MapCss from './index.module.scss';
import {baseURL} from '../../utils/request'
const FounList = (props) => {
    const v = props.item
    return <Fragment>
        <div className={MapCss.fl_content}>
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
    </Fragment>

}
export default FounList