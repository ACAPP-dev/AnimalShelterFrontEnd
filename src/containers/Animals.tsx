import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { AnimalCard } from "../components/AnimalCard";
// import { fchmod } from "fs";

const animal = [
  {
    animalAge: 0,
    animalId: 0,
    animalName: "",
    breed: "",
    color: "",
    sex: "",
    species: "",
    temperament: "",
    weight: 0,
  },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grid: {
      justifyContent: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    heading: {
      textAlign: "center",
    },
  })
);
export const Animals = () => {
  const [animals, setAnimals] = useState<typeof animal>(Object);
  const [term, setTerm] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    axios
      .get("http://3.128.180.190:8080/animalshelter/animals")
      .then((response) => {
        console.log(response.data);
        setAnimals([...response.data]);
      });
  }, [term]);

  const getAnimalCards = () => {
    if (animals.length > 0) {
      return animals.map((animal) => {
        return <AnimalCard animal={animal} />;
      });
    } else {
      return null;
    }
  };

  return (
    <div>
      <h1 className={classes.heading}>Available for Adoption</h1>
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={3}>
          {getAnimalCards()}
        </Grid>
      </div>
    </div>
  );
};
