var fs = require("fs");

module.exports = ClozeCard;

function ClozeCard(text, cloze) {
  this.cloze = cloze,
  this.partial = text.replace(cloze, '...'),
  this.fullText = text,
  this.post = function() {
    if (text.includes(cloze)) {
      console.log("This Cloze Card has been saved.");
      fs.appendFile("clozeArr.txt", "|" + JSON.stringify(this), function(err) {
        if (err) return console.log(err);
      });
    } else {
      console.log("This Cloze Card is written incorrectly. Please try again.");
    }
  }
}