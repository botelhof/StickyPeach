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

const { width, height } = Dimensions.get('window')
export default class CollectionRecipeNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "New Recipe",
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
            name: null,
            description: null,
            time_preparation: null,
            time_cook: null,
            serves: null,
            vegan: false,
        }
    }

    componentDidMount() {
        this.setState({
            recipe_temp_id: Utils.guid(),
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
                        placeholder={"Recipe name"}
                        value={this.state.name}
                        keyboardType="default"
                        maxLength={100}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                name: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Collection description"}
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
                    <FloatLabelTextInput
                        placeholder={"Preparation time"}
                        value={this.state.time_preparation}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                time_preparation: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Cook time"}
                        value={this.state.time_cook}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                time_cook: txt,
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
                    <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Button 
                            icon={{
                                name: "add",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Add a new step"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#3399ff",
                                padding: 5,
                            }}
                            containerStyle={{
                                marginTop: 5,
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("CollectionRecipeStepNew", {recipe_temp_id: this.state.recipe_temp_id})
                            }}
                        />
                        <ScrollView>

                        </ScrollView>
                    </View>
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
                                            name: "",
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

                            if (!this.state.name) {
                                msg += "Please, fill the 'Collection name' field "
                            }

                            if (!this.state.description) {
                                msg += "Please, fill the 'Collection description' field "
                            }

                            if (msg != "") {
                                DropDownHolder.getDropDown().alertWithType('error', 'Error', msg)
                            } else {
                                stickyPeachDB.insertCollection({
                                    name: this.state.name,
                                    description: this.state.description,
                                    picture: this.state.picture,
                                })
                                this.props.navigation.goBack()
                                DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Collection "' + this.state.name + '" created with success')
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}