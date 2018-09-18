import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Login from './../Login';
import { logoutUser } from '../../actions/authentication';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Hidden from '@material-ui/core/Hidden';

import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';

import SidebarItems from './sidebarData';
import LayoutStyle from './../../styles/LayoutStyle';


class Layout extends React.Component {
  state = {
    open: false,
  };
  toggleDrawer = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };
  handleMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {isAuthenticated} = this.props.auth;
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const barLinks = (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, this.state.open)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
              className={classNames(classes.menuButton, this.state.open )}
            >
              { this.state.open ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex} noWrap>
              aletilabs
            </Typography>
            <div>
              <Button className={classes.button}
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle className={classes.iconSmall}/>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.onLogout.bind(this)}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={this.state.open}
            onClose={this.toggleDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              KeepMounted: true,
            }}
          >
            <SidebarItems />
          </Drawer>

        </Hidden>
        <Hidden smDown>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar} />
            <SidebarItems />
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )

    return (
      <div>
        {isAuthenticated ? barLinks : <Login /> }
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(withStyles(LayoutStyle, { withTheme: true })(Layout));
