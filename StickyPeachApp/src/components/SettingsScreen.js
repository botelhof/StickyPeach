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

import GalleryComponent from './GalleryComponent'
import MenuSideView from './MenuSideView'
import MenuButtonComponent from './MenuButtonComponent'

import * as Animatable from 'react-native-animatable'
import * as whiskDB from '../database/db.js'
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
        }
    }

    render() {
        const menu = <MenuSideView navigator={this.props.navigation}/>
        const moduleDescription = "Settings"
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
                    <View style={{ flex: 1, width: width, backgroundColor: Constants.COLORS.SYSTEM.THIRD }}>
                        <Text>{moduleDescription}</Text>
                    </View>
                </View>
            </SideMenu>
        )
    }
}