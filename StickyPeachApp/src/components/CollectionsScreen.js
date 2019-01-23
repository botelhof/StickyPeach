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
import {
    Icon,
} from 'react-native-elements'

import GalleryComponent from './GalleryComponent'
import MenuSideView from './MenuSideView'
import MenuButtonComponent from './MenuButtonComponent'

import * as Animatable from 'react-native-animatable'
import * as stickyPeachDB from '../database/db.js'
import * as Constants from '../utils/Constants.js'

const { width, height } = Dimensions.get('window')

const IMG_HEIGHT = height / 1.5
const MIN_HEIGHT = Header.HEIGHT + 200
const MAX_HEIGHT = IMG_HEIGHT

export default class CollectionsScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            showNavTitle: false,
            isOpenz: false,
        }

        this.props.navigation.addListener('willFocus', this.enterScreen)
    }

    enterScreen = async () => {
        const original = await stickyPeachDB.selectAllCollections()

        if (original) {
            this.setState({
                list: this._translate(original._array)
            })
        }
    }

    componentDidMount() {
        stickyPeachDB.initDatabase()
        
        // stickyPeachDB.insertRandomUser()
        // stickyPeachDB.insertRecipe({
        //     name: "aaaaa", 
        //     time_preparation: 10, 
        //     time_cook: 40, 
        //     serves: 2, 
        //     description: "some description aaaaa", 
        //     vegan: false, 
        // }, 1)

        // stickyPeachDB.selectAllUsers()
        // stickyPeachDB.selectAllRecipes()
        // stickyPeachDB.selectAllSteps()
        // stickyPeachDB.selectAllDefaultSettings()
        // stickyPeachDB.selectAllCollections()
        // this.enterScreen()
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

    _translate = (originalList) => {
        let listTranslated = new Array()
        for (let i = 0; i < originalList.length; i++) {
            const originalItem = originalList[i]

            let translatedItem = {}
            translatedItem['mainDescription'] = originalItem.name
            translatedItem['headDescription'] = ""
            translatedItem['subtitleOne'] = ""
            translatedItem['subtitleTwo'] = ""
            translatedItem['vegan'] = false
            translatedItem['picture'] = originalItem.picture

            listTranslated.push(translatedItem)
        }

        // console.log("listTranslated: " + JSON.stringify(listTranslated))
        return listTranslated
    }

    // _getDummyArray = () => {
    //     const totalEntries = 9
    //     let arr = new Array()

    //     for (let i = 1; i <= totalEntries; i++) {
    //         arr.push({"id": i, "mainDescription": "Italian " + i, "headDescription": "Italian", "subtitleOne" : "20 min", "subtitleTwo": "4", "vegan" : true,})
    //     }

    //     return arr
    // }

    render() {
        const menu = <MenuSideView navigator={this.props.navigation}/>
        const moduleDescription = "Collections"
        return (
            <SideMenu 
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
            >
                <View style={{ flex: 1 }}>
                    <Icon 
                        name="add"
                        raised
                        reverse
                        reverseColor={Constants.COLORS.SYSTEM.SECONDARY}
                        color={Constants.COLORS.SYSTEM.PRIMARY}
                        containerStyle={{
                            position: "absolute",
                            bottom: 0,
                            right: 0, 
                            zIndex: 102,
                        }}
                        onPress={() => {
                            this.props.navigation.navigate("CollectionNew")
                        }}
                    />
                    <MenuButtonComponent 
                        callbackOnPress={() => {
                            this.setState({
                                isOpen: true,
                            })
                        }}
                    />
                    <StatusBar barStyle="light-content" />
                    <HeaderImageScrollView
                        maxHeight={MAX_HEIGHT}
                        minHeight={MIN_HEIGHT}
                        maxOverlayOpacity={0.5}
                        minOverlayOpacity={0.1}
                        fadeOutForeground
                        renderHeader={() => <Image source={require('../../assets/salads.jpg')} style={styles.image} />}
                        renderFixedForeground={() => (
                            <Animatable.View
                                style={styles.navTitleView}
                                ref={navTitleView => {
                                    this.navTitleView = navTitleView;
                                }}
                            >
                                <Text style={styles.navTitle}>
                                    {moduleDescription}
                                </Text>
                            </Animatable.View>
                        )}
                        renderForeground={() => (
                            <View style={styles.titleContainer}>
                                <Text style={styles.imageTitle}>{moduleDescription}</Text>
                            </View>
                        )}
                        >
                        <TriggeringView
                            style={styles.section}
                            onHide={() => this.navTitleView.fadeInUp(200)}
                            onDisplay={() => this.navTitleView.fadeOut(100)}
                        >
                            <Text>{moduleDescription}</Text>
                        </TriggeringView>
                        <GalleryComponent collections={this.state.list} navigateTo="Collection" nav={this.props.navigation} />
                    </HeaderImageScrollView>
                </View>
            </SideMenu>
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