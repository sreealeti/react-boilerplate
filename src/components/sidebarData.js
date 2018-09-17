import React from 'react';
import PropTypes from 'prop-types';
import menuData from './../config/menu';
import { canManage } from 'redux-cancan';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SidebarDataStyle from '../styles/sidebarDataStyle'

class SidebarItems extends React.Component {
  state = {open: false};
  handleClick = () => {
    this.setState(state=>({open: !state.open}));
  };
  render(){
    const {classes} = this.props;

    const menuItems = menuData.map((menuitem) => {
      if(!menuitem.submenu) {
        if(canManage(menuitem.link)) {
          return <ListItem button component="a" href={menuitem.link} className={classes.nested} key={menuitem.id}>
            <ListItemIcon className={classes.iconSmall}>
              {menuitem.icon}
            </ListItemIcon>
            <ListItemText disableTypography className={classes.itemTextSmall} primary={menuitem.label} />
          </ListItem>
        } else {
          return true;
        }
      } else {
        if(canManage(menuitem.link)) {
          return <div key={menuitem.id}>
            <ListItem button className={classes.nested} onClick={this.handleClick}>
              <ListItemIcon className={classes.iconSmall}>
                {menuitem.icon}
              </ListItemIcon>
              <ListItemText inset disableTypography className={classes.itemTextSmall} primary={menuitem.label} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { menuitem.submenu.map((submenuitem) => {
                  if(canManage(submenuitem.link)) {
                    return <ListItem button component="a" href={submenuitem.link} className={classes.nested} key={submenuitem.id}>
                      <ListItemIcon className={classes.iconSmall}>
                        {submenuitem.icon}
                      </ListItemIcon>
                      <ListItemText inset disableTypography className={classes.itemTextSmall} primary={submenuitem.label} />
                    </ListItem>
                  } else {
                    return true;
                  }})}
                </List>
              </Collapse>
            </div>
        } else {
          return true;
        }
      }
    });

    return(
      <div>
        {menuItems}
      </div>
    );
  }
}
SidebarItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(SidebarDataStyle)(SidebarItems);
