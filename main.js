var BasicCard = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var inquirer = require('inquirer');
var fs = require("fs");

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
      name: "front",
      message: "Type in the question:"
    }, {
      name: "back",
      message: "Type in the answer:"
    }
  ]).then(function (answers) {
    var newBasic = new BasicCard(answers.front, answers.back);
    newBasic.post();
    askCreate();
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
    newCloze.post();
    askCreate();
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

console.log("Welcome to the Flashcard Generator!");
askTask();
