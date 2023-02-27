const rootEndpoint = "https://www.thecocktaildb.com/api/json/v1/1";

// Model class for a cocktail
export class Cocktail {
    constructor(id, name, image, instructions) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.thumbnail = image + "/preview";
        this.instructions = instructions;
    }
}

class CocktailService {
    async searchCocktailsByName(name) {
        const drinks = await this.fetchFromApi(
            `${rootEndpoint}/search.php?s=${name.trim()}`
        );
        return this.createCocktails(drinks);
    }

    async searchCocktailsByIngredientName(name) {
        // The API doesn't return cocktail instructions when searching by ingredient
        // See workaround in CocktailScreen

        const drinks = await this.fetchFromApi(
            `${rootEndpoint}/filter.php?i=${name.trim()}`
        );
        return this.createCocktails(drinks);
    }

    async findCocktailById(id) {
        const drinks = await this.fetchFromApi(
            `${rootEndpoint}/lookup.php?i=${id}`
        );
        return this.createCocktail(drinks[0]);
    }

    async fetchFromApi(query) {
        console.log(`Fetching API with query ${query}`);
        try {
            const response = await fetch(query);
            // FIXME: JSON parse error when ingredient is not found
            const content = await response.json();
            return content.drinks;
        } catch (e) {
            console.error(e);
        }
    }

    // Create a Cocktail model object from a subset of data fields returned by API
    createCocktail(drink) {
        return new Cocktail(
            drink.idDrink,
            drink.strDrink,
            drink.strDrinkThumb,
            drink.strInstructions
        );
    }

    // Create a Cocktail model object list from the array returned by API
    createCocktails(drinks) {
        // Create a cocktail object for each element in the array
        return drinks.map((drink) => this.createCocktail(drink));
    }
}

export default new CocktailService();