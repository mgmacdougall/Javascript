// Get form data

const button = document.getElementById("btn");
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");


// Create Human Object
function Human(data) {
  let {name, feet, inches, weight, diet} = data
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
}

// Use IIFE to get human data from form/revealing module pattern.
const buildHuman = (data) =>
  (function (info) {
    let human = new Human(info);

    return {
      getHuman: function () {
        return human;
      },
    };
  })(data);

button.addEventListener("click", () => {
  // Get the values out of the form
  const data = {
    name: name.value,
    feet: feet.value,
    inches: inches.value,
    weight: weight.value,
    diet: diet.value,
  };
  buildHuman(data)
});

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
const createDinos = async () => {
  let dinos = await getDinoData();
  dinos.forEach((i) => console.log(i));
  return dinos.map((e) => new Dinos(e));
};



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
