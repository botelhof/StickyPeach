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
import { 
    Header,
} from 'react-navigation'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'

import GalleryComponent from './GalleryComponent'

import * as Animatable from 'react-native-animatable'
import * as whiskDB from '../database/db.js'
import * as Constants from '../utils/Constants.js'

const { width, height } = Dimensions.get('window')

const IMG_HEIGHT = height / 1.5
const MIN_HEIGHT = Header.HEIGHT + 200
const MAX_HEIGHT = IMG_HEIGHT

export default class CategoryScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }


    constructor() {
        super()
        this.state = {
            refreshing: false,
            showNavTitle: false
        }
    }

    componentDidMount() {
        whiskDB.initDatabase()
        // whiskDB.insertRandomUser()
        whiskDB.selectAllUsers()
    }

    _onRefresh() {
        this.setState({
            refreshing: true,
        })

        setTimeout(() => {
            this.setState({
                refreshing: false,
            })
        }, 2000)
    }

    _getDummyArray = () => {
        const totalEntries = 9
        let arr = new Array()

        for (let i = 1; i <= totalEntries; i++) {
            arr.push({"id": i, "description": "Some pasta yeee. " + i, "category": "Italia", "totalTime" : "20 min", "serves": "4", "vegan" : false,})
        }

        return arr
    }

    render() {
        const collection = this.props.navigation.state.params.collection
        console.log("collection categoryScreen: " + JSON.stringify(this.props))
        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" />
                <HeaderImageScrollView
                    maxHeight={MAX_HEIGHT}
                    minHeight={MIN_HEIGHT}
                    maxOverlayOpacity={0.5}
                    minOverlayOpacity={0.1}
                    fadeOutForeground
                    renderHeader={() => <Image source={require('../../assets/pasta.jpg')} style={styles.image} />}
                    renderFixedForeground={() => (
                        <Animatable.View
                            style={styles.navTitleView}
                            ref={navTitleView => {
                                this.navTitleView = navTitleView;
                            }}
                        >
                            <Text style={styles.navTitle}>
                                {collection.item.description}
                            </Text>
                        </Animatable.View>
                    )}
                    renderForeground={() => (
                        <View style={styles.titleContainer}>
                            <Text style={styles.imageTitle}>{collection.item.description}</Text>
                        </View>
                    )}
                    >
                    <GalleryComponent collections={this._getDummyArray()} />
                </HeaderImageScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        height: IMG_HEIGHT,
        width: width,
        alignSelf: 'stretch',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
    },
    name: {
        fontWeight: 'bold',
    },
    section: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        backgroundColor: 'white',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionContent: {
        fontSize: 16,
        textAlign: 'justify',
    },
    keywords: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },
    keywordContainer: {
        backgroundColor: '#999999',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    keyword: {
        fontSize: 16,
        color: '#e6fffa',
    },
    titleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginLeft: 20,
        marginBottom: 20,
        marginRight: 10,
    },
    imageTitle: {
        color: Constants.COLORS.SYSTEM.SECONDARY,
        backgroundColor: 'transparent',
        fontSize: 24,
        backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
        padding: 10,
    },
    navTitleView: {
        height: MIN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        opacity: 0,
    },
    navTitle: {
        color: '#e6fffa',
        fontSize: 18,
        backgroundColor: 'transparent',
    },
    sectionLarge: {
        height: 600,
    },
})
  