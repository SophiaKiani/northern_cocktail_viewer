///////////////////////////////////////////// Quiz Section //////////////////////////////////////
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

function tabSelectionQuiz() {
  formContainer.addClass('hidden');
  quizContainer.removeClass('hidden');
  formTabBtn.removeClass('active');
  quizTabBtn.addClass('active');
  $("#resultz").removeClass('hidden')
}

function tabSelectionForm() {
  formContainer.removeClass('hidden');
  formTabBtn.addClass('active');
  quizTabBtn.removeClass('active');
  quizContainer.addClass('hidden');
  $("#resultz").addClass('hidden')
}

function startQuiz() {
  quizWelcomeSection.addClass('hidden');
  quizQuestionSection.removeClass('hidden');
  NextQuestion(0);
}

function handleQuestions() {
  while (shuffledQuestions.length < 5) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    if (!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

function NextQuestion() {
  unCheckRadioButtons()
  handleQuestions()


  if (questionNumber == 6) {
    generateRecipe();
    quizQuestionSection.addClass('hidden');
    $("#resultz").removeClass("hidden");
    fillQuizCard();
  } else {
    const currentQuestion = shuffledQuestions[questionNumber - 1];

    $("#question-number").text(questionNumber);
    $("#display-question").text(currentQuestion.question);
    $("#option-one-label").text(currentQuestion.optionA);
    $("#option-two-label").text(currentQuestion.optionB);
    $("#option-three-label").text(currentQuestion.optionC);
    $("#option-four-label").text(currentQuestion.optionD);

    questionNumber++;
  }

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
      generateRecipe()//ends game if index number greater than 9 meaning we're already at the 10th question
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
function generateRecipe() {
  fillCards();
}


// Quiz Event Listeners
quizTabBtn.click(tabSelectionQuiz);
formTabBtn.click(tabSelectionForm);
startBtnEl.click(startQuiz);
restartBtnEl.click(startQuiz);
nextBtnEl.click(NextQuestion);


///////////////////////////////////////////// Form Section //////////////////////////////////////
var ilist = {
  items: [],
  dlist: null,
  iadd: null,
  inputItem: null,
  init: function () {
    ilist.dlist = document.getElementById("drink-list");
    ilist.iadd = document.getElementById("ingredient-add");
    ilist.inputItem = document.getElementById("drink-item");
    ilist.iadd.addEventListener("submit", function (e) {
      e.preventDefault();
      var listitem = document.createElement("li");
      var listitemtext = document.createTextNode(ilist.inputItem.value);
      listitem.appendChild(listitemtext);
      document.getElementById('ilist.add').appendChild(listitem);
      //   console.log(ilist.iadd);
    })// where method is, define function method, is add now will become push

    if (localStorage.items == undefined) { localStorage.items = "[]"; }
    ilist.items = JSON.parse(localStorage.items);
  }
}

window.addEventListener("DOMContentLoaded", ilist.init);


///////////////////////////////////////////// API Section //////////////////////////////////////

// Returns a random number min - max

function random(min, max) {
  return Math.floor(Math.random() * ((max) - min) + min);
}

// Make a drink object from JSON 

function drinkFromJson(json) {
  // Get ingredients (API displays ingredients weird)
  let ingredientsList = []
  let lastIngredient = "";
  for (let i = 1; i < 16; i++) {
    let ingredient = json['strIngredient' + i]
    if (ingredient != null && ingredient != "" && ingredient != lastIngredient) {
      ingredientsList.push(ingredient);
      lastIngredient = ingredient;
    }
  }
  // Build drink
  let drink = {
    name: json.strDrink,
    isAlcoholic: json.strAlcoholic,
    glassType: json.strGlass,
    category: json.strCategory,
    ingredients: ingredientsList
  }
  return drink;
}

// Get drink by name

function drinkByName(strName) {
  url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${strName}`;
  return fetch(url).then(res => res.json()).then(data => { return drinkFromJson(data.drinks[0]); });
}

// Get random drink

function randomDrink() {
  let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  return fetch(url).then(res => res.json()).then(data => { return drinkFromJson(data.drinks[0]); });
}

// Get drink by ingredient

function drinkByIngredient(strIngredient) {

  let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient}`;

  return fetch(url).then(res => res.json()).then(data => {
    let drinkList = data.drinks;
    let randomDrink = drinkList[random(0, drinkList.length)];
    return drinkByName(randomDrink.strDrink).then(res => { return res });
  });
}

// Fill front page cards

function fillCards() {
  let drinkNames = JSON.parse(localStorage.getItem("dailyDrinks"));
  const drinkTypes = ["vodka", "whiskey", "tequila", "gin", "rum"]
  if (drinkNames && (localStorage.getItem("date") && moment().date() === parseInt(localStorage.getItem("date")))) {
    for (let i = 0; i < drinkNames.length; i++)
      drinkByName(drinkNames[i]).then(data => {

        let ingredientsList = data.ingredients
        $(`#${drinkTypes[i]} h4`).text(data.name)
        $(`#${drinkTypes[i]} p`).text(`Type: ${data.category}, ${data.isAlcoholic}, Served in: ${data.glassType}`)
        for (let j = 0; j < ingredientsList.length; j++) {
          $(`#${drinkTypes[i]} ul`).append(`
              <li class="list-group-item">${ingredientsList[j]}</li>
              `);
        }
      });
  } else {
    let dailyDrinks = ["", "", "", "", ""]
    for (let i = 0; i < drinkTypes.length; i++) {
      drinkByIngredient(drinkTypes[i]).then(data => {

        let ingredientsList = data.ingredients;
        $(`#${drinkTypes[i]} h4`).text(data.name);
        $(`#${drinkTypes[i]} p`).text(`Type: ${data.category}, ${data.isAlcoholic}, Served in: ${data.glassType}`);
        for (let j = 0; j < ingredientsList.length; j++) {
          $(`#${drinkTypes[i]} ul`).append(`
                  <li class="list-group-item">${ingredientsList[j]}</li>
                  `);
        }
        dailyDrinks[i] = data.name;
        localStorage.setItem("dailyDrinks", JSON.stringify(dailyDrinks));
      });
    }
    localStorage.setItem("date", moment().date())
  };
};

fillCards();

// Fills the quiz card

function fillQuizCard() {

  randomDrink().then(data => {

    let ingredientsList = data.ingredients

    $(`#quizCard h4`).text(data.name)

    $(`#quizCard p`).text(`Type: ${data.category}, ${data.isAlcoholic}, Served in: ${data.glassType}`)

    for (let j = 0; j < ingredientsList.length; j++) {
      $(`#quizCard ul`).append(`
  <li class="list-group-item">${ingredientsList[j]}</li>
  `);
    }

  });
}
