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
    ActivityIndicator,
} from 'react-native'
import * as Constants from '../utils/Constants.js'

import * as defaultSettings from '../utils/DefaultSettings'

const { width, height } = Dimensions.get('window')

export default class SquareComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            default_image: null,
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true,
        })

        defaultSettings.getDefaultImage()
        .then((dbRow) => {
            // console.log("dbRow: " + JSON.stringify(dbRow._array[0].val_blob))
            // const pic = JSON.parse(dbRow)._array[0].val_blob
            this.setState({
                isLoading: false,
                defaultImage: dbRow && dbRow._array[0] ? dbRow._array[0].val_blob : null,
            })
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                }}>
                    <ActivityIndicator />
                </View>
            )
        }

        const {collection} = this.props
        const {recipe} = this.props
        const {navigateTo} = this.props

        //const viewLength = (width / 2) - 50
        const viewLength = width * 0.7
        // console.log("collection: " + JSON.stringify(collection))
        // console.log("this.props.navigation: " + JSON.stringify(this.props.nav))

        const headDescription = collection.item.headDescription ? (
            <Text style={{fontSize: 12, color: "#888", margin: 10,}}>{collection.item.headDescription}</Text>
        ) : null
        
        const mainDescription = collection.item.mainDescription ? (
            <Text style={{fontSize: 14, color: "#444", marginLeft: 10, marginBottom: 10, marginRight: 10,}}>{collection.item.mainDescription}</Text>
        ) : null

        const subtitleOne = collection.item.subtitleOne ? (
            <Text style={{fontSize: 12, color: "#888", marginLeft: 10,}}>{collection.item.subtitleOne}.</Text>
        ) : null
        const subtitleTwo = collection.item.subtitleTwo ? (
            <Text style={{fontSize: 12, color: "#888", marginLeft: 5, }}>Serves {collection.item.subtitleTwo}</Text>
        ) : null

        const picture = (collection.item && collection.item.picture) ? (
            <Image 
                source={{uri: `data:image/jpg;base64,${collection.item.picture}`,}} 
                style={{ 
                    width: viewLength,
                    height: viewLength,
                    borderColor: Constants.COLORS.SYSTEM.PRIMARY,
                    borderWidth: 1,
                }} 
            />
        ) : (
            <Image 
                source={{uri: `data:image/jpg;base64,${this.state.defaultImage}`,}} 
                
                style={{ 
                    width: viewLength,
                    height: viewLength,
                    borderColor: Constants.COLORS.SYSTEM.THIRD,
                    borderWidth: 1,
                }} 
            />
        )

        return (
            <View 
                style={{
                    width: viewLength,
                    height: viewLength + 80,
                    flexDirection: "column",
                    paddingTop: 5,
                }}
            >
                <TouchableOpacity onPress={() => {
                    this.props.nav.navigate(navigateTo, {collection: collection, recipe: recipe, idx: collection.item.id})
                }}>
                    { picture }
                </TouchableOpacity>
                <View style={{
                    flexDirection: "column",
                    marginTop: 5,
                }}>
                    { headDescription }
                    <TouchableOpacity onPress={() => {
                        this.props.nav.navigate(navigateTo, {collection: collection, recipe: recipe, idx: collection.item.id})
                    }}>
                        { mainDescription }
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: "row",
                    marginTop: 5,
                }}>
                    { subtitleOne }
                    { subtitleTwo }
                </View>
            </View>
        )
    }
}
