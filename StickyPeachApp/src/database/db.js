import { SQLite } from 'expo'

import * as databaseInit from './databaseInit'

const db = SQLite.openDatabase('StickyPeach.db')

export function initDatabase(defaultSettings) {
    databaseInit.initDatabase(defaultSettings)
}

export function selectAllUsers() {
    db.transaction(
        tx => {
            tx.executeSql('select * from user', [], (_, { rows }) =>
                console.log("select users: " + JSON.stringify(rows))
            )
        }
    )
}

export function selectAllRecipes() {
    db.transaction(
        tx => {
            // tx.executeSql('delete from recipe where id = 2', [], (_, { rows }) =>
            //     console.log("select recipes: " + JSON.stringify(rows))
            // )
            tx.executeSql('select * from recipe', [], (_, { rows }) =>
                console.log("select recipes: " + JSON.stringify(rows))
            )
        }
    )
}

export function selectAllSteps() {
    db.transaction(
        tx => {
            tx.executeSql('select * from step', [], (_, { rows }) =>
                console.log("select steps: " + JSON.stringify(rows))
            )
        }
    )
}

export async function selectAllCollections() {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                // tx.executeSql('select * from collection', [], (_, { rows }) =>
                //     console.log("select collection: " + JSON.stringify(rows))
                // )
    
                // tx.executeSql('select * from collection', [])
    
                tx.executeSql('select * from collection', [], (_, { rows }) =>
                    resolve(rows)
                )
            }
        )
    })
}

export function selectAllDefaultSettings() {
    db.transaction(
        tx => {
            tx.executeSql('select * from default_settings', [], (_, { rows }) =>
                console.log("select default_settings: " + JSON.stringify(rows))
            )
        }
    )
}

export function selectRecipeById(recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('select * from recipe where id = ?', [recipe_id], (_, { rows }) => resolve(rows)
                )
            }
        )
    })
}

export function selectRecipeStepsByRecipeId(recipe_id) {
    // console.log("selectRecipeStepsByRecipeId recipe_id: " + recipe_id)
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("select * from step where recipe_id = ? order by orderNumber asc",
                            [recipe_id], 
                            function(tx, results){
                                resolve(results.rows)
                            },
                            function(tx, results){
                                resolve(results.rows)
                            },
                )
            }
        )
    })
}

export function selectRecipeMaterialsByRecipeId(recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("select * from material where recipe_id = ? order by orderNumber asc",
                            [recipe_id], 
                            function(tx, results){
                                resolve(results.rows)
                            },
                            function(tx, results){
                                resolve(results.rows)
                            },
                )
            }
        )
    })
}

export function selectRecipeIngredientsByRecipeId(recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql("select * from ingredient where recipe_id = ? order by orderNumber asc",
                            [recipe_id], 
                            function(tx, results){
                                resolve(results.rows)
                            },
                            function(tx, results){
                                resolve(results.rows)
                            },
                )
            }
        )
    })
}

export async function selectAllRecipesForCollection(collectionId) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('select recipe.* '+
                            'from recipe, collection, recipe_collection ' +
                            'where recipe_collection.recipe_id = recipe.id AND ' +
                            'recipe_collection.collection_id = collection.id ' +
                            'AND collection.id = ?', [collectionId], (_, { rows }) =>
                    resolve(rows)
                )
            }
        )
    })
}

export async function selectAllStepAssociations(recipeId) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('SELECT ' +
                                'step_props.step_id AS si, step.description AS sDesc, material.description AS mDesc, ingredient.description AS iDesc ' +
                                'FROM ' +
                                'step_props  ' +
                                'LEFT JOIN step ON step_props.step_id = step.id AND step.recipe_id = ? ' +
                                'LEFT JOIN material ON step_props.material_id = material.id ' +
                                'LEFT JOIN ingredient ON step_props.ingredient_id = ingredient.id '
                            , [recipeId], 
                            function(tx, results){
                                // console.log("FB: 1111: " + JSON.stringify(results))
                                resolve(results.rows)
                            },
                            function(tx, results){
                                console.log("FB: 2222: " + JSON.stringify(results))
                                resolve(results.rows)
                            },
                )
            }
        )
    })
}

