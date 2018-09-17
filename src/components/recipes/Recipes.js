import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../actions/recipeAction';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import RecipesStyle from '../../styles/RecipesStyle'

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
        <GridList cellHeight={180} >
          { recipes.map((recipe) =>
          <GridListTile key={recipe.id} cols={-1} style={{ height: 'auto' }}>
            <img src={'http://ucp01:5000' + recipe.photo_small_url} />
            <GridListTileBar
              title={recipe.title}
              actionIcon={
                <IconButton href={ '/recipes/' + recipe.id } className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
            )}
          </GridList>
        ) }
        <Button variant="fab" color="primary" aria-label="Add" href="recipes/new" className={classes.button}>
        <AddIcon />
      </Button>
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
