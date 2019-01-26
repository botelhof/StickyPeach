
import * as stickyPeachDB from '../database/db.js'

export const DEFAULT_SETTINGS = {
    PICTURE_NAME: "defaultImage",
}

default_image = null

export async function getDefaultImage() {
    return new Promise(async (resolve, reject) => {
        if (!this.default_image) {
            this.default_image = await stickyPeachDB.selectDefaultSetting(DEFAULT_SETTINGS.PICTURE_NAME)
        }
        resolve(this.default_image)
    })
}
