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

    enterScreen = async () => {
        // const original = await stickyPeachDB.selectAllCollections()

        // if (original) {
            this.setState({
                // list: this._translate(original._array),
                isOpen: false,
            })
        // }
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
                                        onPress={() => {
                                            
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
                                            let formData = new FormData();
                                            formData.append("email", this.state.email);
                                            formData.append("password", this.state.password);

                                            fetch('https://stickypeach.000webhostapp.com/user_registration.php', {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'multipart/form-data',
                                                },
                                                body: formData
                                            })
                                            .then((response) => response._bodyText)
                                            .then((responseJson) => {

                                                alert(JSON.stringify(responseJson))

                                            })
                                            .catch((error) =>{
                                                alert(JSON.stringify(error))
                                            });
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
                                        onPress={() => {
                                            
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
                                        onPress={() => {
                                            
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