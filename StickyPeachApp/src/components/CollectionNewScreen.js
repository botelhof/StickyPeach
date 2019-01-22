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

export default class CollectionNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "New Collection",
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
        return (
            <View style={{flex: 1,}}>
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <FloatLabelTextInput
                        placeholder={"Collection name"}
                        value={this.state.name}
                        keyboardType="default"
                        noBorder
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
                        noBorder
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
                                msg += "The field 'Name' is empty. "
                            }

                            if (!this.state.description) {
                                msg += "The field 'Description' is empty. "
                            }

                            if (msg != "") {
                                DropDownHolder.getDropDown().alertWithType('error', 'Error', msg)
                            } else {
                                DropDownHolder.getDropDown().alertWithType('info', 'Info', this.state.name)
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}