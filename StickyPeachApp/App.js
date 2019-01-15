import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, RefreshControl} from 'react-native'
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import CategoriesScreen from './src/components/CategoriesScreen'
import CategoryScreen from './src/components/CategoryScreen'

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  Category: CategoryScreen
})

export default createAppContainer(createBottomTabNavigator(
  {
    Categories: CategoriesStack,
  },
  {
    /* Other configuration remains unchanged */
  }
))
