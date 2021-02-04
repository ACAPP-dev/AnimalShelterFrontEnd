import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface AnimalsType {
  animal: {
    animalAge: number;
    animalId: number;
    animalName: string;
    breed: string;
    color: string;
    sex: string;
    species: string;
    temperament: string;
    weight: number;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    backgroundColor: grey[300],
  },
}));

export const AnimalCard = ({ animal }: AnimalsType) => {
  const classes = useStyles();

  return (
    <div>
      <h1>Animal Card!!</h1>
      <Card className={classes.root}>
        <CardHeader
          title={animal.animalName + " - " + animal.species}
          subheader={"Breed: " + animal.breed}
        />
      </Card>
    </div>
  );
};
