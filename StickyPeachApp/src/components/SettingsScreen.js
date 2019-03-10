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
    TouchableOpacity,
} from 'react-native'
import { 
    Header,
} from 'react-navigation'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'
import SideMenu from 'react-native-side-menu'
import * as DropDownHolder from '../utils/DropDownHolder.js'
import FloatLabelTextInput from './FloatLabelTextField'
import {
    Icon,
    Button,
} from 'react-native-elements'

import { ImagePicker, Permissions, } from 'expo'


import GalleryComponent from './GalleryComponent'
import MenuSideView from './MenuSideView'
import MenuButtonComponent from './MenuButtonComponent'

import * as Animatable from 'react-native-animatable'
import * as stickyPeachDB from '../database/db.js'
import * as Constants from '../utils/Constants.js'

import * as Storage from '../utils/Storage.js'

const { width, height } = Dimensions.get('window')

const IMG_HEIGHT = height / 1.5
const MIN_HEIGHT = Header.HEIGHT + 200
const MAX_HEIGHT = IMG_HEIGHT

const USER_STATUS = {
    NO_AUTH: "NO_AUTH",
    LOGGED_IN: "LOGGED_IN",
    REGISTER: "REGISTER",
}
export default class SettingsScreen extends React.Component {
    // static navigationOptions = {
    //     header: null,
    // }

    static navigationOptions = {
        headerTitle: 'Settings',
        headerStyle: {
            backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
            shadowOpacity: 0.5,
            shadowColor : "#333",
            shadowOffset: {
                height: 5
            },
            shadowRadius: 10,
            borderBottomWidth: 0,
            elevation: 0,
        },
        headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            showNavTitle: false,
            isOpen: false,
            userStatus: USER_STATUS.NO_AUTH,
        }

        this.props.navigation.addListener('willFocus', this.enterScreen)
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    enterScreen = async () => {
        const authUser = await Storage.retrieveData(Constants.STORAGE_CODES.AUTH_USER)

        let userStatus = null
        let email = null
        if (authUser && JSON.parse(authUser)) {
            userStatus = USER_STATUS.LOGGED_IN
            email = JSON.parse(authUser).email
        } else {
            userStatus = USER_STATUS.NO_AUTH
        }

        this.setState({
            isOpen: false,
            userStatus: userStatus,
            email: email,
        })
    }

