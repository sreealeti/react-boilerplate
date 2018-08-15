import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import LockIcon from '@material-ui/icons/LockOutlined';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    background: '#303158',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Login extends Component {

  state = {
    username: '',
    password: '',
    errors: {}
  };

  handleChange = name => e => {
    this.setState({
      [name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      auth: {
        username: this.state.username,
        password: this.state.password,
      }
    }
    this.props.loginUser(user);
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render(){

    const { classes } = this.props;
    const { errors } = this.state;

    return(
      <div className={classes.root}>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography variant="display1" >
            ReactApp
          </Typography>
          <TextField className={classes.textField}
            label="Username"
            onChange={ this.handleChange('username') }
            value={this.state.username}
            error={errors.error ? true : false }
          />
          <br/>
          <TextField className={classes.textField}
            type="password"
            label="Password"
            onChange={ this.handleChange('password') }
            value={ this.state.password }
            error={errors.error ? true : false }
          />
          <br/>
          <Button variant="contained" color="primary" className={classes.submit} onClick={ this.handleSubmit }>
            Login
          </Button>
        </Paper>
      </main>
    </div>

    )
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})
export default connect(mapStateToProps, { loginUser })(withStyles(styles)(Login));
