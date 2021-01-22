import React from "react";

import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

import "./Layout.css";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
  };

  SideDrawerClosingHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <>
        <Toolbar toggleHandler={this.SideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerClosingHandler}
        />
        <main className="Content">{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
