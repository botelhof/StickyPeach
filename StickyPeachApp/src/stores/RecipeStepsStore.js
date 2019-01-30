let instance = null

class RecipeStepsStore {
    subscriptions = []
    RecipeSteps = {}
    recipeSteps = []

    constructor() {
        if (instance !== null) {
            return instance
        }

        instance = this
        return instance
    }

    updateRecipeSteps() {
        this.publish({
            recipeSteps: this.recipeSteps,
        })
    }
    
    addStep(step) {
        if (!this.recipeSteps) {
            this.recipeSteps = new Array()
        }
        
        this.recipeSteps.push(step)

        this.updateRecipeSteps()
    }

    getSteps() {
        return this.recipeSteps
    }

    clearSteps() {
        this.recipeSteps = new Array()
        this.updateRecipeSteps()
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        callback(this.RecipeSteps)
    }

    unsubscribe(callback) {
        const index = this.subscriptions.indexOf(callback)
        if (index > -1) {
            this.subscriptions.splice(index, 1)
        }
    }

    publish(RecipeSteps) {
        this.RecipeSteps = RecipeSteps
        this.subscriptions.forEach(callback => callback(RecipeSteps))
    }
}

export default new RecipeStepsStore()