import React, { useState, useEffect } from "react";
import axios from "axios";
import { AnimalCard } from "../components/AnimalCard";
import { fchmod } from "fs";

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

export const Animals = () => {
  const [animals, setAnimals] = useState<typeof animal>(Object);
  const [term, setTerm] = useState<string>("");

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
      <h1>Animals Container!</h1>
      <p>{JSON.stringify(animals)}</p>
      <div>{getAnimalCards()}</div>
    </div>
  );
};
