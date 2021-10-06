// Returns a random number min - max

function random(min, max) {
    return Math.floor(Math.random() * ((max) - min) + min);
}


function drinkByName(strName) {

    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${strName}`;

    fetch(url).then(res => res.json()).then(data => {
        //console.log(data);

    });

}

function getRandomDrink() {

    let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

    fetch(url).then(res => res.json()).then(data => {

        let drinkRawJson = data.drinks[0];

        // Get ingredients

        let ingredientsList = []
        let lastIngredient = "";

        for (let i = 1; i < 16; i++) {
            let ingredient = drinkRawJson['strIngredient' + i]
            if (ingredient != null && ingredient != "" && ingredient != lastIngredient) {
                ingredientsList.push(ingredient);
                lastIngredient = ingredient;
            }
        }

        let drink = {
            name: drinkRawJson.strDrink,
            isAlcoholic: drinkRawJson.strAlcoholic,
            glassType: drinkRawJson.strGlass,
            category: drinkRawJson.strCategory,
            ingredients: ingredientsList
        }

        console.log(drink);

        console.log(drinkRawJson);
        return drink;

    });

}

function getDrinkByIngredient(strIngredient) {

    let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient}`;

    fetch(url).then(res => res.json()).then(data => {

        let list = data.drinks

        return list[random(0, data.drinks.length)].strDrink;

    });
}



