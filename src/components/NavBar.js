import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#0f9095de',
  },
  drawerPaper: {
    position: 'relative',
    width: 200,
    zIndex: 1,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
  },
});


class  NavBar extends Component {
  state = {
    open: false,
  };

  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  render() {
    const { classes }  = this.props;
    return(
      <div className={classes.root}>
        <AppBar className={classes.AppBar}>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              ReactApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.open}
          variant="persistent"
          classes= {{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <MenuItem>Home</MenuItem>
        </Drawer>
      </div>
    )
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
