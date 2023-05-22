// JavaScript code to generate the grid items
const gridContainer = document.getElementById("gridContainer");
const tilesData = [
  [3, 3, 3],
  [3, 14, 3],
  [3, 3, 3],
];

const nextSequenceElement = document.getElementById("nextSequence");
const nextTextSequenceElement = document.getElementById("nextTextSequence");
const sequence = [2, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4, 3, 4]; // The sequence array
const textSequence = [
  "The first set of blue meteors usually go on 5 and 7. (Start by clicking on the Top Golden button first)",
  "This set should be spread bottom, on 5, 6 and 7. The party should push below 138 after this set to drop golden meteor at the bottom immediatly (click Bot Golden after placing this set).",
  "The bottom tiles shouldn't be up yet so we have to make sure we don't break anything with this 4 meteors. We usually drop two at 11, or 1, one at 12, and the last one on the remaining top tile (most of the times it will be double 11, 12, and 1). Shandi mech should happen after this.",
  "Once the worship mechanic is over, stay near top and break either 1 or 11 stacking these three meteors. The group should quiclky push below 88 after this to get the next top golden meteor (Click on Top Golden after placing all three).",
  "After this, you can be flexible or follow the spread and break pattern, groups usually have good damage now, but to be sure, drop two at 5 and two at 7.",
  "Now we stack all three on 5 or 7 and push to drop the last golden meteor at 6.",
  "If the group doesn't push fast enough to get to 2nd shapes here, just spread the meteors top and you'll be fine.",
  "Always look at the glow on the tiles to make sure you don't break more than 3!",
  "...",
  '"peer pressure is cyber bullying" -Aiyo',
  "...",
  '"there is no I in team"',
  "...",
  "You still here? lol",
  "...",
  "!burp",
  "...",
  ,
  ,
  ,
  ,
  ,
];

const toggleCheckbox = document.getElementById("toggleCheckbox");
const bodyElement = document.body;
const contentDivOne = document.getElementById("textOne");
const contentDivTwo = document.getElementById("textTwo");
contentDivOne.style.color = "#5e5e66";
contentDivTwo.style.color = "#5e5e66";

let sequenceIndex = 0;

let clickCount = 0;
let savedValue = 5000;

document.getElementById("saveButton").addEventListener("click", () => {
  const inputElement = document.getElementById("numericInput");
  const value = parseInt(inputElement.value, 10);

  if (!isNaN(value)) {
    savedValue = value * 1000;
    console.log("Value saved:", savedValue);
  } else {
    console.log("Invalid input. Please enter a numerical value.");
  }
});

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.dataset.hp = tilesData[i][j]; // Set initial HP
    gridItem.addEventListener("click", handleClick); // Add click event listener
    updateTileColor(gridItem); // Update tile color based on initial HP
    gridContainer.appendChild(gridItem);
  }
}

const topGoldenMeteorButton = document.getElementById("topGoldenMeteorButton");
const botGoldenMeteorButton = document.getElementById("botGoldenMeteorButton");
const resetButton = document.getElementById("resetButton");

topGoldenMeteorButton.addEventListener("click", () =>
  handleGoldenMeteorClick([0, 1, 3, 4])
);
botGoldenMeteorButton.addEventListener("click", () =>
  handleGoldenMeteorClick([4, 5, 7, 8])
);
resetButton.addEventListener("click", resetHP);

function handleClick() {
  const hp = parseInt(this.dataset.hp); // Get the current HP
  const reduceAmount = 1; // Default reduction amount for regular clicks
  if (hp > 0) {
    this.dataset.hp = hp - reduceAmount; // Decrease HP by the determined amount
    updateTileColor(this); // Update tile color based on updated HP
    if (hp - reduceAmount <= 0) {
      this.classList.add("dead"); // Add "dead" class when HP reaches or goes below 0
      startTimer(this); // Start the timer to restore HP after 10 seconds
    }
  }
  checkGameOver();
}

function handleGoldenMeteorClick(tileIndices) {
  tileIndices.forEach((index) => {
    const tile = gridContainer.children[index];
    const hp = parseInt(tile.dataset.hp);
    if (hp > 0) {
      tile.dataset.hp = hp - 3; // Decrease HP by 3 for Golden Meteor clicks
      updateTileColor(tile); // Update tile color based on updated HP
      if (hp - 3 <= 0) {
        tile.classList.add("dead"); // Add "dead" class when HP reaches or goes below 0
        startTimer(tile); // Start the timer to restore HP after 10 seconds
      }
    }
  });
  checkGameOver();
}

function updateNextSequence() {
  nextSequenceElement.textContent = sequence[sequenceIndex];
  nextTextSequenceElement.textContent = textSequence[sequenceIndex];
}

updateNextSequence();

// Add an event listener to the document to track clicks
document.addEventListener("click", (event) => {
  const target = event.target;

  // Check if the click occurred inside the grid
  if (target.classList.contains("grid-item")) {
    clickCount++;

    if (clickCount === sequence[sequenceIndex]) {
      sequenceIndex++;
      clickCount = 0;

      if (sequenceIndex >= sequence.length) {
        sequenceIndex = 0;
      }

      updateNextSequence();
    }
  }
});

function startTimer(tile) {
  const timer = setTimeout(() => {
    tile.dataset.hp = 3; // Restore HP to the tile
    tile.classList.remove("dead"); // Remove "dead" class
    updateTileColor(tile); // Update tile color
    clearTimeout(timer); // Clear the timer
  }, savedValue);
}

function resetHP() {
  const tiles = gridContainer.getElementsByClassName("grid-item");
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (i === 4) {
      tile.dataset.hp = 14; // Restore 14 HP to the center tile
    } else {
      tile.dataset.hp = 3; // Reset HP to the default value for other tiles
    }
    tile.classList.remove("dead"); // Remove "dead" class
    updateTileColor(tile); // Update tile color
  }
  sequenceIndex = 0;
  updateNextSequence();
  updateNextTextSequence();
}

function checkGameOver() {
  const tiles = gridContainer.getElementsByClassName("grid-item");
  let deadCount = 0;

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (tile.classList.contains("dead")) {
      deadCount++;
    }
  }

  if (deadCount > 3 || tiles[4].classList.contains("dead")) {
    alert("You wiped, bozo");
  }
}

function updateTileColor(tile) {
  const hp = parseInt(tile.dataset.hp);
  const maxHP = 14; // Maximum HP value
  const brightness = (hp / maxHP) * 70 + 30; // Calculate brightness value based on HP
  if (hp > 0) {
    tile.style.backgroundColor = `hsl(207, 100%, ${brightness}%)`; // Set tile color using HSL
  } else {
    tile.style.backgroundColor = "black"; // Set tile color to black when HP reaches 0
  }
}
