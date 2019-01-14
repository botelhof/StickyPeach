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

import SquareComponent from './SquareComponent'

const { width, height } = Dimensions.get('window')

export default class GalleryComponent extends React.Component {

    constructor (props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        const {collections} = this.props

        return (
            <View style={{flex: 1,}}>
                <FlatList
                    data={ collections }
                    renderItem={ (collection) =>
                        <SquareComponent collection={collection} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            </View>
        )
    }
}
