import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    background: `linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3)`,
  },

  container: {
    position: 'absolute',
    top: '30%',
    left: '50%',
  },
  card: {
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
      username: this.state.username,
      password: this.state.password,
    }
    console.log(user);
  }
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
        <Card className={classes.card}>
          <TextField className={classes.textField}
            label="Username"
            onChange={ this.handleChange('username') }
            value={this.state.username}
          />
          <br/>
          <TextField className={classes.textField}
            type="password"
            label="Password"
            onChange={ this.handleChange('password') }
            value={ this.state.password }
          />
          <br/>
          <Button variant="contained" color="primary" className={classes.Button} onClick={ this.handleSubmit }>
            Submit
          </Button>
        </Card>
      </div>

    )
  }

}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
