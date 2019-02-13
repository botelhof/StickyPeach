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
    TouchableHighlight,
    Alert,
    Modal,
} from 'react-native'
import {
    Icon,
} from 'react-native-elements'
import Swiper from 'react-native-swiper'

import * as stickyPeachDB from '../database/db.js'
import * as Constants from '../utils/Constants.js'
import * as Utils from '../utils/Utils.js'
import * as defaultSettings from '../utils/DefaultSettings'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

export default class CookingScreen extends React.Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
        }

        this.props.navigation.addListener('willFocus', this.enterScreen)
    }

    componentDidMount() {
        defaultSettings.getDefaultImage()
        .then((dbRow) => {
            this.setState({
                defaultImage: dbRow && dbRow._array[0] ? dbRow._array[0].val_blob : null,
            })
        })
    }

    setStepAssociations(recipeStepAssociations) {
        let associationsObj = null

        if (recipeStepAssociations && recipeStepAssociations._array && recipeStepAssociations._array.length > 0) {
            console.log("FB: recipeStepAssociations: " + JSON.stringify(recipeStepAssociations._array))
            recipeStepAssociations._array.forEach(function (assoc) {
                if (assoc && assoc.si && assoc.sDesc) {
                    if (!associationsObj) {
                        associationsObj = {}
                    }
    
                    let stepProps
    
                    if (associationsObj.hasOwnProperty(assoc.si)) {
                        stepProps = associationsObj[assoc.si]
                    } else {
                        stepProps = new Array()
                    }
    
                    if (assoc.mDesc) {
                        stepProps.push({
                            type: "Material",
                            desc: assoc.mDesc,
                        })
                    } else if (assoc.iDesc) {
                        stepProps.push({
                            type: "Ingredient",
                            desc: assoc.iDesc,
                        })
                    } else {
                        stepProps.push({
                            type: "Ingredient",
                            desc: "Unknown",
                        })
                    }
    
                    associationsObj[assoc.si] = stepProps
                }
            })
        }

        if (associationsObj) {
            // console.log("FB: associationsObj: " + JSON.stringify(associationsObj))
            this.setState({
                associations: associationsObj,
            })
        }
    }

    getStepAssociations(stepId) {
        if (this.state.associations && this.state.associations.hasOwnProperty(stepId)) {
            return this.state.associations[stepId]
        }
        return [{
            type: "Ingredient",
            desc: "-",
        }]
    }

    enterScreen = async () => {
        const recipeId = this.props.navigation.state.params.recipe_id
        
        const recipe = await stickyPeachDB.selectRecipeById(recipeId)
        const recipeSteps = await stickyPeachDB.selectRecipeStepsByRecipeId(recipeId)
        const recipeMaterials = await stickyPeachDB.selectRecipeMaterialsByRecipeId(recipeId)
        const recipeIngredients = await stickyPeachDB.selectRecipeIngredientsByRecipeId(recipeId)
        const recipeStepAssociations = await stickyPeachDB.selectAllStepAssociations(recipeId).catch((err) => console.log("FB: err: " + JSON.stringify(err)))

        // console.log("FB: recipeStepAssociations: " + JSON.stringify(recipeStepAssociations))

        this.setStepAssociations(recipeStepAssociations)

        if (recipe) {
            this.setState({
                isLoading: false,
                recipe: this._translateRecipe(recipe._array)[0],
                recipeSteps: this._translateRecipeStep(recipeSteps._array),
                recipeMaterials: this._translateRecipeMaterial(recipeMaterials._array),
                recipeIngredients: this._translateRecipeIngredient(recipeIngredients._array),
            })
        } else {
            this.setState({
                isLoading: false,
            })
        }
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

    render() {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator />
            )
        }

        let viewsStepsArr = <View />
        // console.log("FB: this.state.recipeSteps: " + JSON.stringify(this.state.recipeSteps))
        if (this.state.recipeSteps) {
            viewsStepsArr = this.state.recipeSteps.map(step => (
                <View style={{
                    flex: 1,
                    flexDirection: "column",
                }} key={step.id}>
                    <Image 
                        source={{uri: `data:image/jpg;base64,${(step.picture ? step.picture : this.state.defaultImage)}`,}} 
                        style={{ 
                            width: width,
                            // height: 50,
                            flex: 4,
                        }} 
                    />
                    <ScrollView style={{
                        flex: 1,
                    }}>
                        <View style={{
                            flex: 1,
                            padding: 10,
                        }}>
                            <Text>{ step.description }</Text>
                        </View>
                    </ScrollView>
                    <View style={{
                        height: 100,
                        backgroundColor: "#333",
                        flexDirection: "row",
                    }}>
                        {
                            this.getStepAssociations(step.id).map((association, index) => (
                                <View 
                                    style={{
                                        height: 50,
                                        // backgroundColor: "#444",
                                        flexDirection: "row",
                                        padding: 5,
                                    }}
                                    key={index}
                                >
                                    <Icon
                                        name={ association.type === "Material" ? "local-dining" : "local-florist" }
                                        size={12}
                                        color="#FFF"
                                    />
                                    <Text style={{
                                        color: "#FFF",
                                        fontSize: 12,
                                        marginLeft: 5,
                                    }}>{ association.desc }</Text>
                                </View>
                            ))
                        }
                        <View style={{
                            height: 50,
                            // backgroundColor: "#CCC",
                        }}>

                        </View>
                    </View>
                </View>
            ))
        }

        return (
            <View styles={{
                flex: 1,
            }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                }}>
                    <Icon 
                        name="close"
                        reverse
                        reverseColor={Constants.COLORS.SYSTEM.COOKING.CLOSE.FONT}
                        color={Constants.COLORS.SYSTEM.COOKING.CLOSE.BACK}
                        size={12}
                        containerStyle={{
                            position: "absolute",
                            top: 20,
                            right: 0, 
                            zIndex: 102,
                            opacity: 0.5,
                        }}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                    />
                    <Swiper 
                        style={styles.wrapper} 
                        showsButtons={true}
                        loop={false}
                        activeDotColor={Constants.COLORS.SYSTEM.COOKING.PAGINATION.DOT_ACTIVE}
                        dotColor={Constants.COLORS.SYSTEM.COOKING.PAGINATION.DOT_INACTIVE}
                        nextButton={
                            <Icon
                                name="keyboard-arrow-right"
                                size={30}
                                color={Constants.COLORS.SYSTEM.COOKING.PAGINATION.BUTTON_NEXT}
                                containerStyle={{
                                    padding: 1,
                                    backgroundColor: "#FFF",
                                    borderRadius: 50,
                                    opacity: 0.7,
                                }}
                            />
                        }
                        prevButton={
                            <Icon
                                name="keyboard-arrow-left"
                                size={30}
                                color={Constants.COLORS.SYSTEM.COOKING.PAGINATION.BUTTON_PREVIOUS}
                                containerStyle={{
                                    padding: 1,
                                    backgroundColor: "#FFF",
                                    borderRadius: 50,
                                    opacity: 0.7,
                                }}
                            />
                        }
                    >
                       { viewsStepsArr }
                    </Swiper>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    // slide1: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#9DD6EB',
    // },
    // slide2: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#97CAE5',
    // },
    // slide3: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#92BBD9',
    // },
    // text: {
    //   color: '#fff',
    //   fontSize: 30,
    //   fontWeight: 'bold',
    // }
})