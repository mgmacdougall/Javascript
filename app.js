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
const buildHuman = async (data) =>
  (function (info) {
    let human = new Human(info);

    return {
      getHuman: function () {
        return human;
      },
    };
  })(data);

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


// Create Dino Objects
const createDinos = async () => {
  let dinos = await getDinoData();
  return dinos.map((e) => new Dinos(e));
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareHeight = (human, dino)=>{
  return new Promise((resolve, reject)=>{
    try{
      const humanHeight = `${(parseInt(human.feet)*12)+(parseInt(human.inches))}`
      const dinoHeight = parseInt(dino.height);
      resolve(`The ${dino.species} is ${dinoHeight - humanHeight} inches taller than you`)

    }catch(error){
      reject(error)
    }
  })

}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareWeight = (human, dino)=>{
  return new Promise((resolve, reject)=>{
    try{
      const humanWeight = `${parseInt(human.weight)}`;
      const dinoWeight = `${parseInt(dino.weight)}`
      resolve(`The ${dino.species} is ${dinoWeight - humanWeight} lbs heavier than you!!!`)

    }catch(error){
      reject(error)
    }
  })



}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
const compareDiet = (human, dino) =>{
  return new Promise((resolve, reject)=>{
    try{
      let comparison = '';

      if(human.diet.toLowerCase() === dino.diet.toLowerCase()){
        comparison = `Wow you both are both ${human.diet}s`
      }else{
        comparison = `${dino.species} are ${dino.diet}s`
      }
      resolve(comparison)

    }catch(error){
      reject(error)
    }
  })
}

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

const getRandomDino = (dinosaurs)=>{


  let r =  Math.floor(Math.random()*dinosaurs.length)
  // console.log(r)
  return r;
}



button.addEventListener("click", async () => {
  // Get the values out of the form -- move this??? seperate function
    const data = {
      name: name.value,
      feet: feet.value,
      inches: inches.value,
      weight: weight.value,
      diet: diet.value
    };

    const human = await buildHuman(data);
    let theHuman = await human.getHuman();
    const dinos = await createDinos()
    
      const d1 = dinos[getRandomDino(dinos)]
      console.log(d1)
      dinos.splice(d1, 1)

      const d2 = dinos[getRandomDino(dinos)]
      dinos.splice(d2,1)
      console.log(d2)

      const d3 =  dinos[getRandomDino(dinos)]
      dinos.splice(d3,1)
      console.log(d3)

    // Call comparisons
    const test = await compareHeight(theHuman, d1)
    const weightTest = await compareWeight(theHuman, d2)
    const test2 = await compareDiet(theHuman, d3)
    console.log(test, weightTest, test2)

    // Now hide the form.

});