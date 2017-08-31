module.exports = BasicCard;

function BasicCard(front, back) {
  this.front = front,
  this.back = back,
  this.post = function() {
    console.log(this.front);
    console.log(this.back);
  }
}