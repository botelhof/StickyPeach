let instance = null

class RecipeStepsStore {
    subscriptions = []
    RecipeSteps = {}
    recipeSteps = []
    stepAssociations = []

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

    getStepsForDropDownAssociation() {
        let recipeStepsArr = new Array()
        if (this.recipeSteps) {
            this.recipeSteps.forEach(function (recipeStep) {
                recipeStepsArr.push({
                    name: recipeStep.description,
                    type: "Step",
                    id: recipeStep.recipe_step_temp_id,
                })
            })
        }

        return {  
            name: "Steps",
            id: 0,
            //icon: icon, // local required file
            children: recipeStepsArr
        }
    }

    setStepAssociations(stepAssociations) {
        this.stepAssociations = stepAssociations
    }

    getStepAssociations() {
        return this.stepAssociations
    }

    clearStepAssociations() {
        this.stepAssociations = new Array()
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