    render() {
        const menu = <MenuSideView navigator={this.props.navigation}/>
        return (
            <SideMenu 
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
            >
                <View style={{ flex: 1 }}>
                    <MenuButtonComponent 
                        callbackOnPress={() => {
                            this.setState({
                                isOpen: true,
                            })
                        }}
                    />
                    <StatusBar barStyle="dark-content" />
                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        backgroundColor: "#FFF",
                    }}>
                        {
                            this.state.userStatus === USER_STATUS.NO_AUTH
                            &&
                            <View style={{
                                margin: 10,
                                marginTop: 20,
                                height: 150,
                                flexDirection: "column",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: "#333",
                                }}>Login Account</Text>
                                <FloatLabelTextInput
                                    placeholder={"email"}
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    // noBorder
                                    maxLength={100}
                                    selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                                    onFocus={() => {

                                    }}
                                    onBlur={() => {
                                        
                                    }}
                                    onChangeTextValue={(txt) => {
                                        this.setState({
                                            email: txt,
                                        })
                                    }}
                                    style={{
                                        fontSize: 15,
                                    }}
                                />
                                <FloatLabelTextInput
                                    placeholder={"password"}
                                    value={this.state.password}
                                    keyboardType="default"
                                    secureTextEntry
                                    // noBorder
                                    maxLength={100}
                                    selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                                    onFocus={() => {

                                    }}
                                    onBlur={() => {
                                        
                                    }}
                                    onChangeTextValue={(txt) => {
                                        this.setState({
                                            password: txt,
                                        })
                                    }}
                                    style={{
                                        fontSize: 15,
                                    }}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start", 
                                    marginTop: 10,
                                }}>
                                    <Button 
                                        icon={{name: "assignment-ind", color: "#fff", size: 14,}} 
                                        title={"Sign In"} 
                                        titleStyle={{color: "#fff", fontSize: 14, }}
                                        buttonStyle={{
                                            backgroundColor: "#00b33c",
                                        }}
                                        containerStyle={{
                                            marginRight: 10,
                                        }}
                                        onPress={async () => {
                                            if (!this.state.email || !this.state.password) {
                                                DropDownHolder.getDropDown().alertWithType('error', 'Error', "Please fill the both fields")
                                            } else {
                                                let formData = new FormData();
                                                formData.append("email", this.state.email);
                                                formData.append("password", this.state.password);

                                                fetch(Constants.API_ENDPOINTS.BASE + Constants.API_ENDPOINTS.SIGN_IN, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                    body: formData
                                                })
                                                .then((response) => response._bodyText)
                                                .then(async (responseJson) => {

                                                    // if (responseJson == Constants.API_CODES.SUCCESS) {

                                                    //     await Storage.storeData(Constants.STORAGE_CODES.AUTH_USER, JSON.stringify({
                                                    //         email: this.state.email,
                                                    //         password: this.state.password,
                                                    //     }))
                                                        
                                                    //     this.setState({
                                                    //         userStatus: USER_STATUS.LOGGED_IN,
                                                    //     })
                                                    //     DropDownHolder.getDropDown().alertWithType('success', 'Success', "User created with success");
                                                    // } else {
                                                    //     DropDownHolder.getDropDown().alertWithType('error', 'Error', responseJson);
                                                    // }
                                                })
                                                .catch((error) =>{
                                                    alert(JSON.stringify(error))
                                                })
                                            }
                                        }}
                                    />
                                    <Button 
                                        icon={{name: "assignment", color: "#fff", size: 14,}} 
                                        title={"Sign Up"} 
                                        titleStyle={{color: "#fff", fontSize: 14, }}
                                        buttonStyle={{
                                            backgroundColor: "#008ae6",
                                        }}
                                        containerStyle={{
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                userStatus: USER_STATUS.REGISTER,
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        {
                            this.state.userStatus === USER_STATUS.LOGGED_IN
                            &&
                            <View style={{
                                margin: 10,
                                marginTop: 20,
                                height: 150,
                                flexDirection: "column",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: "#333",
                                }}>Account</Text>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: 'normal',
                                    color: "#222",
                                }}>{ this.state.email }</Text>
                                <View style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start", 
                                    marginTop: 10,
                                }}>
                                    <Button 
                                        icon={{name: "exit-to-app", color: "#fff", size: 14,}} 
                                        title={"Sign Out"} 
                                        titleStyle={{color: "#fff", fontSize: 14, }}
                                        buttonStyle={{
                                            backgroundColor: "#ff8080",
                                        }}
                                        containerStyle={{
                                        }}
                                        onPress={async () => {
                                            await Storage.removeData(Constants.STORAGE_CODES.AUTH_USER)
                                            this.setState({
                                                email: null,
                                                password: null,
                                                password_confirm: null,
                                                userStatus: USER_STATUS.NO_AUTH,
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        {
                            this.state.userStatus === USER_STATUS.REGISTER
                            &&
                            <View style={{
                                margin: 10,
                                marginTop: 20,
                                height: 200,
                                flexDirection: "column",
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    color: "#333",
                                }}>New Account</Text>
                                <FloatLabelTextInput
                                    placeholder={"email"}
                                    value={this.state.email}
                                    keyboardType="email-address"
                                    // noBorder
                                    maxLength={100}
                                    selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                                    onFocus={() => {

                                    }}
                                    onBlur={() => {
                                        
                                    }}
                                    onChangeTextValue={(txt) => {
                                        this.setState({
                                            email: txt,
                                        })
                                    }}
                                    style={{
                                        fontSize: 15,
                                    }}
                                />
                                <FloatLabelTextInput
                                    placeholder={"password"}
                                    value={this.state.password}
                                    keyboardType="default"
                                    secureTextEntry
                                    // noBorder
                                    maxLength={100}
                                    selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                                    onFocus={() => {

                                    }}
                                    onBlur={() => {
                                        
                                    }}
                                    onChangeTextValue={(txt) => {
                                        this.setState({
                                            password: txt,
                                        })
                                    }}
                                    style={{
                                        fontSize: 15,
                                    }}
                                />
                                <FloatLabelTextInput
                                    placeholder={"confirm password"}
                                    value={this.state.password_confirm}
                                    keyboardType="default"
                                    secureTextEntry
                                    // noBorder
                                    maxLength={100}
                                    selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                                    onFocus={() => {

                                    }}
                                    onBlur={() => {
                                        
                                    }}
                                    onChangeTextValue={(txt) => {
                                        this.setState({
                                            password_confirm: txt,
                                        })
                                    }}
                                    style={{
                                        fontSize: 15,
                                    }}
                                />
                                <View style={{
                                    flexDirection: "row",
                                    alignSelf: "flex-start", 
                                    marginTop: 10,
                                }}>
                                    <Button 
                                        icon={{name: "assignment-ind", color: "#fff", size: 14,}} 
                                        title={"Sign Up"} 
                                        titleStyle={{color: "#fff", fontSize: 14, }}
                                        buttonStyle={{
                                            backgroundColor: "#00b33c",
                                        }}
                                        containerStyle={{
                                            marginRight: 10,
                                        }}
                                        onPress={async () => {
                                            if (!this.state.email || !this.state.password || !this.state.password_confirm) {
                                                DropDownHolder.getDropDown().alertWithType('error', 'Error', "Invalid credentials")
                                            } else if (this.state.password != this.state.password_confirm) {
                                                DropDownHolder.getDropDown().alertWithType('error', 'Error', "Password does not match")
                                            } else {
                                                let formData = new FormData();
                                                formData.append("email", this.state.email);
                                                formData.append("password", this.state.password);

                                                fetch(Constants.API_ENDPOINTS.BASE + Constants.API_ENDPOINTS.USER_REGISTRATION, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                    body: formData
                                                })
                                                .then((response) => response._bodyText)
                                                .then(async (responseJsonStringify) => {
                                                    let responseJson = null
                                                    
                                                    if (responseJsonStringify) {
                                                        
                                                        try {
                                                            responseJson = JSON.parse(responseJsonStringify)
                                                        } catch(e1) {
                                                            console.log('responseJsonStringify... e: ' + JSON.stringify(e1))
                                                        }
                                                        
                                                    }
                                                    if (responseJson && (responseJson.code == Constants.API_CODES.SUCCESS)) {
                                                        await Storage.storeData(Constants.STORAGE_CODES.AUTH_USER, JSON.stringify({
                                                            email: this.state.email,
                                                            password: this.state.password,
                                                            user_id: responseJson.id,
                                                        }))
                                                        
                                                        this.setState({
                                                            userStatus: USER_STATUS.LOGGED_IN,
                                                        })
                                                        DropDownHolder.getDropDown().alertWithType('success', 'Success', "User created with success");
                                                    } else {
                                                        DropDownHolder.getDropDown().alertWithType('error', 'Error', responseJson.error);
                                                    }
                                                })
                                                .catch((error) =>{
                                                    alert(JSON.stringify(error))
                                                })
                                            }
                                        }}
                                    />
                                    <Button 
                                        icon={{name: "undo", color: "#444", size: 14,}} 
                                        title={"Cancel"} 
                                        titleStyle={{color: "#444", fontSize: 14, }}
                                        buttonStyle={{
                                            backgroundColor: "#CCC",
                                        }}
                                        containerStyle={{
                                        }}
                                        onPress={() => {
                                            this.setState({
                                                userStatus: USER_STATUS.NO_AUTH,
                                            })
                                        }}
                                    />
                                </View>
                            </View>
                        }
                        <View style={{
                            flex: 0.7,
                            flexDirection: "column",
                        }}>

                        </View>
                    </View>
                </View>
            </SideMenu>
        )
    }
}