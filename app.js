// Get form data DOM elements
const button = document.getElementById("btn");
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");
const diet = document.getElementById("diet");

// Helper function to create the image path for an item provided
const imagePath = (item) => {
  return `./images/${item.toLowerCase()}.png`;
};

// Builds the fact details for a dino compared to human
const buildFacts = async (data, human) => {
  for (let c of data) {
    if (c.fact instanceof Function) {
      c.fact = await c.fact(human, c);
    }
  }
};

// Create Human Object
function Human(data) {
  let { name, feet, inches, weight, diet } = data;
  this.species = name;
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
  this.fact = "";
  this.image = imagePath("human");
}

// Use IIFE to get human data from form/revealing module pattern
const buildHuman = async (data) =>
  (function (info) {
    let human = new Human(info);

    return {
      getHuman: function () {
        return human;
      },
    };
  })(data);

// Gets the dino data from external file
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
  this.image = imagePath(this.species);
}

// Create Dino Objects
const createDinos = async () => {
  let dinos = await getDinoData();

  let filteredDinos = dinos.filter(
    (dino) => dino.species.toLowerCase() !== "pigeon" // ignore the pigeon in data
  );
  return filteredDinos.map((e) => new Dinos(e));
};

// Create the Pigeon data
function Pigeon(data) {
  const { species, weight, height, diet, where, when, fact } = data;
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
  this.image = imagePath(this.species);
}

// create the Pigeon
const createPigeon = async () => {
  let data = await getDinoData();

  // filter for the pigeon only
  let pigeon = data.filter((item) => item.species.toLowerCase() === "pigeon");
  return pigeon.map((p) => new Pigeon(p));
};

// Create Dino Compare Method 1
const compareHeight = (human, dino) => {
  return new Promise((resolve, reject) => {
    try {
      const humanHeight = `${
        parseInt(human.feet) * 12 + parseInt(human.inches)
      }`;
      const dinoHeight = parseInt(dino.height);
      resolve(
        `The ${dino.species} is ${
          dinoHeight - humanHeight
        } inches taller than you`
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Create Dino Compare Method 2
const compareWeight = (human, dino) => {
  return new Promise((resolve, reject) => {
    try {
      const humanWeight = `${parseInt(human.weight)}`;
      const dinoWeight = `${parseInt(dino.weight)}`;
      resolve(
        `The ${dino.species} is ${
          dinoWeight - humanWeight
        } lbs heavier than you!!!`
      );
    } catch (error) {
      reject(error);
    }
  });
};

// Create Dino Compare Method 3
const compareDiet = (human, dino) => {
  return new Promise((resolve, reject) => {
    try {
      let comparison = "";

      if (human.diet.toLowerCase() === dino.diet.toLowerCase()) {
        comparison = `Wow you both are both ${human.diet}s!!!!`;
      } else {
        comparison = `${dino.species} are ${dino.diet}s and won't eat you!`;
      }
      resolve(comparison);
    } catch (error) {
      reject(error);
    }
  });
};

// Get the grid reference from DOM
const grid = document.getElementById("grid");

// Generate Tiles for each Dino in dinosaursay
const buildTiles = (info) => {
  // Add tiles to DOM
  let tile = document.createElement("div");
  tile.classList.add("grid-item");

  // Text here
  let textNode = document.createElement("h3");
  let text = document.createTextNode(`${info.species}`);
  textNode.appendChild(text);

  // Image Here
  let image = document.createElement("img");
  image.src = `${info.image}`;

  // Fact here
  let para = document.createElement("p");
  let fact = document.createTextNode(`${info.fact}`);
  para.appendChild(fact);

  tile.appendChild(textNode);
  tile.appendChild(image);
  tile.appendChild(para);
  grid.appendChild(tile);
};

const buildGrid = async (human) => {
  // Add human at idx 4
  let theHuman = await human.getHuman();

  // Add the pigeon at index 8
  const thePigeon = await createPigeon();

  // Create the dinos items.
  const dinos = await createDinos();
  let resultFacts = randomDinoFact(dinos);
  await buildFacts(resultFacts, theHuman);

  // Initialize a 3 * 3 grid.
  let grid = new Array(9);

  // Populate tiles in grid. Place items by index.
  // Place Objects in correct cell in the grid.
  // Assign directly to avoid loop.  Faster insert!
  grid[0] = resultFacts[0];
  grid[1] = resultFacts[1];
  grid[2] = resultFacts[2];
  grid[3] = resultFacts[3];
  grid[4] = theHuman;
  grid[5] = resultFacts[4];
  grid[6] = resultFacts[5];
  grid[7] = resultFacts[6];
  grid[8] = thePigeon[0];

  // Build the tiles with the information.
  let i = 0;
  while (i <= grid.length - 1) {
    buildTiles(grid[i]);
    i++;
  }
};

// Remove form from screen
const form = document.getElementById("dino-compare");
const hideForm = () => {
  form.remove();
};
// On button click, prepare and display infographic

// Create Random fact for 3 dinos
const randomDinoFact = (dinosaurs) => {
  let min = 0;
  let count = 0;
  let result = [];
  let methods = [compareDiet, compareHeight, compareWeight];

  while (result.length < 3) {
    let t = Math.floor(Math.random() * (dinosaurs.length - min) + min);
    dinosaurs[t].fact = methods[count];
    result.push(dinosaurs[t]);
    dinosaurs.splice(t, 1);
    count++;
  }
  return dinosaurs.concat(result);
};

button.addEventListener("click", async () => {
  // Get the values out of the form -- move this??? seperate function
  const data = {
    name: name.value,
    feet: feet.value,
    inches: inches.value,
    weight: weight.value,
    diet: diet.value,
  };
  hideForm();

  const theHuman = await buildHuman(data);

  buildGrid(theHuman);
});
