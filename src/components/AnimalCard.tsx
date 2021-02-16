import React, { useState, useEffect } from "react";
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
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { typography } from "@material-ui/system";

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
    width: 500,
    //height: 550,
    margin: 4,
    maxWidth: 700,
    backgroundColor: grey[300],
  },
  media: {
    height: 0,
    //paddingTop: "56.25%", //16:9
    paddingTop: "80%",
  },
}));

export const AnimalCard = ({ animal }: AnimalsType) => {
  const classes = useStyles();

  const [dogImage, setImage] = useState("");

  useEffect(() => {
    const urlBreed = animal.breed
      .split(" ")
      .map((word) => word.toLowerCase())
      .reverse()
      .join("-");
    axios

      .get(`https://dog.ceo/api/breed/${urlBreed}/images/random`)
      .then((response) => setImage(response.data.message))
      .catch((err) => {
        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((response) => setImage(response.data.message));
      });
  }, [animal.breed]);

  return (
    <div>
      <Grid item xs={6} sm={3}>
        <Card className={classes.root}>
          <CardHeader
            title={animal.animalName + " - " + animal.species}
            subheader={"Breed: " + animal.breed}
          />
          <CardMedia
            className={classes.media}
            image={dogImage}
            title="Animal"
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="subtitle1">
                  Gender: {animal.sex}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Age: {animal.animalAge}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Weight: {animal.weight}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant="subtitle1">
              Temperament: {animal.temperament}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
