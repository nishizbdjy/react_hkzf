import React, { Component, Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
class citySelect extends Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#505050" size="md" />}
          onLeftClick={() =>this.props.history.go(-1)}
        >城市选择</NavBar>
      </div>
    );
  }
}
export default citySelect;