import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(5),
  },
}));

export const NavBar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className="navbar" position="static">
        <Toolbar>
          <NavLink exact to="/">
            <HomeIcon className={classes.homeButton} />
            <Typography className={classes.title} variant="h6">
              Fur Haven Animal Shelter
            </Typography>
          </NavLink>
          <NavLink exact to="/animals">
            <Typography className={classes.title} variant="h6">
              View Animals
            </Typography>
          </NavLink>
          <NavLink exact to="/">
            <Typography className={classes.title} variant="h6">
              View Users
            </Typography>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
};
