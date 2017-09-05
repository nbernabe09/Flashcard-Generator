var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require("fs");

var clozeArr = [];

function askTask() {
  inquirer.prompt([
    {
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["Create Card", "Quiz", "Exit"]
    }
  ]).then(function (answer) {
    if (answer.task === "Create Card") {
      askCreate();
    } else if (answer.task === "Quiz") {
      askQuiz();
    } else if (answer.task === "Exit") {
      return console.log("Good-bye");
    }
  });
}

function askCreate() {
  inquirer.prompt([
    {
      name: "card",
      type: "list",
      message: "What kind of card would you like to make?",
      choices: ["Basic Card", "Cloze Card", "Go Back"]
    }
  ]).then(function (answer) {
    if (answer.card === "Basic Card") {
      createBasic();
    } else if (answer.card === "Cloze Card") {
      createCloze();
    } else if (answer.card === "Go Back") {
      askTask();
    }
  });
}

function createBasic() {
  inquirer.prompt([
    {
      name: "question",
      message: "Type in the question:"
    }, {
      name: "answer",
      message: "Type in the answer:"
    }
  ]).then(function (answers) {
    var newBasic = new BasicCard(answers.question, answers.answer);
    fs.appendFile("basicArr.txt", "|" + JSON.stringify(newBasic), function(err) {
      if (err) return console.log(err);
    });
    askTask();
  });
}

function createCloze() {
  inquirer.prompt([
    {
      name: "text",
      message: "Type in the statement:"
    }, {
      name: "cloze",
      message: "What would you like to remove from the statement?"
    }
  ]).then(function (answers) {
    var newCloze = new ClozeCard(answers.text, answers.cloze);
    fs.appendFile("clozeArr.txt", "|" + JSON.stringify(newCloze), function(err) {
      if (err) return console.log(err);
    });
    askTask();
  });
}

function askQuiz() {
  inquirer.prompt([
    {
      name: "type",
      type: "list",
      message: "What kind of card would you like to quiz with?",
      choices: ["Basic Card", "Cloze Card", "Go Back"]
    }
  ]).then(function (answer) {
    if (answer.type === "Basic Card") {
      console.log("Basic Card Game");
      basicQuestion();
    } else if (answer.type === "Cloze Card") {
      console.log("Cloze Card Game");
      clozeQuestion();
    } else if (answer.type === "Go Back") {
      askTask();
    }
  });
}

function basicQuestion() {
  fs.readFile("basicArr.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    var basicArr = data.split("|");
    var ranQ = Math.floor(Math.random() * basicArr.length);
    var qInfo = JSON.parse(basicArr[ranQ]);

    inquirer.prompt([
      {
        name: "question",
        message: qInfo.front
      }
    ]).then(function (answer) {
      if (answer.question === qInfo.back) {
        console.log("You are correct!");
        askQuiz();
      } else {
        console.log("Sorry, the correct answer was", qInfo.back);
        askQuiz();
      }
    });
  });
} 

function clozeQuestion() {
  fs.readFile("clozeArr.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    var clozeArr = data.split("|");
    var ranQ = Math.floor(Math.random() * clozeArr.length);
    var qInfo = JSON.parse(clozeArr[ranQ]);

    inquirer.prompt([
      {
        name: "question",
        message: qInfo.partial
      }
    ]).then(function (answer) {
      if (answer.question === qInfo.cloze) {
        console.log("You are correct!");
        askQuiz();
      } else {
        console.log("Sorry,", qInfo.fullText);
        askQuiz();
      }
    });
  });
}

askTask();

// var firstPresident = new BasicCard(
//   "Who was the first president of the United States?",
//   "George Washington"
// );
// console.log("BasicCard:");
// firstPresident.post();
// console.log("--------------------");

// var firstPresidentCloze = new ClozeCard(
//   "George Washington was the first president of the United States.",
//   "George Washington"
// );
// console.log("ClozeCard:");
// firstPresidentCloze.post();
// console.log("--------------------");

// var brokenCloze = new ClozeCard("This doesn't work", "oops");
// console.log("Broken ClozeCard:");
// brokenCloze.post();