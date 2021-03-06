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

import * as Constants from '../utils/Constants.js'
import * as DropDownHolder from '../utils/DropDownHolder.js'
import * as stickyPeachDB from '../database/db.js'

import { ImagePicker, Permissions, } from 'expo'

const { width, height } = Dimensions.get('window')
export default class CategoryNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "New Category",
          headerStyle: {
            backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
          },
          headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }
      }

    constructor() {
        super()
        this.state = {
            name: null,
            description: null,
        }
    }

    render() {

        const viewLength = width * 0.6

        return (
            <View style={{flex: 1,}}>
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <FloatLabelTextInput
                        placeholder={"Category name"}
                        value={this.state.name}
                        keyboardType="default"
                        // noBorder
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
                        placeholder={"Category description"}
                        value={this.state.description}
                        keyboardType="default"
                        // noBorder
                        maxLength={500}
                        // multiline
                        // numberOfLines={3}
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
                                msg += "Please, fill the 'Category name' field. "
                            }

                            if (!this.state.description) {
                                msg += "Please, fill the 'Category description' field. "
                            }

                            if (msg != "") {
                                DropDownHolder.getDropDown().alertWithType('error', 'Error', msg)
                            } else {
                                stickyPeachDB.insertCategory({
                                    name: this.state.name,
                                    description: this.state.description,
                                })
                                this.props.navigation.goBack()
                                DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Category "' + this.state.name + '" created with success')
                            }
                        }}
                    />
                </View>
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