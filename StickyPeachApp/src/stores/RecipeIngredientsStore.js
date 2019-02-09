let instance = null

class RecipeIngredientsStore {
    subscriptions = []
    RecipeIngredients = {}
    recipeIngredients = []

    constructor() {
        if (instance !== null) {
            return instance
        }

        instance = this
        return instance
    }

    updateRecipeIngredients() {
        this.publish({
            recipeIngredients: this.recipeIngredients,
        })
    }
    
    addIngredient(ingredient) {
        if (!this.recipeIngredients) {
            this.recipeIngredients = new Array()
        }
        
        this.recipeIngredients.push(ingredient)

        this.updateRecipeIngredients()
    }

    getIngredientsForDropDownAssociation() {
        let recipeIngredientsArr = new Array()
        if (this.recipeIngredients) {
            this.recipeIngredients.forEach(function (recipeIngredient) {
                recipeIngredientsArr.push({
                    name: recipeIngredient.description,
                    type: "Ingredient",
                    id: recipeIngredient.recipe_ingredient_temp_id,
                })
            })
        }

        return {  
            name: "Ingredients",
            id: 0,
            //icon: icon, // local required file
            children: recipeIngredientsArr
        }
    }

    getIngredients() {
        return this.recipeIngredients
    }

    clearIngredients() {
        this.recipeIngredients = new Array()
        this.updateRecipeIngredients()
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        callback(this.RecipeIngredients)
    }

    unsubscribe(callback) {
        const index = this.subscriptions.indexOf(callback)
        if (index > -1) {
            this.subscriptions.splice(index, 1)
        }
    }

    publish(RecipeIngredients) {
        this.RecipeIngredients = RecipeIngredients
        this.subscriptions.forEach(callback => callback(RecipeIngredients))
    }
}

export default new RecipeIngredientsStore()