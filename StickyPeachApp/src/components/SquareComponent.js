import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native'
import * as Constants from '../utils/Constants.js'

const { width, height } = Dimensions.get('window')

export default class SquareComponent extends React.Component {

    componentDidMount() {

    }

    render() {
        const {collection} = this.props
        const {navigateTo} = this.props

        //const viewLength = (width / 2) - 50
        const viewLength = width * 0.8
        console.log("collection: " + JSON.stringify(collection))
        // console.log("this.props.navigation: " + JSON.stringify(this.props.nav))

        return (
            <View 
                style={{
                    width: viewLength,
                    height: viewLength + 100,
                    // borderBottomWidth: 0.8,
                    // borderBottomColor: Constants.COLORS.SYSTEM.PRIMARY,
                    // borderTopWidth: 0.8,
                    // borderTopColor: Constants.COLORS.SYSTEM.PRIMARY,
                    flexDirection: "column",
                    paddingTop: 5,
                }}
            >
                <TouchableOpacity onPress={() => {
                    this.props.nav.navigate(navigateTo, {collection: collection})
                }}>
                    <Image 
                        source={require("../../assets/pasta.jpg")}
                        // width={viewLength - 10} 
                        // height={viewLength - 10} 
                        resizeMode="cover"
                        style={{
                            // flex: 1,
                            width: viewLength,
                            height: viewLength,
                        }} 
                    />
                </TouchableOpacity>
                <View style={{
                    // flex: 1,
                    flexDirection: "column",
                }}>
                    <Text style={{fontSize: 12, color: "#888", margin: 10,}}>{collection.item.headDescription}</Text>
                    <Text style={{fontSize: 14, color: "#444", marginLeft: 10, marginBottom: 10, marginRight: 10,}}>{collection.item.mainDescription}</Text>
                </View>
                <View style={{
                    flexDirection: "row",
                }}>
                    <Text style={{fontSize: 12, color: "#888", marginLeft: 10,}}>{collection.item.subtitleOne}.</Text>
                    <Text style={{fontSize: 12, color: "#888", marginLeft: 5, }}>Serves {collection.item.subtitleTwo}</Text>
                </View>
            </View>
        )
    }
}