export async function selectDefaultSetting(default_setting_name) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('select * from default_settings where name = ?', [default_setting_name], (_, { rows }) =>
                    resolve(rows)
                )
            }
        )
    })
}

export function insertRandomUser() {
    db.transaction(
        tx => {
            tx.executeSql('insert into user (name, email, password, creation) values (?, ?, ?, ?)', [_getRandomText(10), _getRandomText(5) + "@" + _getRandomText(3), _getRandomText(10), new Date()]);
        }
    )
}

export async function insertRecipe(recipe, user_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into recipe (name, time_preparation, time_cook, serves, description, vegan, picture, timestamp_creation, timestamp_updated, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                            [recipe.name, recipe.time_preparation, recipe.time_cook, recipe.serves, recipe.description, recipe.vegan, recipe.picture, new Date(), null, user_id],
                )

                tx.executeSql('SELECT last_insert_rowid() as lastId', [], (_, { rows }) =>
                    resolve(rows)
                )
            }
        )
    })
}

export async function insertRecipeCollection(recipe_id, collection_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into recipe_collection (recipe_id, collection_id) values (?, ?)', 
                            [recipe_id, collection_id],
                            resolve()
                )
            }
        )
    })
}

export function insertCollection(collection) {
    db.transaction(
        tx => {
            tx.executeSql('insert into collection (name, description, picture, timestamp_creation, timestamp_updated) values (?, ?, ?, ?, ?)', [collection.name, collection.description, collection.picture, new Date(), null]);
        }
    )
}

export function insertDefaultSettingsBlob(name, val_blob) {
    db.transaction(
        tx => {
            tx.executeSql('insert into default_settings (name, val_blob) values (?, ?)', [name, val_blob]);
        }
    )
}

export function insertRecipeStep(step, recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into step (id, orderNumber, description, picture, timestamp_creation, timestamp_updated, recipe_id) values (?, ?, ?, ?, ?, ?, ?)', 
                                [step.id, step.orderNumber, step.description, step.picture, new Date(), null, recipe_id],
                )
                resolve()
            }
        )
    })
}

export function insertRecipeMaterial(material, recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into material (id, orderNumber, description, picture, timestamp_creation, timestamp_updated, recipe_id) values (?, ?, ?, ?, ?, ?, ?)', 
                                [material.id, material.orderNumber, material.description, material.picture, new Date(), null, recipe_id],
                )
                resolve()
            }
        )
    })
}

export function insertRecipeIngredient(ingredient, recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into ingredient (id, orderNumber, description, picture, timestamp_creation, timestamp_updated, recipe_id) values (?, ?, ?, ?, ?, ?, ?)', 
                                [ingredient.id, ingredient.orderNumber, ingredient.description, ingredient.picture, new Date(), null, recipe_id],
                )
                resolve()
            }
        )
    })
}

export function insertStepIngredientMaterial(step_id, ingredient_id, material_id) {
    // console.log("FB: insertStepIngredientMaterial: " + step_id + ", " + ingredient_id + ", " + material_id + "|")
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into step_props (step_id, ingredient_id, material_id) values (?, ?, ?)', 
                                [step_id, ingredient_id, material_id], (_, { rows }) => resolve(rows)
                )
            }
        )
    })
}

export function deleteRecipe(recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('delete from recipe where id = ?', 
                                [recipe_id],
                )
                tx.executeSql('delete from step where recipe_id = ?', 
                    [recipe_id],
                )
                tx.executeSql('delete from material where recipe_id = ?', 
                    [recipe_id],
                )
                tx.executeSql('delete from ingredient where recipe_id = ?', 
                    [recipe_id],
                )
                tx.executeSql('delete from recipe_collection where recipe_id = ?', 
                    [recipe_id],
                )
                resolve()
            }
        )
    })
}

function _getRandomText(totalChars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < totalChars; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}