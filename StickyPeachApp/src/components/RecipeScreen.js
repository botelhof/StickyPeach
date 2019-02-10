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
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native'
import {
    Button,
    Icon,
    ButtonGroup,
} from 'react-native-elements'
import { 
    Header,
} from 'react-navigation'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view'
import SideMenu from 'react-native-side-menu'
import ActionButton from 'react-native-circular-action-menu'

import GalleryComponent from './GalleryComponent'
import MenuSideView from './MenuSideView'
import MenuButtonComponent from './MenuButtonComponent'

import * as Animatable from 'react-native-animatable'
import * as stickyPeachDB from '../database/db.js'
import * as Constants from '../utils/Constants.js'
import * as defaultSettings from '../utils/DefaultSettings'
import * as Utils from '../utils/Utils'

const { width, height } = Dimensions.get('window')

const IMG_HEIGHT = height / 1.5
const MIN_HEIGHT = Header.HEIGHT + 200
const MAX_HEIGHT = IMG_HEIGHT

export default class RecipeScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            refreshing: false,
            showNavTitle: false,
            isOpen: false,
            isLoading: true,
            selectedRecipePropsIndex: 0,
        }

        this.updateRecipePropsIndex = this.updateRecipePropsIndex.bind(this)
        this.props.navigation.addListener('willFocus', this.enterScreen)
    }

    updateRecipePropsIndex(selectedRecipePropsIndex) {
        this.setState({selectedRecipePropsIndex})
    }
    
    enterScreen = async () => {
        const recipeId = this.props.navigation.state.params.idx

        const recipe = await stickyPeachDB.selectRecipeById(recipeId)
        const recipeSteps = await stickyPeachDB.selectRecipeStepsByRecipeId(recipeId)
        const recipeMaterials = await stickyPeachDB.selectRecipeMaterialsByRecipeId(recipeId)
        const recipeIngredients = await stickyPeachDB.selectRecipeIngredientsByRecipeId(recipeId)
        
        if (recipe) {
            this.setState({
                recipe: this._translateRecipe(recipe._array)[0],
                recipeSteps: this._translateRecipeStep(recipeSteps._array),
                recipeMaterials: this._translateRecipeMaterial(recipeMaterials._array),
                recipeIngredients: this._translateRecipeIngredient(recipeIngredients._array),
            })
        }
    }

    async componentDidMount() {
        this.setState({
            isLoading: true,
        })
        
        await this.enterScreen()

        defaultSettings.getDefaultImage()
        .then((dbRow) => {
            this.setState({
                isLoading: false,
                recipe_temp_id: Utils.guid(),
                defaultImage: dbRow && dbRow._array[0] ? dbRow._array[0].val_blob : null,
            })
        })
    }

    _translateRecipe = (originalList) => {
        let listTranslated = new Array()
        for (let i = 0; i < originalList.length; i++) {
            const originalItem = originalList[i]

            let translatedItem = {}
            translatedItem['id'] = originalItem.id
            translatedItem['name'] = originalItem.name
            translatedItem['description'] = originalItem.description
            translatedItem['time_preparation'] = originalItem.time_preparation
            translatedItem['time_cook'] = originalItem.time_cook
            translatedItem['time_preparation'] = originalItem.time_preparation
            translatedItem['serves'] = originalItem.serves
            translatedItem['vegan'] = false
            translatedItem['picture'] = originalItem.picture

            listTranslated.push(translatedItem)
        }

        return listTranslated
    }

    _translateRecipeStep = (originalList) => {
        let listTranslated = new Array()
        for (let i = 0; i < originalList.length; i++) {
            const originalItem = originalList[i]

            let translatedItem = {}
            translatedItem['id'] = originalItem.id
            translatedItem['description'] = originalItem.description
            translatedItem['picture'] = originalItem.picture
            translatedItem['orderNumber'] = originalItem.orderNumber
            translatedItem['recipe_id'] = originalItem.recipe_id

            // console.log("step item: id: " + translatedItem.id + ", orderNumber: " + translatedItem.orderNumber + ", recipe_id: " + translatedItem.recipe_id)
            listTranslated.push(translatedItem)
        }

        return listTranslated
    }

    _translateRecipeMaterial = (originalList) => {
        let listTranslated = new Array()
        for (let i = 0; i < originalList.length; i++) {
            const originalItem = originalList[i]

            let translatedItem = {}
            translatedItem['id'] = originalItem.id
            translatedItem['description'] = originalItem.description
            translatedItem['picture'] = originalItem.picture
            translatedItem['orderNumber'] = originalItem.orderNumber
            translatedItem['recipe_id'] = originalItem.recipe_id

            listTranslated.push(translatedItem)
        }

        return listTranslated
    }

    _translateRecipeIngredient = (originalList) => {
        let listTranslated = new Array()
        for (let i = 0; i < originalList.length; i++) {
            const originalItem = originalList[i]

            let translatedItem = {}
            translatedItem['id'] = originalItem.id
            translatedItem['description'] = originalItem.description
            translatedItem['picture'] = originalItem.picture
            translatedItem['orderNumber'] = originalItem.orderNumber
            translatedItem['recipe_id'] = originalItem.recipe_id

            listTranslated.push(translatedItem)
        }

        return listTranslated
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

    _keyExtractorRecipeStep = (item, index) => "" + item.id;
    _keyExtractorRecipeIngredient = (item, index) => "" + item.id;
    _keyExtractorRecipeMaterial = (item, index) => "" + item.id;

    _renderRecipeStepItem = ({item}) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#eee',
        }}>
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                width: 25,
                height: 25,
                margin: 5,
                backgroundColor: Constants.COLORS.SYSTEM.FOUR,
                borderRadius: 25,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: "center",
                justifyContent: 'center',
            }}>
                <Text style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: "center",
                    justifyContent: 'center',
                    color: Constants.COLORS.SYSTEM.SECONDARY,
                    fontSize: 10,
                }}>{item.orderNumber}</Text>
            </View>
            {
                item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${item.picture}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
            {
                !item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${this.state.defaultImage}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
           
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                justifyContent: "center",
                // alignContent: "center",
                // alignItems: "center",
                // alignSelf: "center",
                marginLeft: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    
                }}>
                    <View style={{
                        //   height: 10,
                        //   backgroundColor: 'blue',
                    }}>
                        <Text 
                            style={{}}
                        >{item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    _renderRecipeMaterialItem = ({item}) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#eee',
        }}>
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                width: 25,
                height: 25,
                margin: 5,
                backgroundColor: Constants.COLORS.SYSTEM.FOUR,
                borderRadius: 25,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: "center",
                justifyContent: 'center',
            }}>
                <Text style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: "center",
                    justifyContent: 'center',
                    color: Constants.COLORS.SYSTEM.SECONDARY,
                    fontSize: 10,
                }}>{item.orderNumber}</Text>
            </View>
            {
                item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${item.picture}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
            {
                !item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${this.state.defaultImage}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
           
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                justifyContent: "center",
                // alignContent: "center",
                // alignItems: "center",
                // alignSelf: "center",
                marginLeft: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    
                }}>
                    <View style={{
                        //   height: 10,
                        //   backgroundColor: 'blue',
                    }}>
                        <Text 
                            style={{}}
                        >{item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    _renderRecipeIngredientItem = ({item}) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#eee',
        }}>
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                width: 25,
                height: 25,
                margin: 5,
                backgroundColor: Constants.COLORS.SYSTEM.FOUR,
                borderRadius: 25,
                alignContent: 'center',
                alignItems: 'center',
                alignSelf: "center",
                justifyContent: 'center',
            }}>
                <Text style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: "center",
                    justifyContent: 'center',
                    color: Constants.COLORS.SYSTEM.SECONDARY,
                    fontSize: 10,
                }}>{item.orderNumber}</Text>
            </View>
            {
                item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${item.picture}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
            {
                !item.picture
                &&
                <Image 
                    source={{uri: `data:image/jpg;base64,${this.state.defaultImage}`,}} 
                    style={{ 
                        width: 50,
                        height: 50,
                    }} 
                />
            }
           
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                justifyContent: "center",
                // alignContent: "center",
                // alignItems: "center",
                // alignSelf: "center",
                marginLeft: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    
                }}>
                    <View style={{
                        //   height: 10,
                        //   backgroundColor: 'blue',
                    }}>
                        <Text 
                            style={{}}
                        >{item.description}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )

    _renderSeparatorRecipeStep = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        )
    }

    _renderSeparatorRecipeMaterial = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        )
    }

    _renderSeparatorRecipeIngredient = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        )
    }

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }
        const menu = <MenuSideView navigator={this.props.navigation}/>
        return (
            <SideMenu 
                menu={menu}
                isOpen={this.state.isOpen}
                menuPosition="right"
            >
                <View style={{ flex: 1 }}>
                    <MenuButtonComponent 
                        callbackOnPress={() => {
                            this.setState({
                                isOpen: true,
                            })
                        }}
                    />
                    <View style={{
                        position: "absolute",
                        bottom: 15,
                        right: 20, 
                        // left: (width / 2) - 30,
                        zIndex: 102,
                        opacity: 0.8,
                    }}>
                        <ActionButton 
                            position="right"
                            radius={150}
                            size={50}
                            itemSize={40}
                            icon={
                                <Icon name="settings" color="#FFF" />
                            }
                            buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.MAIN}>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.COOK} title="Cook now" onPress={() => {
                                this.props.navigation.navigate("Cooking", {
                                    recipe_id: this.state.recipe.id,
                                })
                            }}>
                                <Icon name="play-arrow" color="#FFF" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.SHOPPING} title="Add do shopping list" onPress={() => console.log("notes tapped!")}>
                                <Icon name="add-shopping-cart" color="#444" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.EDIT} title="Edit" onPress={() => {}}>
                                <Icon name="edit" color="#FFF" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.FAVORITE} title="Add to favorites" onPress={() => {}}>
                                <Icon name="favorite" color="#FFF" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.BOOK} title="Add to recipe book" onPress={() => {}}>
                                <Icon name="import-contacts" color="#FFF" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                            <ActionButton.Item buttonColor={Constants.COLORS.SYSTEM.CRUD.MANAGE.DELETE} title="Delete recipe" onPress={() => {
                                Alert.alert(
                                    'Delete Recipe?',
                                    'Do you want to delete this recipe?',
                                    [
                                        {
                                            text: 'Delete', onPress: async () => {
                                                await stickyPeachDB.deleteRecipe(this.state.recipe.id)

                                                this.props.navigation.goBack()
                                            }
                                        },
                                        {
                                        text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                    ],
                                    {cancelable: false},
                                )
                            }}>
                                <Icon name="delete" color="#FFF" style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                        </ActionButton>
                    </View>
                    <StatusBar barStyle="light-content" />
                    <HeaderImageScrollView
                        maxHeight={MAX_HEIGHT}
                        minHeight={MIN_HEIGHT}
                        maxOverlayOpacity={0.5}
                        minOverlayOpacity={0.1}
                        fadeOutForeground
                        renderHeader={() => (
                            <Image source={{uri: `data:image/jpg;base64,${(this.state.recipe.picture ? this.state.recipe.picture : this.state.defaultImage)}`,}}  style={styles.image} />
                        )}
                        renderFixedForeground={() => (
                            <Animatable.View
                                style={styles.navTitleView}
                                ref={navTitleView => {
                                    this.navTitleView = navTitleView;
                                }}
                            >
                                <Button 
                                    icon={{name: "arrow-back", color: "#fff", size: 12,}} 
                                    title={"Go back"} 
                                    titleStyle={{color: "#fff", fontSize: 12, }}
                                    buttonStyle={{
                                        backgroundColor: "transparent",
                                    }}
                                    containerStyle={{alignSelf: "flex-start", }}
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}
                                />
                                <Text style={styles.navTitle}>
                                    {this.state.recipe.name}
                                </Text>
                            </Animatable.View>
                        )}
                        renderForeground={() => (
                            <View style={styles.titleContainer}>
                                <Button 
                                    icon={{name: "arrow-back", color: Constants.COLORS.SYSTEM.PRIMARY, size: 12,}} 
                                    title={"Go back"} 
                                    titleStyle={{color: Constants.COLORS.SYSTEM.PRIMARY, fontSize: 12, }}
                                    buttonStyle={{
                                        backgroundColor: Constants.COLORS.SYSTEM.SECONDARY,
                                    }}
                                    onPress={() => {
                                        this.props.navigation.goBack()
                                    }}
                                />
                                <Text style={styles.imageTitle}>{this.state.recipe.name}</Text>
                            </View>
                        )}
                        >
                        <TriggeringView
                            style={styles.section}
                            onHide={() => this.navTitleView.fadeInUp(200)}
                            onDisplay={() => this.navTitleView.fadeOut(100)}
                        >
                            <Text>{this.state.recipe.name}</Text>
                        </TriggeringView>
                        <ButtonGroup
                            onPress={this.updateRecipePropsIndex}
                            selectedIndex={this.state.selectedRecipePropsIndex}
                            buttons={['Ingredients', 'Materials', 'Steps']}
                            containerStyle={{height: 30,}} 
                            buttonStyle={{
                                backgroundColor: Constants.COLORS.SYSTEM.THIRD,
                            }}
                            textStyle={{
                                color: Constants.COLORS.SYSTEM.FOUR,
                            }}
                            selectedButtonStyle={{
                                backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
                            }}
                            selectedTextStyle={{
                                color: Constants.COLORS.SYSTEM.SECONDARY,
                            }}
                        />

                        {
                            this.state.selectedRecipePropsIndex === 0
                            &&
                            <View style={{
                                margin: 15,
                            }}>
                                {
                                    this.state.recipeIngredients && this.state.recipeIngredients.length > 0
                                    &&
                                    <FlatList
                                        data={this.state.recipeIngredients}
                                        extraData={this.state}
                                        keyExtractor={this._keyExtractorRecipeIngredient}
                                        renderItem={this._renderRecipeIngredientItem}
                                        ItemSeparatorComponent={this._renderSeparatorRecipeIngredient}
                                        style={{
                                            flex: 1,
                                            marginBottom: 30,
                                            marginTop: 10,
                                        }}
                                    />
                                }
                            </View>
                        }
                        {
                            this.state.selectedRecipePropsIndex === 1
                            &&
                            <View style={{
                                margin: 15,
                            }}>
                                {
                                    this.state.recipeMaterials && this.state.recipeMaterials.length > 0
                                    &&
                                    <FlatList
                                        data={this.state.recipeMaterials}
                                        extraData={this.state}
                                        keyExtractor={this._keyExtractorRecipeMaterial}
                                        renderItem={this._renderRecipeMaterialItem}
                                        ItemSeparatorComponent={this._renderSeparatorRecipeMaterial}
                                        style={{
                                            flex: 1,
                                            marginBottom: 30,
                                            marginTop: 10,
                                        }}
                                    />
                                }
                            </View>
                        }
                        {
                            this.state.selectedRecipePropsIndex === 2
                            &&
                            <View style={{
                                margin: 15,
                            }}>
                                {
                                    this.state.recipeSteps && this.state.recipeSteps.length > 0
                                    &&
                                    <FlatList
                                        data={this.state.recipeSteps}
                                        extraData={this.state}
                                        keyExtractor={this._keyExtractorRecipeStep}
                                        renderItem={this._renderRecipeStepItem}
                                        ItemSeparatorComponent={this._renderSeparatorRecipeStep}
                                        style={{
                                            flex: 1,
                                            marginBottom: 30,
                                            marginTop: 10,
                                        }}
                                    />
                                }
                            </View>
                        }
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
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})
  