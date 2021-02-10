import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { AnimalCard } from "../components/AnimalCard";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
      marginTop: 2,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    heading: {
      textAlign: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      textAlign: "center",
      marginLeft: 50,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);
export const Animals = () => {
  const [animals, setAnimals] = useState<typeof animal>(Object);
  const [term, setTerm] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [selection, setSelection] = useState<string>("");

  const classes = useStyles();

  const handleSearch = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(event.target.value as string);
    console.log(search);
  };

  const handleSelection = (e: any) => {};

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
      <div className="form">
        <form>
          <FormControl className={classes.formControl}>
            <InputLabel>Narrow Search</InputLabel>
            <Select onChange={handleSearch} value={search}>
              <MenuItem value={1}>Species</MenuItem>
              <MenuItem value={2}>Breed</MenuItem>
              <MenuItem value={3}>Gender</MenuItem>
            </Select>
          </FormControl>
        </form>
      </div>
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={3}>
          {getAnimalCards()}
        </Grid>
      </div>
    </div>
  );
};
