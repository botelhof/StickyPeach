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
    Button,
} from 'react-native'
import { 
    Header,
} from 'react-navigation'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'
import SideMenu from 'react-native-side-menu'

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

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super()
        this.state = {
            refreshing: false,
            showNavTitle: false,
            isOpen: false,
            image: null,
        }
    }

    _pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                // allowsEditing: true,
                base64: true,
                // aspect: [4, 3],
            })
    
            // console.log(result);
    
            if (!result.cancelled) {
                // stickyPeachDB.insertStep({
                //     orderNumber: 1, 
                //     description: "some description bbbbb", 
                //     picture: result.base64, 
                // }, 1)


                // this.setState({ image: result.base64 })

                // console.log("result: " + JSON.stringify(result.base64))
                // stickyPeachDB.insertDefaultSettingsBlob("defaultImage", result.base64)
            }
        }
    }

    render() {
        const menu = <MenuSideView navigator={this.props.navigation}/>
        const moduleDescription = "Settings"

        let { image } = this.state

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
                    <StatusBar barStyle="light-content" />
                    <View style={{ flex: 1, width: width, paddingTop: 50, backgroundColor: Constants.COLORS.SYSTEM.THIRD }}>
                        <Text>{moduleDescription}</Text>
                        <Button
                            title="Pick an image from camera roll"
                            onPress={this._pickImage}
                        />
                        <Image source={{uri: `data:image/jpg;base64,${image}`,}} style={{ width: 200, height: 200 }} />
                    </View>
                </View>
            </SideMenu>
        )
    }
}