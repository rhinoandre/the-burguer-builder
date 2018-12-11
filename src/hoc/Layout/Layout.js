import React, { Component } from 'react';
import PropType from 'prop-types';

import Aux from '../Auxi/Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer:false
    }

    SideDrawerToggleHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }

    SideDrawerClosedHandler = () => {
        this.setState(( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.SideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

Layout.PropType = {
    showSideDrawer: PropType.bool.isRequired
};

export default Layout;