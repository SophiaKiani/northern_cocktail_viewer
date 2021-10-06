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
                console.log(data)
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
                console.log(data)
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

    }
}

fillCards();


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


