import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, RefreshControl} from 'react-native'
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import HomeScreen from './src/components/HomeScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeStack,
  },
  {
    /* Other configuration remains unchanged */
  }
))
