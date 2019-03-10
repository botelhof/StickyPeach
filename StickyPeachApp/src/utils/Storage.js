import {AsyncStorage} from 'react-native'

const appStorageKey = '@StickyPeachApp2019'

export async function storeData(key, data) {
    try {
      await AsyncStorage.setItem(appStorageKey + ':' + key, data);
    } catch (error) {
      // Error saving data
      console.log(error)
    }
}

export async function retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(appStorageKey + ':' + key);
      if (value !== null) {
        return value
      }
    } catch (error) {
      // Error retrieving data
    }
    return null
}

export async function removeData(key) {
    try {
      await AsyncStorage.removeItem(appStorageKey + ':' + key);
    } catch (error) {
      // Error retrieving data
    }
}