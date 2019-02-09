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
    FlatList,
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
import RecipeStepsStore from '../stores/RecipeStepsStore'
import RecipeIngredientsStore from '../stores/RecipeIngredientsStore'

const { width, height } = Dimensions.get('window')
export default class CollectionAssociateStepPropsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "Step's associations",
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
            selectedItemsSteps: [],
            selectedItemsStepProps: [],
            associations: [],
        }
    }

    componentDidMount() {
        const recipe_temp_id = this.props.navigation.state.params.recipe_temp_id

        this.setState({
            recipe_temp_id: recipe_temp_id,
            associations: RecipeStepsStore.getStepAssociations()
        })
    }

    renderItem = ({ item }) => {
        // console.log("FB: item: " + JSON.stringify(item))
        return (
            <View style={{
                flex: 1,
                padding: 5,
                margin: 10,
                backgroundColor: Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_BACK,
                flexDirection: "column",
            }}>
                <Text style={{
                    color: Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_HEADER_FRONT,
                    fontWeight: 'bold',
                    fontSize: 14,
                    marginBottom: 20,
                }}>{ item.step.name }</Text>
                {
                    item.props.map((prop) => {
                        {/* console.log("FB: item prop: " + JSON.stringify(prop)) */}
                        if (prop.prop.type === 'Ingredient') {
                            return (
                                <View 
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 5,
                                    }}
                                    key={prop.prop.id}
                                >
                                    <Icon
                                        name="local-florist"
                                        color={Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_CONTENT_INGREDIENT}
                                        size={12}
                                        containerStyle={{
                                            marginRight: 3,
                                        }}
                                    />
                                    <Text 
                                        style={{
                                            color: Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_CONTENT_INGREDIENT,
                                            fontWeight: 'normal',
                                            fontSize: 12,
                                        }}
                                    >{prop.prop.name}</Text>
                                </View>
                            )
                        } else if (prop.prop.type === 'Material') {
                            return (
                                <View 
                                    style={{
                                        flexDirection: "row",
                                        marginBottom: 5,
                                    }}
                                    key={prop.prop.id}
                                >
                                    <Icon
                                        name="local-dining"
                                        color={Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_CONTENT_MATERIAL}
                                        size={12}
                                        containerStyle={{
                                            marginRight: 3,
                                        }}
                                    />
                                    <Text 
                                        style={{
                                            color: Constants.COLORS.SYSTEM.STEP_ASSOCIATION.LIST_ITEM_CONTENT_MATERIAL,
                                            fontWeight: 'normal',
                                            fontSize: 12,
                                        }}
                                        key={prop.prop.id}
                                    >{prop.prop.name}</Text>
                                </View>
                            )
                        }
                    })
                }
            </View>
        )
    }

    render() {
        // console.log("FB: associations: " + JSON.stringify(this.state.associations))
        return (
            <View style={{flex: 1,}}>
                {/* <Text>{ this.state.recipe_temp_id }</Text> */}

                <View style={{
                    // backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
                    borderRadius: 2,
                    marginLeft: 10,
                    marginRight: 10,
                    padding: 5,
                }}>
                    <SectionedMultiSelect
                        items={[RecipeStepsStore.getStepsForDropDownAssociation()]} 
                        uniqueKey='id'
                        subKey='children'
                        iconKey='icon'
                        selectText='Choose the step...'
                        confirmText='Close'
                        single
                        expandDropDowns
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        onSelectedItemsChange={(selectedItemsSteps) => {
                            this.setState({ selectedItemsSteps })
                        }}
                        onSelectedItemObjectsChange={(selectedItemsStepsObj) => {
                            this.setState({ selectedItemsStepsObj })
                        }}
                        selectedItems={this.state.selectedItemsSteps}
                        // styles={{
                        //     container: {
                        //         backgroundColor: "yellow",
                        //     }
                        // }}
                    />

                    {
                        this.state.selectedItemsSteps &&
                        this.state.selectedItemsSteps.length > 0
                        &&
                        <SectionedMultiSelect
                            items={[RecipeIngredientsStore.getIngredientsForDropDownAssociation(), RecipeMaterialsStore.getMaterialsForDropDownAssociation()]} 
                            uniqueKey='id'
                            subKey='children'
                            iconKey='icon'
                            selectText='Ingredients and materials...'
                            confirmText='Close'
                            expandDropDowns
                            // showCancelButton
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            onSelectedItemsChange={(selectedItemsStepProps) => {
                                this.setState({ selectedItemsStepProps })
                            }}
                            onSelectedItemObjectsChange={(selectedItemsStepPropsObj) => {
                                this.setState({ selectedItemsStepPropsObj })
                            }}
                            selectedItems={this.state.selectedItemsStepProps}
                        />
                    }
                </View>

                {
                    this.state.selectedItemsStepProps &&
                    this.state.selectedItemsStepProps.length > 0 &&
                    this.state.selectedItemsSteps &&
                    this.state.selectedItemsSteps.length > 0
                    &&
                    <Button 
                        icon={{
                            name: "done",
                            color: "#fff",
                            size: 14,
                        }}
                        title="Add association"
                        titleStyle={{
                            color: "#fff",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#b3d9ff",
                            padding: 5,
                        }}
                        containerStyle={{
                            marginLeft: 50,
                            marginRight: 50,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            // alert(JSON.stringify(this.state.selectedItemsStepsObj))

                            const propsArr = new Array()
                            if (this.state.selectedItemsStepPropsObj) {
                                this.state.selectedItemsStepPropsObj.forEach(function (prop) {
                                    propsArr.push({
                                        prop: prop,
                                    })
                                })
                            }
                            const newAssociation = {
                                step: {
                                    name: this.state.selectedItemsStepsObj[0].name,
                                },
                                props: propsArr,
                            }

                            // console.log(JSON.stringify(newAssociation))
                            
                            let newAssociations = this.state.associations
                            if (!newAssociation) {
                                newAssociations = new Array()
                            }

                            newAssociations.push(newAssociation)

                            this.setState({
                                associations: newAssociations,
                                selectedItemsSteps: [],
                                selectedItemsStepProps: [],
                                selectedItemsStepsObj: [],
                                selectedItemsStepPropsObj: null,
                            })
                        }}
                    />
                }

                <FlatList
                    keyExtractor = { (item, index) => index.toString() }
                    data={this.state.associations}
                    extraData={this.state}
                    renderItem={this.renderItem}
                />

                {
                    this.state.associations &&
                    this.state.associations.length > 0
                    &&
                    <Button 
                        icon={{
                            name: "done",
                            color: "#fff",
                            size: 14,
                        }}
                        title="Create associations"
                        titleStyle={{
                            color: "#fff",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#009900",
                            padding: 5,
                        }}
                        containerStyle={{
                            marginLeft: 50,
                            marginRight: 50,
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            RecipeStepsStore.setStepAssociations(this.state.associations)
                            this.props.navigation.goBack()
                        }}
                    />
                }
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