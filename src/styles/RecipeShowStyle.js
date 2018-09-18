const RecipeShowStyle = theme => ({
   root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
   },
   card: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
  button: {
    position: "fixed",
    bottom: "60px",
    right: "60px"
  },

});
export default RecipeShowStyle;
