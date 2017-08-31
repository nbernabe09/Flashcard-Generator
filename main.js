var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');

var firstPresident = new BasicCard(
  "Who was the first president of the United States?",
  "George Washington"
);
console.log("BasicCard:");
firstPresident.post();
console.log("--------------------");

var firstPresidentCloze = new ClozeCard(
  "George Washington was the first president of the United States.",
  "George Washington"
);
console.log("ClozeCard:");
firstPresidentCloze.post();
console.log("--------------------");

var brokenCloze = new ClozeCard("This doesn't work", "oops");
console.log("Broken ClozeCard:");
brokenCloze.post();