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

export default class MenuSideView extends React.Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#fff"}}>
                <ScrollView style={{flex: 1,}}>
                    <View style={{flex: 1, marginTop: 100, marginLeft: 20,}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.navigate("Categories")
                        }}>
                            <Text>Collections</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.navigate("Settings")
                        }}>
                            <Text>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}