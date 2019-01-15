import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Image,
    StatusBar,
    FlatList,
} from 'react-native'
import {
    Icon,
} from 'react-native-elements'
import SquareComponent from './SquareComponent'

import * as Constants from '../utils/Constants.js'

const { width, height } = Dimensions.get('window')

export default class GalleryComponent extends React.Component {

    constructor (props) {
        super(props)
    }

    componentDidMount() {

    }

    _renderSeparator = () => {
        return (
            <View style={{
                margin: 10,
            }}>
                <Icon 
                    name="local-dining" 
                    size={12} 
                    color={Constants.COLORS.SYSTEM.PRIMARY}
                    reverse
                    reverseColor={Constants.COLORS.SYSTEM.SECONDARY}
                    containerStyle={{
                        alignSelf: "center",
                    }}
                />
            </View>
        )
    }

    render() {
        const {collections} = this.props
        const nav = this.props.nav

        console.log("navigation: " + JSON.stringify(nav))

        return (
            <View 
                style={{
                    flex: 1,
                    // alignItems: "center",
                }}
            >
                <FlatList
                    data={ collections }
                    renderItem={ (collection) =>
                        <SquareComponent collection={collection} nav={nav} navigateTo={this.props.navigateTo} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    contentContainerStyle={{
                        alignItems: "center",
                        marginTop: 10,
                    }}
                    // columnWrapperStyle={{
                    //     marginLeft: 10,
                    //     marginRight: 10,
                    // }}
                    ItemSeparatorComponent={this._renderSeparator}
                />
            </View>
        )
    }
}
