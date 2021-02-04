import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { spacing } from "@material-ui/system";

export const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Typography variant="h6">Fur Haven Animal Shelter</Typography>
      </AppBar>
      <h2>Nav Bar Component</h2>
    </div>
  );
};
