var questions = [
    {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      question:
        "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
    },
  ];
  
  var questionEl = document.querySelector("#question");
  var optionListEl = document.querySelector("#option-list");
  var questionResultEl = document.querySelector("#question-result");
  var timerEl = document.querySelector("#timer");
  var introductionEl = document.querySelector("#intro");
  var highScoreList = document.querySelector('#hsList');

  var questionIndex = 0;
  var correctCount = 0;
  
  var scores =[];

  var time = 50;
  var intervalId;
  
  function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "<h1 id='score-response' class='score-response'></h1><form id='score-save'></form>"
    var response = document.querySelector("#score-response");
    var userEntry = document.getElementById('score-save');
    response.innerHTML= "Game over, You scored: " + correctCount + ". Enter Your Initials";
    userEntry.insertAdjacentHTML("afterbegin", "<input type = 'text' name = 'userInit' placeholder = 'Enter initials here' />")
    userEntry.insertAdjacentHTML("beforeend", "<button onclick = 'highScoreHandler()'>Save</button>")
    
  }
  
  function updateTime() {
    time--;
    timerEl.textContent ="Time: " + time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
  function renderQuestion() {
    
    if (time == 0) {
      updateTime();
      return;
    }
  
    intervalId = setInterval(updateTime, 1000);
    
    questionEl.textContent = questions[questionIndex].question;
  
    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";
  
    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;
  
    for (var i = 0; i < choicesLenth; i++) {
      var questionListItem = document.createElement("li");
      questionListItem.className = "question-choices";
      
      var questionButton = document.createElement("button");
      questionButton.className ="choices";
      questionButton.textContent =choices[i];

      questionListItem.append(questionButton);
      optionListEl.append(questionListItem);
    }
  }

  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    renderQuestion();
  }
  
  function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("button")) {
      var answer = event.target.textContent;
      if (answer === questions[questionIndex].answer) {
        questionResultEl.textContent = "Correct";
        correctCount++;
      } else {
        questionResultEl.textContent = "Incorrect";
        time = time - 2;
        timerEl.textContent = time;
      }
    }
    setTimeout(nextQuestion, 2000);
  }

  function startQuiz(){
    introductionEl.remove();
    renderQuestion();
    optionListEl.addEventListener("click", checkAnswer);
  }

  function highScoreHandler(){
      event.preventDefault();
      var userInput = document.querySelector("input[name='userInit']").value;
      if(!userInput){
        alert("You need to fill out your initials!");
        return false;
      }
      
      else{
          var highScoreObj = {
              name: userInput,
              score: correctCount
            };
            createHighScoreLs(highScoreObj);
            alert("name & score saved!");
      }
  }
  function createHighScoreLs(highScoreObj){
    var highScoreLs = document.createElement("li");
    highScoreLs.className = "high-scores";
    highScoreLs.innerHTML = "<h3 class ='User'>" + highScoreObj.name +" - " + highScoreObj.score + "</h3>";
    scores.push(highScoreObj);
    saveScores();
  }
  function saveScores(){
    localStorage.setItem("scores", JSON.stringify(scores)); 
  }
  function loadScores(){
      var savedScores = localStorage.getItem("scores");
      if (!savedScores){
          scores = [];
          return false;
      }

      saveScores = JSON.parse(savedScores);
      for(var i=0; i<savedScores.length; i++){
          createHighScoreLs(savedScores[i]);
      }
  }