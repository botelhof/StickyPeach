import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Image,
    StatusBar,
    ScrollView,
    Alert,
} from 'react-native'
import {
    Button,
    Icon,
} from 'react-native-elements'
import FloatLabelTextInput from './FloatLabelTextField'
import ActionButton from 'react-native-circular-action-menu'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'

import * as Constants from '../utils/Constants.js'
import * as DropDownHolder from '../utils/DropDownHolder.js'
import * as stickyPeachDB from '../database/db.js'
import * as Utils from '../utils/Utils'

import { ImagePicker, Permissions, } from 'expo'

import RecipeMaterialsStore from  '../stores/RecipeMaterialsStore'

const { width, height } = Dimensions.get('window')
export default class CollectionAssociateStepPropsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "Associate step stuff",
          headerStyle: {
            backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
          },
          headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }
      }

    constructor(props) {
        super(props)
        this.state = {
            description: null,
            picture: null,
            selectedItems1: [],
            selectedItems2: [],
        }
    }

    componentDidMount() {
        const recipe_temp_id = this.props.navigation.state.params.recipe_temp_id

        this.setState({
            recipe_temp_id: recipe_temp_id,
        })
    }

    render() {
        const items1 = [
            {  
              name: "Fruits",
              id: 0,
              //icon: icon, // local required file
              children: [{
                  name: "Apple",
                  id: 10,
                },{
                  name: "Strawberry",
                  id: 17,
                },{
                  name: "Pineapple",
                  id: 13,
                },{
                  name: "Banana",
                  id: 14,
                },{
                  name: "Watermelon",
                  id: 15,
                },{
                  name: "Kiwi fruit",
                  id: 16,
                }]
            },
            {
              name: "Gems",
              id: 1,
              //icon: { uri: "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png" }, // web uri
              children: [{
                  name: "Quartz",
                  id: 20,
                },{
                  name: "Zircon",
                  id: 21,
                },{
                  name: "Sapphire",
                  id: 22,
                },{
                  name: "Topaz",
                  id: 23,
                }]
            },
            {
              name: "Plants",
              id: 2,
              //icon: "filter_vintage", // material icons icon name
              children: [{
                  name: "Mother In Law\'s Tongue",
                  id: 30,
                },{
                  name: "Yucca",
                  id: 31,
                },{
                  name: "Monsteria",
                  id: 32,
                },{
                  name: "Palm",
                  id: 33,
                }]
            },
          ]

          const items2 = [
            {  
              name: "Fruits",
              id: 0,
              //icon: icon, // local required file
              children: [{
                  name: "Apple",
                  id: 10,
                },{
                  name: "Strawberry",
                  id: 17,
                },{
                  name: "Pineapple",
                  id: 13,
                },{
                  name: "Banana",
                  id: 14,
                },{
                  name: "Watermelon",
                  id: 15,
                },{
                  name: "Kiwi fruit",
                  id: 16,
                }]
            },
            {
              name: "Gems",
              id: 1,
              //icon: { uri: "https://cdn4.iconfinder.com/data/icons/free-crystal-icons/512/Gemstone.png" }, // web uri
              children: [{
                  name: "Quartz",
                  id: 20,
                },{
                  name: "Zircon",
                  id: 21,
                },{
                  name: "Sapphire",
                  id: 22,
                },{
                  name: "Topaz",
                  id: 23,
                }]
            },
            {
              name: "Plants",
              id: 2,
              //icon: "filter_vintage", // material icons icon name
              children: [{
                  name: "Mother In Law\'s Tongue",
                  id: 30,
                },{
                  name: "Yucca",
                  id: 31,
                },{
                  name: "Monsteria",
                  id: 32,
                },{
                  name: "Palm",
                  id: 33,
                }]
            },
          ]

        return (
            <View style={{flex: 1,}}>
                <Text>{ this.state.recipe_temp_id }</Text>

                <SectionedMultiSelect
                    items={items1} 
                    uniqueKey='id'
                    subKey='children'
                    iconKey='icon'
                    selectText='Choose the step...'
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={(selectedItems1) => {
                        this.setState({ selectedItems1 })
                    }}
                    selectedItems={this.state.selectedItems1}
                />

                <SectionedMultiSelect
                    items={items2} 
                    uniqueKey='id'
                    subKey='children'
                    iconKey='icon'
                    selectText='Choose the property to associate...'
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={(selectedItems2) => {
                        this.setState({ selectedItems2 })
                    }}
                    selectedItems={this.state.selectedItems2}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: '#FFF',
    },
    listHeaderLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    noContentLabel: {
        color: "#444",
        fontSize: 14,
        color: "#222",
        fontStyle: 'italic',
    },
})