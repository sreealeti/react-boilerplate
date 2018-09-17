const SidebarDataStyle = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  iconSmall: {
    color: "salmon",
  },
  itemTextSmall: {
    color: "salmon",
  },
  nested: {
    color: "salmon",
    "&:hover": {
      background: "#00acc1",
    },
    paddingLeft: theme.spacing.unit * 4,
  },
});

export default SidebarDataStyle;
