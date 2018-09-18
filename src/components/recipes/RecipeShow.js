import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipe, delRecipe } from '../../actions/recipeAction';
import { BASE_API_URL } from '../../config/constant';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardContent,
  CardMedia,
  Icon,
  IconButton,
  Toolbar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GridContainer from "material-kit-react/components/Grid/GridContainer";
import GridItem from "material-kit-react/components/Grid/GridItem";

import RecipeShowStyle from '../../styles/RecipeShowStyle'

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

  handleDelSubmit = (e) => {
    e.preventDefault();
      const url =  BASE_API_URL + `/recipes/${this.props.match.params.id}`
    if (window.confirm(`Are you sure you want to delete "${this.state.recipe.title}"`)){
      this.props.delRecipe(url);
      this.props.history.push('/recipes');
    }
  }
  componentWillMount() {
    if (this.props.match.params.id) {
      const url = `http://ucp01:5000/api/recipes/${this.props.match.params.id}`
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
    return(
      <div className={classes.root}>
        { errors.error ? ( <h4> Cannot load data </h4>) : (
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6} lg={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={'http://ucp01:5000' + recipe.photo_lg_url}
                  title={recipe.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    {recipe.title}
                  </Typography>
                  <Typography component="p">
                    {recipe.description}
                  </Typography>
                </CardContent>
              </Card>
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
                <Paper elevation={1} justify="center">
                  <Typography variant="display1">
                    Directions
                  </Typography>
                  <Table className={classes.table} >
                    <TableBody>
                      { recipe.directions_attributes.map((direction, index) => {
                        return <TableRow key={direction.id} >
                          <TableCell component="th" scope="row" >
                            {direction.step}
                          </TableCell>
                        </TableRow>}) }
                      </TableBody>
                    </Table>
                  </Paper>
                </GridItem>
              </GridContainer>
        ) }
        <Toolbar className={classes.button}>
        <Button variant="fab" color="secondary" aria-label="delete" onClick={this.handleDelSubmit}>
          <DeleteIcon />
        </Button>
        <Button variant="fab" color="primary" aria-label="Edit" href={'/recipes/' + recipe.id + '/edit' }>
          <EditIcon />
        </Button>
      </Toolbar>
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
export default connect(mapStateToProps, { getRecipe, delRecipe })(withStyles(RecipeShowStyle)(RecipeShow));
