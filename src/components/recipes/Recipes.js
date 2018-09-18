import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../actions/recipeAction';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

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
          <div className={classes.root}>
            { recipes.map((recipe) =>
              <ButtonBase
                focusRipple
                key={recipe.id}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                href={ '/recipes/' + recipe.id }
                style={{
                  width: '200px',
                }}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${recipe.photo_lg_url})`,
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subheading"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {recipe.title}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            )}
          </div>
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
