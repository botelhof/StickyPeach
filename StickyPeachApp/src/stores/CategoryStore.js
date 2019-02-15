import * as stickyPeachDB from '../database/db.js'

let instance = null

class CategoryStore {
    subscriptions = []
    Category = {}
    category = []

    constructor() {
        if (instance !== null) {
            return instance
        }

        instance = this
        return instance
    }

    async getCategoriesForDropDownAssociation() {
        let categoriesArr = new Array()
        const categories = await stickyPeachDB.selectAllCategories()
        // console.log("FB: categories:" + JSON.stringify(categories))
        if (categories && categories._array && categories._array.length > 0) {
            categories._array.forEach(function (category) {
                categoriesArr.push({
                    name: category.name,
                    id: category.id,
                })
            })
        }

        console.log("FB: categories:" + JSON.stringify({  
            name: "Categories",
            id: 0,
            //icon: icon, // local required file
            children: categoriesArr
        }))

        return {  
            name: "Categories",
            id: 0,
            //icon: icon, // local required file
            children: categoriesArr
        }
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        callback(this.Category)
    }

    unsubscribe(callback) {
        const index = this.subscriptions.indexOf(callback)
        if (index > -1) {
            this.subscriptions.splice(index, 1)
        }
    }

    publish(Category) {
        this.Category = Category
        this.subscriptions.forEach(callback => callback(Category))
    }
}

export default new CategoryStore()