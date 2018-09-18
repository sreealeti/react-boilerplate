const RecipeFormStyle = theme => ({
  button: {
    position: "fixed",
    bottom: "64px",
    right: "64px"
  },
  card: {
  },
  TextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 190,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  input: {
  },
  headview: {
    ...theme.typography.button,
    backgroundColor: theme.palette.common.salmon,
    padding: theme.spacing.unit,
  },
});

export default RecipeFormStyle;
