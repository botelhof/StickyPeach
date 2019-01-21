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

import * as Constants from '../utils/Constants.js'
export default class MenuSideView extends React.Component {
    componentWillMount() {
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: Constants.COLORS.SYSTEM.SECONDARY, paddingLeft: 10,}}>
                <ScrollView style={{flex: 1, backgroundColor: Constants.COLORS.SYSTEM.PRIMARY}}>
                    <View style={{flex: 1, marginTop: 100, marginLeft: 20,}}>
                        <TouchableOpacity onPress={() => {
                            this.props.callbackOnPressLink
                            this.props.navigator.navigate("Collections")
                        }}>
                            <Text style={{fontWeight: this.props.navigator.state.routeName === "Collections" ? 'bold' : 'normal'}}>Collections</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.callbackOnPressLink
                            this.props.navigator.navigate("Categories")
                        }}>
                            <Text style={{fontWeight: this.props.navigator.state.routeName === "Categories" ? 'bold' : 'normal'}}>Categories</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.callbackOnPressLink
                            this.props.navigator.navigate("Settings")
                        }}>
                            <Text style={{fontWeight: this.props.navigator.state.routeName === "Settings" ? 'bold' : 'normal'}}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}