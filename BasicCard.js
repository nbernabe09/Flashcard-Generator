var fs = require("fs");

module.exports = BasicCard;

function BasicCard(front, back) {
  this.front = front,
  this.back = back,
  this.post = function() {
    console.log("This Basic Card has been saved.");
    fs.appendFile("basicArr.txt", "|" + JSON.stringify(this), function(err) {
      if (err) return console.log(err);
    });
  }
}