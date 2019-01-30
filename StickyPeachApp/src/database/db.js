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
        },
        (success) => {
            console.log("success selectAllUsers: " + success)
        },
        (error) => {
            console.log("error selectAllUsers: " + error)
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
        },
        (success) => {
            console.log("success selectAllRecipes: " + success)
        },
        (error) => {
            console.log("error selectAllRecipes: " + error)
        }
    )
}

export function selectAllSteps() {
    db.transaction(
        tx => {
            tx.executeSql('select * from step', [], (_, { rows }) =>
                console.log("select steps: " + JSON.stringify(rows))
            )
        },
        (success) => {
            console.log("success selectAllSteps: " + success)
        },
        (error) => {
            console.log("error selectAllSteps: " + error)
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
            },
            null,
            null
        )
    })
}

export function selectAllDefaultSettings() {
    db.transaction(
        tx => {
            tx.executeSql('select * from default_settings', [], (_, { rows }) =>
                console.log("select default_settings: " + JSON.stringify(rows))
            )
        },
        (success) => {
            console.log("success selectAllDefaultSettings: " + success)
        },
        (error) => {
            console.log("error selectAllDefaultSettings: " + error)
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
            },
            null,
            null
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
            },
            null,
            null
        )
    })
}

export function insertRandomUser() {
    db.transaction(
        tx => {
            tx.executeSql('insert into user (name, email, password, creation) values (?, ?, ?, ?)', [_getRandomText(10), _getRandomText(5) + "@" + _getRandomText(3), _getRandomText(10), new Date()]);
        },
        (success) => {
            console.log("success insertRandomUser: " + success)
        },
        (error) => {
            console.log("error insertRandomUser: " + error)
        }
    )
}

export async function insertRecipe(recipe, user_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into recipe (name, time_preparation, time_cook, serves, description, vegan, timestamp_creation, timestamp_updated, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                            [recipe.name, recipe.time_preparation, recipe.time_cook, recipe.serves, recipe.description, recipe.vegan, new Date(), null, user_id],
                )

                tx.executeSql('SELECT last_insert_rowid() as lastId', [], (_, { rows }) =>
                    resolve(rows)
                )
            },
            (success) => {
                console.log("success insertRecipe: " + success)
            },
            (error) => {
                console.log("error insertRecipe: " + error)
            }
        )
    })
}

export async function insertRecipeCollection(recipe_id, collection_id) {
    console.log("collection_idcollection_id: collection_id: " + collection_id)
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into recipe_collection (recipe_id, collection_id) values (?, ?)', 
                            [recipe_id, collection_id],
                            resolve()
                )
            },
            // (success) => {
            //     console.log("success insertRecipeCollection: " + success)
            // },
            // (error) => {
            //     console.log("error insertRecipeCollection: " + error)
            // }
        )
    })
}

export function insertCollection(collection) {
    db.transaction(
        tx => {
            tx.executeSql('insert into collection (name, description, picture, timestamp_creation, timestamp_updated) values (?, ?, ?, ?, ?)', [collection.name, collection.description, collection.picture, new Date(), null]);
        },
        (success) => {
            console.log("success insertCollection: " + success)
        },
        (error) => {
            console.log("error insertCollection: " + error)
        }
    )
}

export function insertDefaultSettingsBlob(name, val_blob) {
    db.transaction(
        tx => {
            tx.executeSql('insert into default_settings (name, val_blob) values (?, ?)', [name, val_blob]);
        },
        (success) => {
            console.log("success insertDefaultSettingsBlob: " + success)
        },
        (error) => {
            console.log("error insertDefaultSettingsBlob: " + error)
        }
    )
}

export function insertRecipeStep(step, recipe_id) {
    return new Promise((resolve, reject) => {
        db.transaction(
            tx => {
                tx.executeSql('insert into step (orderNumber, description, picture, timestamp_creation, timestamp_updated, recipe_id) values (?, ?, ?, ?, ?, ?)', 
                                [step.orderNumber, step.description, step.picture, new Date(), null, recipe_id],
                )
                resolve()
            },
            (success) => {
                console.log("success insertStep: " + success)
            },
            (error) => {
                console.log("error insertStep: " + error)
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