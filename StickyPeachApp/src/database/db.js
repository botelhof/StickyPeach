import { SQLite } from 'expo'

import * as databaseInit from './databaseInit'

const db = SQLite.openDatabase('StickyPeach.db')

export function initDatabase() {
    databaseInit.initDatabase()
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
    db.transaction(
        tx => {
            tx.executeSql('select * from recipe where id = ?', [recipe_id], (_, { rows }) =>
                console.log("select selectRecipeById: " + JSON.stringify(rows))
            )
        },
        (success) => {
            console.log("success selectRecipeById: " + success)
        },
        (error) => {
            console.log("error selectRecipeById: " + error)
        }
    )
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

export function insertRecipe(recipe, user_id) {
    db.transaction(
        tx => {
            tx.executeSql('insert into recipe (name, time_preparation, time_cook, serves, description, vegan, timestamp_creation, timestamp_updated, user_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [recipe.name, recipe.time_preparation, recipe.time_cook, recipe.serves, recipe.description, recipe.vegan, new Date(), null, user_id]);
        },
        (success) => {
            console.log("success insertRecipe: " + success)
        },
        (error) => {
            console.log("error insertRecipe: " + error)
        }
    )
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

export function insertStep(step, recipe_id) {
    db.transaction(
        tx => {
            tx.executeSql('insert into step (orderNumber, description, picture, timestamp_creation, timestamp_updated, recipe_id) values (?, ?, ?, ?, ?, ?)', [step.orderNumber, step.description, step.picture, new Date(), null, recipe_id]);
        },
        (success) => {
            console.log("success insertStep: " + success)
        },
        (error) => {
            console.log("error insertStep: " + error)
        }
    )
}

function _getRandomText(totalChars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < totalChars; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }