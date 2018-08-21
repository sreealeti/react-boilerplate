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

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

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
          return <ListItem button key={menuitem.id}>
            <ListItemIcon>
              {menuitem.icon}
            </ListItemIcon>
            <ListItemText primary={menuitem.label} />
          </ListItem>
        } else {
          return true;
        }
      } else {
        if(canManage(menuitem.link)) {
          return <div key={menuitem.id}>
            <ListItem button onClick={this.handleClick}>
              <ListItemIcon>
                {menuitem.icon}
              </ListItemIcon>
              <ListItemText inset primary={menuitem.label} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { menuitem.submenu.map((submenuitem) => {
                  if(canManage(submenuitem.link)) {
                    return <ListItem button className={classes.nested} key={submenuitem.id}>
                      <ListItemIcon>
                        {submenuitem.icon}
                      </ListItemIcon>
                      <ListItemText inset primary={submenuitem.label} />
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

export default withStyles(styles)(SidebarItems);
