import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipe } from '../../actions/recipeAction';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import GridContainer from "material-kit-react/components/Grid/GridContainer";
import GridItem from "material-kit-react/components/Grid/GridItem";
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import RecipesStyle from '../../styles/RecipesStyle'

class RecipeShow extends Component {
  emptyIngredient = {
    id: null,
    name: '',
    quantity: '',
    _destroy: false
  };

  emptyDirection = {
    id: null,
    step: '',
    _destroy: false
  };
  state = {
    recipe: {
      title: '',
      description: '',
      photo: null,
      ingredients_attributes: [Object.assign({}, this.emptyIngredient)],
      directions_attributes: [Object.assign({}, this.emptyDirection)]
    },
    errors: {}
  };
  componentWillMount() {
    if (this.props.match.params.id) {
      const url = `/api/recipes/${this.props.match.params.id}`
      this.props.getRecipe(url);
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      recipe: nextProps.recipe
    });
  }
  render(){
    const { classes } = this.props;
    const { errors, recipe } = this.state;
    console.log(recipe)
    return(
      <div className={classes.container}>
        { errors.error ? ( <h4> Cannot load data </h4>) : (
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={1} justify="center">
                <GridListTile key={recipe.id} cols={-1} style={{ height: 'auto' }}>
                  <img src={recipe.photo_lg_url} />
                  <GridListTileBar
                    title={recipe.title}
                  />
                </GridListTile>
                <Typography>
                  {recipe.description}
                </Typography>
            </Paper>
              </GridItem>
              <GridItem xs={12} sm={12} md={6} lg={6}>
          <Paper elevation={1} justify="center">
                <Typography variant="display1">
                  Ingredients
                </Typography>
                <Table className={classes.table} >
                  <TableBody>
                    { recipe.ingredients_attributes.map((ingredient, index) => {
                      return <TableRow key={ingredient.id} >
                        <TableCell component="th" scope="row" >
                          {ingredient.name}
                        </TableCell>
                        <TableCell numeric>{ingredient.quantity}</TableCell>
                      </TableRow>}) }
                    </TableBody>
                  </Table>
            </Paper>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                </GridItem>
              </GridContainer>
        ) }
        <Button variant="fab" color="primary" aria-label="Edit" href={'/recipes/' + recipe.id + '/edit' } className={classes.button}>
          <EditIcon />
        </Button>
      </div>

    )
  }

}

RecipeShow.propTypes = {
  classes: PropTypes.object.isRequired,
  getRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  recipe: state.recipes.recipe,
  errors: state.errors
})
export default connect(mapStateToProps, { getRecipe })(withStyles(RecipesStyle)(RecipeShow));
