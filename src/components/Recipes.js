import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllRecipes } from '../actions/recipeAction';

import { withStyles } from '@material-ui/core/styles';
import GridContainer from "material-kit-react/components/Grid/GridContainer";
import GridItem from "material-kit-react/components/Grid/GridItem";
import Card from "material-kit-react/components/Card/Card";
import CardBody from "material-kit-react/components/Card/CardBody";
import CardHeader from "material-kit-react/components/Card/CardHeader";

import RecipesStyle from '../styles/RecipesStyle'

class Recipes extends Component {
  state = {
    recipes: [],
    errors: {}
  };

  componentDidMount() {
    this.props.getAllRecipes();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.recipes.recipes
    });
  }

  render(){
    const { classes } = this.props;
    const { errors, recipes } = this.state;

    return(
      <div className={classes.container}>
        { errors.error ? ( <h4> Cannot load data </h4>) : (
        <GridContainer justify="center">
          { recipes.map((recipe) =>
          <GridItem key={recipe.id} xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="primary" >
                <h5>{ recipe.title }</h5>
              </CardHeader>
              <CardBody>
                <p>{ recipe.description }</p>
              </CardBody>
            </Card>
          </GridItem>
            )}
          </GridContainer>
        ) }
      </div>

    )
  }

}

Recipes.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  recipes: state.recipes,
  errors: state.errors
})
export default connect(mapStateToProps, { getAllRecipes })(withStyles(RecipesStyle)(Recipes));
