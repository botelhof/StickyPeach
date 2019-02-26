import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity, View, Dimensions, RefreshControl} from 'react-native'
import { 
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'
import CategoriesScreen from './src/components/CategoriesScreen'
import CategoryScreen from './src/components/CategoryScreen'
import CategoryNewScreen from './src/components/CategoryNewScreen'
import CollectionsScreen from './src/components/CollectionsScreen'
import CollectionScreen from './src/components/CollectionScreen'
import CollectionNewScreen from './src/components/CollectionNewScreen'
import CollectionRecipeNewScreen from './src/components/CollectionRecipeNewScreen'
import CollectionRecipeIngredientNewScreen from './src/components/CollectionRecipeIngredientNewScreen'
import CollectionRecipeStepNewScreen from './src/components/CollectionRecipeStepNewScreen'
import CollectionRecipeMaterialNewScreen from './src/components/CollectionRecipeMaterialNewScreen'
import CollectionAssociateStepPropsScreen from './src/components/CollectionAssociateStepPropsScreen'
import SettingsScreen from './src/components/SettingsScreen'
import RecipeScreen from './src/components/RecipeScreen'
import CookingScreen from './src/components/CookingScreen'

import DropdownAlert from 'react-native-dropdownalert'

import {
  Icon,
} from 'react-native-elements'

import * as Constants from './src/utils/Constants.js'
import * as DropDownHolder from './src/utils/DropDownHolder.js'

const CategoriesStack = createStackNavigator({
  Categories: CategoriesScreen,
  Category: CategoryScreen,
  CategoryNew: CategoryNewScreen,
})

const CollectionsStack = createStackNavigator({
  Collections: CollectionsScreen,
  Collection: CollectionScreen,
  CollectionNew: CollectionNewScreen,
  CollectionRecipeNew: CollectionRecipeNewScreen,
  CollectionRecipeIngredientNew: CollectionRecipeIngredientNewScreen,
  CollectionRecipeStepNew: CollectionRecipeStepNewScreen,
  CollectionRecipeMaterialNew: CollectionRecipeMaterialNewScreen,
  CollectionAssociateStepProps: CollectionAssociateStepPropsScreen,
  Recipe: RecipeScreen,
  Cooking: CookingScreen,
})

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Category: CategoryScreen
})

const AppContainer = createAppContainer(createBottomTabNavigator(
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
      // headerStyle: {
      //   backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
      //   shadowOpacity: 0.9,
      //   shadowColor : Constants.COLORS.SYSTEM.PRIMARY,
      //   shadowOffset: {
      //       height: 5
      //   },
      //   shadowRadius: 10,
      //   borderBottomWidth: 0,
      //   elevation: 0,
      // },
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
          shadowOpacity: 0.5,
          shadowColor : "#333",
          shadowOffset: {
              height: 5
          },
          shadowRadius: 10,
          borderBottomWidth: 0,
          borderTopWidth: 0,
          elevation: 0,
        },
      },
    },
  }
))

export default class App extends React.Component {
  render() {
      return (
          <View style={{width: '100%', height: '100%'}}>
              <AppContainer/>
              <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)}/>
          </View>
      )
  }
}
