import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    //background: `linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)`,
    background: '#1ddde8',
  },

  container: {
    position: 'absolute',
    top: '30%',
    left: '50%',
  },
  paper: {
    position: 'absolute',
    minWidth: '25%',
    minHeight: '30%',
    top: '30%',
    left: '35%',
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%',
    margin: '1%',
  },
  Button: {
    margin: 25,
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
        <Paper className={classes.paper}>
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
          <Button variant="contained" color="primary" className={classes.Button} onClick={ this.handleSubmit }>
            Login
          </Button>
        </Paper>
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
