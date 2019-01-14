import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    RefreshControl,
    Image,
    StatusBar,
} from 'react-native'

const { width, height } = Dimensions.get('window')

export default class SquareComponent extends React.Component {

    componentDidMount() {

    }

    render() {
        const {collection} = this.props
        const viewLength = (width / 2) - 50
        console.log("collection: " + JSON.stringify(collection))

        return (
            <View 
                style={{
                    // flex: 1,
                    backgroundColor: '#fff',
                    width: viewLength,
                    height: viewLength,
                    borderColor: "#00cca3",
                    borderWidth: 1,
                    margin: 25,
                    marginBottom: 0,
                    flexDirection: "column",
                }}
            >
                <Image 
                    source={require("../../assets/pasta.jpg")}
                    // width={viewLength - 10} 
                    // height={viewLength - 10} 
                    resizeMode="contain"
                    style={{
                        // flex: 1,
                        width: viewLength - 10,
                        height: viewLength - 10,
                    }} 
                />
            </View>
        )
    }
}
