let instance = null

class RecipeMaterialsStore {
    subscriptions = []
    RecipeMaterials = {}
    recipeMaterials = []

    constructor() {
        if (instance !== null) {
            return instance
        }

        instance = this
        return instance
    }

    updateRecipeMaterials() {
        this.publish({
            recipeMaterials: this.recipeMaterials,
        })
    }
    
    addMaterial(material) {
        if (!this.recipeMaterials) {
            this.recipeMaterials = new Array()
        }
        
        this.recipeMaterials.push(material)

        this.updateRecipeMaterials()
    }

    getMaterialsForDropDownAssociation() {
        let recipeMaterialsArr = new Array()
        if (this.recipeMaterials) {
            this.recipeMaterials.forEach(function (recipeMaterial) {
                recipeMaterialsArr.push({
                    name: recipeMaterial.description,
                    type: "Material",
                    id: recipeMaterial.recipe_material_temp_id,
                })
            })
        }

        return {  
            name: "Materials",
            id: 1,
            //icon: icon, // local required file
            children: recipeMaterialsArr
        }
    }

    getMaterials() {
        return this.recipeMaterials
    }

    clearMaterials() {
        this.recipeMaterials = new Array()
        this.updateRecipeMaterials()
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        callback(this.RecipeMaterials)
    }

    unsubscribe(callback) {
        const index = this.subscriptions.indexOf(callback)
        if (index > -1) {
            this.subscriptions.splice(index, 1)
        }
    }

    publish(RecipeMaterials) {
        this.RecipeMaterials = RecipeMaterials
        this.subscriptions.forEach(callback => callback(RecipeMaterials))
    }
}

export default new RecipeMaterialsStore()