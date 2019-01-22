import { SQLite } from 'expo'

const db = SQLite.openDatabase('StickyPeach.db')

export function initDatabase() {
    db.transaction(tx => {

        // tx.executeSql(
        //     'drop table default_settings;'
        // )
        tx.executeSql(
            'create table if not exists default_settings (id integer primary key not null, name text not null, val_text text, val_int int, val_timestamp timestamp, val_boolean boolean, val_blob blob);'
        )

        // tx.executeSql(
        //     'drop table user;'
        // )
        tx.executeSql(
            'create table if not exists user (id integer primary key not null, name text not null, email text not null, password text not null, creation timestamp not null);'
        )

        // tx.executeSql(
        //     'drop table recipe;'
        // )
        tx.executeSql(
            'create table if not exists recipe (id integer primary key not null, name text not null, time_preparation int not null, time_cook int not null, serves int not null, description text not null, vegan boolean not null, timestamp_creation timestamp not null, timestamp_updated timestamp, user_id int not null, FOREIGN KEY(user_id) REFERENCES user(id));'
        )

        // tx.executeSql(
        //     'drop table step;'
        // )
        tx.executeSql(
            'create table if not exists step (id integer primary key not null, orderNumber int not null, description text not null, picture blob, recipe_id int not null, timestamp_creation timestamp not null, timestamp_updated timestamp, FOREIGN KEY(recipe_id) REFERENCES recipe(id));'
        )

        // tx.executeSql(
        //     'drop table collection;'
        // )
        tx.executeSql(
            'create table if not exists collection (id integer primary key not null, name text not null, description text not null, timestamp_creation timestamp not null, timestamp_updated timestamp);'
        )
    },
    (success) => {
        console.log("success initDatabase: " + success)
    },
    (error) => {
        console.log("error initDatabase: " + error)
    })
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

export function selectAllCollections() {
    db.transaction(
        tx => {
            tx.executeSql('select * from collection', [], (_, { rows }) =>
                console.log("select collection: " + JSON.stringify(rows))
            )
        },
        (success) => {
            console.log("success selectAllCollections: " + success)
        },
        (error) => {
            console.log("error selectAllCollections: " + error)
        }
    )
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
            tx.executeSql('insert into collection (name, description, timestamp_creation, timestamp_updated) values (?, ?, ?, ?)', [collection.name, recipe.description, new Date(), null]);
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