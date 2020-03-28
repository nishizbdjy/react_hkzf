import React, { Component, Fragment } from 'react';
import huadongCss from './index.module.scss'
class Huadong extends Component {
    static defaultProps = {
        weizhi: "right"
    }
    componentDidMount() {
        // const { weizhi } = this.props
    }
    render() {
        return <Fragment>
            <div className={[huadongCss.huadong, huadongCss[this.props.weizhi]].join(' ')}>
                {this.props.children}
            </div>
        </Fragment>
    }
}
export default Huadong