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
    Button,
} from 'react-native-elements'

import * as Constants from '../utils/Constants.js'


export default class MenuButtonComponent extends React.Component {
    render() {
        return (
            <Button
                icon={{
                    name: "menu",
                    color: Constants.COLORS.SYSTEM.PRIMARY,
                }}
                buttonStyle={{
                    backgroundColor: "transparent",
                }}
                containerStyle={{
                    backgroundColor: Constants.COLORS.SYSTEM.SECONDARY,
                    padding: 5,
                    paddingRight: 15,
                    top: 50,
                    right: 0,
                    zIndex: 100,
                    position: "absolute",
                    // opacity: 0.6,
                }}
                title=""
                onPress={this.props.callbackOnPress}
            />
        )
    }
}