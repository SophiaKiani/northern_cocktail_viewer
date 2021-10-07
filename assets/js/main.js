const quizTabBtn = $("#quiz-tab");
const formTabBtn = $("#form_tab");
const quizContainer = $("#quiz");
const formContainer = $("#form");
const quizWelcomeSection = $(".welcome_section");
const quizQuestionSection = $(".quiz_section")
const startBtnEl = $(".start_btn");
const restartBtnEl = $(".restart_btn");
const nextBtnEl = $(".next-button-container")

const questions = [
  {
    question: "What is the name of a coffee drink containing whiskey?",
    optionA: "A Spanish coffee",
    optionB: "A Russian coffee",
    optionC: "An Irish coffee",
    optionD: "None of the above",
    correctOption: "optionC"
  },
  {
    question: "What temperature should you taste gin?",
    optionA: "Room temperature",
    optionB: "Really cold",
    optionC: "Super hot",
    optionD: "Boiling hot",
    correctOption: "optionA"
  },
  {
    question: "Where does vodka orinate from?",
    optionA: "Spain",
    optionB: "Portugal",
    optionC: "Japan",
    optionD: "Poland",
    correctOption: "optionD"
  },
  {
    question: "Where does the majority of the world's rum come from?",
    optionA: "Canada",
    optionB: "Puerto Rico",
    optionC: "Brazil",
    optionD: "Ethiopia",
    correctOption: "optionB"
  },
  {
    question: "What is the name of a virgin cocktail?",
    optionA: "A frogtail",
    optionB: "A mocktail",
    optionC: "A tail",
    optionD: "A bigtail",
    correctOption: "optionB"
  },
  {
    question: "Whst cocktail is garnished with an olive?",
    optionA: "Canada",
    optionB: "Puerto Rico",
    optionC: "Brazil",
    optionD: "Ethiopia",
    correctOption: "optionC"
  },
  {
    question: "A Sex on the Beach cocktail without orange is called?",
    optionA: "Canada",
    optionB: "Woo Woo",
    optionC: "Coo Coo",
    optionD: "Choo Choo",
    correctOption: "optionB"
  },
  {
    question: "Where does the Mojito originate from?",
    optionA: "Africa",
    optionB: "Australia",
    optionC: "Brazil",
    optionD: "Cuba",
    correctOption: "optionD"
  },
  {
    question: "Which cocktail shares its name with a fancy piece of clothing?",
    optionA: "Scarf",
    optionB: "Shoes",
    optionC: "Necklace",
    optionD: "Tuxedo",
    correctOption: "optionD"
  },
  {
    question: "From which country is Pisco Sour?",
    optionA: "Columbia",
    optionB: "Peru",
    optionC: "Brazil",
    optionD: "Mexico",
    correctOption: "optionB"
  },
  {
    question: "A John Collins is a blank kind of drink?",
    optionA: "long",
    optionB: "medium",
    optionC: "short",
    optionD: "extra short",
    correctOption: "optionA"
  },
  {
    question: "What is a Mimosa made of?",
    optionA: "Apple juice and Orange juice",
    optionB: "Orange Juice and Gin",
    optionC: "Orange juice and Champagne",
    optionD: "Campange and Apple juice",
    correctOption: "optionC"
  },
  {
    question: "What is a White Lady made of",
    optionA: "Cognac, orange liqueur and lemon juice",
    optionB: "Fresh Mint,Lime juice, Rum and Brown sugar",
    optionC: "Sugar, spice and everything nice",
    optionD: "Gin, Triple sec or cointreau, lemon juice and egg white",
    correctOption: "optionD"
  },
  {
    question: "What is the official cocktail of New Orleans",
    optionA: "Sazerac",
    optionB: "Margarita",
    optionC: "Rusty Nail",
    optionD: "Stinger",
    correctOption: "optionA"
  },
  {
    question: "Which is Brazil's national cocktail",
    optionA: "Margarita",
    optionB: "La lluvia",
    optionC: "Caipiriha",
    optionD: "Martini",
    correctOption: "optionC"
  },
]

let shuffledQuestions = []
let questionNumber = 1 
let indexNumber = 0 

function tabSelectionQuiz () {
  quizContainer.removeClass('hidden');
  quizTabBtn.toggleClass('active');
  formTabBtn.toggleClass('active');
  formContainer.addClass('hidden');
}

function tabSelectionForm () {
  formContainer.removeClass('hidden');
  formTabBtn.toggleClass('active');
  quizTabBtn.toggleClass('active');
  quizContainer.addClass('hidden');
}

function startQuiz () {
  quizWelcomeSection.addClass('hidden');
  quizQuestionSection.removeClass('hidden');
  NextQuestion ();
}

function handleQuestions() { 
  while (shuffledQuestions.length <= 5) {
    const random = questions[Math.floor(Math.random() * questions.length)];
      if (!shuffledQuestions.includes(random)) {
        shuffledQuestions.push(random);
      }
    }
}

function NextQuestion(index) {
  handleQuestions ()
  const currentQuestion = shuffledQuestions[index];
    $("#question-number").innerHTML = questionNumber;
    $("#display-question").innerHTML = currentQuestion.question;
    $("#option-one-label").innerHTML = currentQuestion.optionA;
    $("#option-two-label").innerHTML = currentQuestion.optionB;
    $("#option-three-label").innerHTML = currentQuestion.optionC;
    $("#option-four-label").innerHTML = currentQuestion.optionD;
}
  
function handleNextQuestion() {
  checkForAnswer() //check if player picked right or wrong option
  unCheckRadioButtons()
  //delays next question displaying for a second just for some effects so questions don't rush in on player
  setTimeout(() => {
      if (indexNumber <= 4) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
          NextQuestion(indexNumber)
      }
      else {
          generateRecipe ()//ends game if index number greater than 9 meaning we're already at the 10th question
      }
      resetOptionBackground()
  }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
  const options = document.getElementsByName("option");
  options.forEach((option) => {
      document.getElementById(option.labels[0].id).style.backgroundColor = ""
  })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
      options[i].checked = false;
  }
}
  

quizTabBtn.click(tabSelectionQuiz);
formTabBtn.click(tabSelectionForm);
startBtnEl.click(startQuiz);
restartBtnEl.click(startQuiz);
nextBtnEl.click(NextQuestion);

  


var ilist = {
	items: [],
	dlist: null,
	iadd: null,
	inputItem: null,
	init: function() {
	  ilist.dlist = document.getElementById("drink-list");
	  ilist.iadd = document.getElementById("ingredient-add"); 
	  ilist.inputItem = document.getElementById("drink-item");
	  ilist.iadd.addEventListener("submit", function(e){
		  e.preventDefault();
		  var listitem = document.createElement("li");
		  var listitemtext = document.createTextNode(ilist.inputItem.value);
			listitem.appendChild(listitemtext);
		  document.getElementById('ilist.add').appendChild(listitem);
		//   console.log(ilist.iadd);
	  })// where method is, define function method, is add now will become push

	  if (localStorage.items == undefined) {localStorage.items = "[]"; }
	  ilist.items = JSON.parse(localStorage.items);

	}
  }

  window.addEventListener("DOMContentLoaded", ilist.init);