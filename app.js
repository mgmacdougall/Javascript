// let dinos = [];
const getDinoData = async () => {
  const fetchedData = await fetch("./dino.json");
  const data = await fetchedData.json();
  return data.Dinos;
};

// Create Dino Constructor
function Dinos(dino) {
  const { species, weight, height, diet, where, when, fact } = dino;
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Test Code
const testData = {
  species: "Triceratops",
  weight: 13000,
  height: 114,
  diet: "herbavor",
  where: "North America",
  when: "Late Cretaceous",
  fact: "First discovered in 1889 by Othniel Charles Marsh",
};

// Create Dino Objects
const createDinos = async() =>{
    let dinos = await getDinoData();
    dinos.forEach(i => console.log(i))
    return dinos.map((e)=> new Dinos(e))
}

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
