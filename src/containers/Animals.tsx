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
      minWidth: 150,
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
  const [narrowSpecies, setNarrowSpecies] = useState<string>("any");
  const [narrowBreed, setNarrowBreed] = useState<string>("any");
  const [narrowGender, setNarrowGender] = useState<string>("any");
  const [breedList, setBreedList] = useState<string[]>([]);

  const classes = useStyles();

  const handleNarrow = (event: React.ChangeEvent<{ value: unknown }>) => {
    // setSearch(event.target.value as string);
    console.log(event.target);
    switch ((event.target as any).name) {
      case "species":
        setNarrowSpecies((event.target as any).value);
        break;
      case "breed":
        setNarrowBreed((event.target as any).value);
        break;
      case "gender":
        setNarrowGender((event.target as any).value);
        break;
    }
  };

  const handleSelection = (e: any) => {};

  useEffect(() => {
    axios
      .get("http://3.128.180.190:8080/animalshelter/animals")
      .then((response) => {
        console.log(response.data);
        setAnimals([...response.data]);
      });

    axios
      .get("http://3.128.180.190:8080/animalshelter/breeds")
      .then((response) => {
        setBreedList([...response.data]);
      });
  }, [term]);

  const getAnimalCards = () => {
    let refinedAnimals: typeof animal = animals;

    if (animals.length > 0) {
      if (narrowSpecies !== "any") {
        refinedAnimals = [
          ...refinedAnimals.filter(
            (animal) => animal.species === narrowSpecies
          ),
        ];
      }
      if (narrowBreed !== "any") {
        refinedAnimals = [
          ...refinedAnimals.filter((animal) => animal.breed === narrowBreed),
        ];
      }
      if (narrowGender !== "any") {
        refinedAnimals = [
          ...refinedAnimals.filter((animal) => animal.sex === narrowGender),
        ];
      }
      return refinedAnimals.map((animal) => {
        return <AnimalCard animal={animal} />;
      });
    } else {
      return null;
    }
  };

  const getBreeds = () => {
    if (breedList.length > 0) {
      return breedList.map((breed) => {
        return (
          <MenuItem value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </MenuItem>
        );
      });
    }
  };

  return (
    <div>
      <h1 className={classes.heading}>Available for Adoption</h1>
      <div className="form">
        <FormControl className={classes.formControl}>
          <InputLabel id="narrow-species">Narrow Type</InputLabel>
          <Select
            labelId="narrow-species"
            onChange={handleNarrow}
            value={narrowSpecies}
            name="species"
            autoWidth
          >
            <MenuItem value={"any"}>Any</MenuItem>
            <MenuItem value={"dog"}>Dog</MenuItem>
            <MenuItem value={"cat"}>Cat</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="narrow-breed">Narrow Breed</InputLabel>
          <Select
            labelId="narrow-breed"
            onChange={handleNarrow}
            value={narrowBreed}
            name="breed"
            autoWidth
          >
            <MenuItem value={"any"}>Any</MenuItem>
            {getBreeds()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="narrow-gender">Narrow Gender</InputLabel>
          <Select
            labelId="narrow-gender"
            onChange={handleNarrow}
            value={narrowGender}
            name="gender"
            autoWidth
          >
            <MenuItem value={"any"}>Any</MenuItem>
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={3}>
          {getAnimalCards()}
        </Grid>
      </div>
    </div>
  );
};
