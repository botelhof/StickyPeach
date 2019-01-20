import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, RefreshControl} from 'react-native'
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import CategoriesScreen from './src/components/CategoriesScreen'
import CategoryScreen from './src/components/CategoryScreen'
import CollectionsScreen from './src/components/CollectionsScreen'
import CollectionScreen from './src/components/CollectionScreen'
import SettingsScreen from './src/components/SettingsScreen'

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  Category: CategoryScreen
})

const CollectionsStack = createStackNavigator({
  Collections: CollectionsScreen,
  Collection: CollectionScreen
})

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Category: CategoryScreen
})

export default createAppContainer(createBottomTabNavigator(
  {
    Collections: CollectionsStack,
    Categories: CategoriesStack,
    Settings: SettingsStack,
  },
  {
    /* Other configuration remains unchanged */
  }
))
