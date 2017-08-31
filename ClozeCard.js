module.exports = ClozeCard;

function ClozeCard(text, cloze) {
  this.cloze = cloze,
  this.partial = text.replace(cloze, '...'),
  this.fullText = text,
  this.post = function() {
    if (text.includes(cloze)) {
      console.log(this.cloze);
      console.log(this.partial);
      console.log(this.fullText);
    } else {
      console.log("This ClozeCard is written incorrectly.");
    }
  }
}