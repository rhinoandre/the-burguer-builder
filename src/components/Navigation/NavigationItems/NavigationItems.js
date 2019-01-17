import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/orders">My Orders</NavigationItem>
            : null}
        {!props.isAuthenticated
            ? <NavigationItem link="/Auth">Authenticate</NavigationItem>
            : <NavigationItem link="/Logout">Logout</NavigationItem>}
    </ul>
);

export default navigationItems;