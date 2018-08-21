import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';

import { withStyles } from '@material-ui/core/styles';
import GridContainer from "material-kit-react/components/Grid/GridContainer";
import GridItem from "material-kit-react/components/Grid/GridItem";
import Button from "material-kit-react/components/CustomButtons/Button";
import Card from "material-kit-react/components/Card/Card";
import CardBody from "material-kit-react/components/Card/CardBody";
import CardHeader from "material-kit-react/components/Card/CardHeader";
import CardFooter from "material-kit-react/components/Card/CardFooter";
import CustomInput from "material-kit-react/components/CustomInput/CustomInput";
import loginPageStyle from "material-kit-react/assets/jss/material-kit-react/views/loginPage";

class Login extends Component {

  state = {
    username: '',
    password: '',
    errors: {},
    cardAnimaton: "cardHidden"
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
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
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
      <div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[this.state.cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>ReactApp</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      inputProps={{
                        type: "text"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        error: errors.error ? true : false ,
                        onChange: this.handleChange('username')
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="password"
                      inputProps={{
                        type: "password"
                      }}
                      formControlProps={{
                        fullWidth: true,
                        error: errors.error ? true : false ,
                        onChange: this.handleChange('password')
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={ this.handleSubmit }>
                      Login
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
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
export default connect(mapStateToProps, { loginUser })(withStyles(loginPageStyle)(Login));
