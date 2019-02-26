import * as stickyPeachDB from '../database/db.js'

let instance = null

class SettingsStore {
    subscriptions = []
    Settings = {}

    constructor() {
        if (instance !== null) {
            return instance
        }

        instance = this
        return instance
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        callback(this.Settings)
    }

    unsubscribe(callback) {
        const index = this.subscriptions.indexOf(callback)
        if (index > -1) {
            this.subscriptions.splice(index, 1)
        }
    }

    publish(Settings) {
        this.Settings = Settings
        this.subscriptions.forEach(callback => callback(Settings))
    }
}

export default new SettingsStore()