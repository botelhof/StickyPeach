import { SQLite } from 'expo'

const db = SQLite.openDatabase('whisk.db')

export function initDatabase() {
    db.transaction(tx => {
        tx.executeSql(
            'create table if not exists users (id integer primary key not null, name text not null, email text not null, password text not null, creation timestamp not null);'
        )
    })
}

export function selectAllUsers() {
    db.transaction(
        tx => {
            tx.executeSql('select * from users', [], (_, { rows }) =>
                console.log("select users: " + JSON.stringify(rows))
            );
        },
        null,
        // () => {console.log('aaa')}
    );
}

export function insertRandomUser() {
    db.transaction(
        tx => {
            tx.executeSql('insert into users (name, email, password, creation) values (?, ?, ?, ?)', [_getRandomText(10), _getRandomText(5) + "@" + _getRandomText(3), _getRandomText(10), new Date()]);
        },
        null,
        this.update
    );
}

function _getRandomText(totalChars) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < totalChars; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }