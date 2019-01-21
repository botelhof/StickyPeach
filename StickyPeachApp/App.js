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
import CollectionNewScreen from './src/components/CollectionNewScreen'
import SettingsScreen from './src/components/SettingsScreen'

import {
  Icon,
} from 'react-native-elements'

import * as Constants from './src/utils/Constants.js'

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  Category: CategoryScreen
})

const CollectionsStack = createStackNavigator({
  Collections: CollectionsScreen,
  Collection: CollectionScreen,
  CollectionNew: CollectionNewScreen,
})

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Category: CategoryScreen
})

export default createAppContainer(createBottomTabNavigator(
  {
    Collections: {
      screen: CollectionsStack,
      // path: '/collections',
      navigationOptions: {
        title: 'Collections',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name='archive' size={18} color={tintColor} />
        )
      },
    },
    Categories: {
      screen: CategoriesStack,
      // path: '/collections',
      navigationOptions: {
        title: 'Categories',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name='airplay' size={18} color={tintColor} />
        )
      },
    },
    Settings: {
      screen: SettingsStack,
      // path: '/collections',
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name='settings' size={18} color={tintColor} />
        )
      },
    },
  },
  {
    initialRouteName: 'Collections',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
      },
      headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      tabBarOptions: {
        showIcon: true,
        activeTintColor: Constants.COLORS.SYSTEM.SECONDARY,
        inactiveTintColor: Constants.COLORS.SYSTEM.PRIMARY,
        inactiveBackgroundColor: Constants.COLORS.SYSTEM.SECONDARY,
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
        },
      },
    },
  }
))
