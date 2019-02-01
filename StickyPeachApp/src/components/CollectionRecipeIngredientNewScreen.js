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
} from 'react-native-elements'
import FloatLabelTextInput from './FloatLabelTextField'

import * as Constants from '../utils/Constants.js'
import * as DropDownHolder from '../utils/DropDownHolder.js'
import * as stickyPeachDB from '../database/db.js'
import * as Utils from '../utils/Utils'

import { ImagePicker, Permissions, } from 'expo'

import RecipeIngredientsStore from  '../stores/RecipeIngredientsStore'

const { width, height } = Dimensions.get('window')
export default class CollectionRecipeIngredientNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "New Recipe Ingredient",
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
        }
    }

    componentDidMount() {
        const recipe_temp_id = this.props.navigation.state.params.recipe_temp_id

        this.setState({
            recipe_temp_id: recipe_temp_id,
        })
    }

    _pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                // aspect: [4, 3],
            })
            if (!result.cancelled) {
                this.setState({ picture: result.base64 })
            }
        }
    }

    render() {
        const viewLength = width * 0.4

        return (
            <View style={{flex: 1,}}>
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <FloatLabelTextInput
                        placeholder={"Ingredient description"}
                        value={this.state.description}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                description: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Button 
                            icon={{
                                name: "camera-roll",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Pick a picture"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#888",
                                padding: 5,
                            }}
                            onPress={this._pickImage}
                        />
                        <Button 
                            icon={{
                                name: "camera",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Take a picture"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#888",
                                padding: 5,
                            }}
                            onPress={this._pickImage}
                        />
                    </View>
                    {
                        this.state.picture
                        &&
                        <View style={{
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            marginTop: 15,
                            flexDirection: "column",
                        }}>
                            <Image 
                                source={{uri: `data:image/jpg;base64,${this.state.picture}`,}} 
                                style={{ 
                                    width: viewLength,
                                    height: viewLength,
                                    borderColor: Constants.COLORS.SYSTEM.PRIMARY,
                                    borderWidth: 1,
                                }} 
                            />
                            <Button 
                                icon={{
                                    name: "clear",
                                    color: "#fff",
                                    size: 18,
                                }}
                                title="Remove"
                                titleStyle={{
                                    color: "#fff",
                                    fontSize: 14,
                                }}
                                buttonStyle={{
                                    backgroundColor: "#888",
                                    padding: 5,
                                }}
                                containerStyle={{
                                    marginTop: 5,
                                    alignSelf: 'flex-end',
                                }}
                                onPress={() => {
                                    this.setState({
                                        picture: null,
                                    })
                                }}
                            />
                        </View>
                    }
                </ScrollView>
                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    marginBottom: 20,
                }}>
                    <Button 
                        icon={{
                            name: "clear",
                            color: "#333",
                            size: 14,
                        }}
                        title="Clear"
                        titleStyle={{
                            color: "#333",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#eee",
                            padding: 5,
                        }}
                        containerStyle={{
                            marginRight: 20,
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Clear form',
                                'Do you want to clear all fields?',
                                [
                                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                                    {text: 'Clear', onPress: () => {
                                        this.setState({
                                            description: "",
                                            picture: null,
                                        })
                                    }},
                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                    <Button 
                        icon={{
                            name: "done",
                            color: "#fff",
                            size: 14,
                        }}
                        title="Create"
                        titleStyle={{
                            color: "#fff",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#009900",
                            padding: 5,
                        }}
                        onPress={() => {
                            let msg = ""

                            if (!this.state.description) {
                                msg += "Please, fill the 'Ingredient description' field. "
                            }

                            if (msg != "") {
                                DropDownHolder.getDropDown().alertWithType('error', 'Error', msg)
                            } else {
                                
                                RecipeIngredientsStore.addIngredient({
                                    recipe_ingredient_temp_id: Utils.guid(),
                                    description: this.state.description,
                                    picture: this.state.picture,
                                    orderNumber: RecipeIngredientsStore.getIngredients().length + 1
                                })

                                this.props.navigation.goBack()
                                DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Recipe ingredient created with success')
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}