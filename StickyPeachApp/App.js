import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, RefreshControl} from 'react-native'
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import CategoriesScreen from './src/components/CategoriesScreen'
import CategoryScreen from './src/components/CategoryScreen'
import SettingsScreen from './src/components/SettingsScreen'

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  Category: CategoryScreen
})

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Category: CategoryScreen
})

export default createAppContainer(createBottomTabNavigator(
  {
    Categories: CategoriesStack,
    Settings: SettingsStack,
  },
  {
    /* Other configuration remains unchanged */
  }
))
