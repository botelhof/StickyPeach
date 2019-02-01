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
    Alert,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import {
    Button,
    Icon,
} from 'react-native-elements'
import FloatLabelTextInput from './FloatLabelTextField'

import * as Constants from '../utils/Constants.js'
import * as DropDownHolder from '../utils/DropDownHolder.js'
import * as stickyPeachDB from '../database/db.js'
import * as Utils from '../utils/Utils'
import * as defaultSettings from '../utils/DefaultSettings'

import { ImagePicker, Permissions, } from 'expo'

import RecipeStepsStore from  '../stores/RecipeStepsStore'
import RecipeMaterialsStore from  '../stores/RecipeMaterialsStore'
import RecipeIngredientsStore from  '../stores/RecipeIngredientsStore'

const { width, height } = Dimensions.get('window')

export default class CollectionRecipeNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "New Recipe",
            headerStyle: {
                backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
            },
            headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            description: null,
            time_preparation: null,
            time_cook: null,
            serves: null,
            vegan: false,
            steps: null,
        }

        this.updateRecipeProps = this.updateRecipeProps.bind(this)
    }

    componentDidMount() {
        defaultSettings.getDefaultImage()
        .then((dbRow) => {
            // console.log("dbRow: " + JSON.stringify(dbRow._array[0].val_blob))
            // const pic = JSON.parse(dbRow)._array[0].val_blob
            this.setState({
                isLoading: false,
                recipe_temp_id: Utils.guid(),
                defaultImage: dbRow && dbRow._array[0] ? dbRow._array[0].val_blob : null,
            })
        })

        this.props.navigation.addListener('willFocus', this.updateRecipeProps)
    }

    componentWillUnmount() {
        RecipeStepsStore.clearSteps()
        RecipeMaterialsStore.clearMaterials()
        RecipeIngredientsStore.clearIngredients()
    }

    updateRecipeProps() {
        this.setState({
            steps: RecipeStepsStore.getSteps(),
            materials: RecipeMaterialsStore.getMaterials(),
            ingredients: RecipeIngredientsStore.getIngredients(),
        })
    }

    _pickImage = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                // aspect: [4, 3],
            })
            if (!result.cancelled) {
                this.setState({ picture: result.base64 })
            }
        }
    }

    _changeRecipeItemUp = (orderNumberFrom, list) => {
        if (orderNumberFrom == 1) {
            return
        }
        
        const orderNumberTo = orderNumberFrom - 1
        if (list && list.length > 0) {

            //found the from order number and rename to "_12"
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == orderNumberFrom) {
                    list[i].orderNumber = "_" + orderNumberTo
                    break
                }
            }

            // console.log("list 1: " + JSON.stringify(list))

            //found to and rename for the previus
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == orderNumberTo) {
                    list[i].orderNumber = orderNumberFrom
                    // this.state.list[i + 1].orderNumber = orderNumberFrom
                    break
                }
            }

            //remove de "_" from to
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == "_" + orderNumberTo) {
                    list[i].orderNumber = orderNumberTo
                    // this.state.list[i + 1].orderNumber = orderNumberFrom
                    break
                }
            }

            list.sort(function(obj1, obj2) {
                // Ascending: first age less than the previous
                return obj1.orderNumber - obj2.orderNumber;
            })
        }

        return list
        // this.setState({steps})
    }

    _changeRecipeItemDown = (orderNumberFrom, list) => {
        if (list && orderNumberFrom == list.length) {
            return
        }
        
        const orderNumberTo = orderNumberFrom + 1
        if (list && list.length > 0) {

            //found the from order number and rename to "_12"
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == orderNumberFrom) {
                    list[i].orderNumber = "_" + orderNumberTo
                    break
                }
            }

            // console.log("list 1: " + JSON.stringify(list))

            //found to and rename for the previus
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == orderNumberTo) {
                    list[i].orderNumber = orderNumberFrom
                    // this.state.list[i + 1].orderNumber = orderNumberFrom
                    break
                }
            }

            //remove de "_" from to
            for (let i = 0; i < list.length; i++) {
                if (list[i].orderNumber == "_" + orderNumberTo) {
                    list[i].orderNumber = orderNumberTo
                    // this.state.list[i + 1].orderNumber = orderNumberFrom
                    break
                }
            }

            list.sort(function(obj1, obj2) {
                // Ascending: first age less than the previous
                return obj1.orderNumber - obj2.orderNumber;
            })
        }

        return list
        // this.setState({steps})
    }

    _keyExtractorRecipeStep = (item, index) => item.recipe_step_temp_id
    _keyExtractorRecipeMaterial = (item, index) => item.recipe_material_temp_id
    _keyExtractorRecipeIngredient = (item, index) => item.recipe_ingredient_temp_id

    _renderRecipeStepItem = ({item}) => (
        <View style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#eee',
        }}>
            <View style={{
                // flex: 1,
                flexDirection: 'column',
                width: 50,
            }}>
                {
                    item.orderNumber > 1
                    &&
                    <Icon
                        name="arrow-drop-up"
                        size={25}
                        color="#888"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemUp(item.orderNumber, this.state.steps)
                            this.setState({steps: sortedList,})
                        }}
                        underlayColor="#eee"
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == 1
                    &&
                    <View style={{height: 25,}}></View>
                }
                {
                    item.orderNumber < this.state.steps.length
                    &&
                    <Icon
                        name="arrow-drop-down"
                        size={25}
                        color="#888"
                        underlayColor="#eee"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemDown(item.orderNumber, this.state.steps)
                            this.setState({steps: sortedList,})
                        }}
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == this.state.steps.length
                    &&
                    <View style={{height: 25,}}></View>
                }
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
                        <Text style={{}}>{item.description}</Text>
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
                width: 50,
            }}>
                {
                    item.orderNumber > 1
                    &&
                    <Icon
                        name="arrow-drop-up"
                        size={25}
                        color="#888"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemUp(item.orderNumber, this.state.materials)
                            this.setState({materials: sortedList,})
                        }}
                        underlayColor="#eee"
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == 1
                    &&
                    <View style={{height: 25,}}></View>
                }
                {
                    item.orderNumber < this.state.materials.length
                    &&
                    <Icon
                        name="arrow-drop-down"
                        size={25}
                        color="#888"
                        underlayColor="#eee"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemDown(item.orderNumber, this.state.steps)
                            this.setState({materials: sortedList,})
                        }}
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == this.state.materials.length
                    &&
                    <View style={{height: 25,}}></View>
                }
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
                        <Text style={{}}>{item.description}</Text>
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
                width: 50,
            }}>
                {
                    item.orderNumber > 1
                    &&
                    <Icon
                        name="arrow-drop-up"
                        size={25}
                        color="#888"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemUp(item.orderNumber, this.state.ingredients)
                            this.setState({ingredients: sortedList,})
                        }}
                        underlayColor="#eee"
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == 1
                    &&
                    <View style={{height: 25,}}></View>
                }
                {
                    item.orderNumber < this.state.ingredients.length
                    &&
                    <Icon
                        name="arrow-drop-down"
                        size={25}
                        color="#888"
                        underlayColor="#eee"
                        onPress={() => {
                            let sortedList = this._changeRecipeItemDown(item.orderNumber, this.state.ingredients)
                            this.setState({ingredients: sortedList,})
                        }}
                        containerStyle={{
                            backgroundColor: "#eee",
                            height: 25,
                        }}
                    />
                }
                {
                    item.orderNumber == this.state.ingredients.length
                    &&
                    <View style={{height: 25,}}></View>
                }
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
                        <Text style={{}}>{item.description}</Text>
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
        const viewLength = width * 0.4

        return (
            <View style={{flex: 1,}}>
                <ScrollView
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <FloatLabelTextInput
                        placeholder={"Recipe name"}
                        value={this.state.name}
                        keyboardType="default"
                        maxLength={100}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                name: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Recipe description"}
                        value={this.state.description}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                description: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Preparation time"}
                        value={this.state.time_preparation}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                time_preparation: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Cook time"}
                        value={this.state.time_cook}
                        keyboardType="default"
                        maxLength={500}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                time_cook: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <FloatLabelTextInput
                        placeholder={"Serves"}
                        value={this.state.serves}
                        keyboardType="default"
                        maxLength={10}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        onChangeTextValue={(txt) => {
                            this.setState({
                                serves: txt,
                            })
                        }}
                        style={{
                            fontSize: 15,
                        }}
                    />
                    <View style={{
                        marginTop: 30,
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Button 
                            icon={{
                                name: "camera-roll",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Pick a picture"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#888",
                                padding: 5,
                            }}
                            onPress={this._pickImage}
                        />
                        <Button 
                            icon={{
                                name: "camera",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Take a picture"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#888",
                                padding: 5,
                            }}
                            onPress={this._pickImage}
                        />
                    </View>
                    {
                        this.state.picture
                        &&
                        <View style={{
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            alignSelf: "center",
                            marginTop: 15,
                            flexDirection: "column",
                        }}>
                            <Image 
                                source={{uri: `data:image/jpg;base64,${this.state.picture}`,}} 
                                style={{ 
                                    width: viewLength,
                                    height: viewLength,
                                    borderColor: Constants.COLORS.SYSTEM.PRIMARY,
                                    borderWidth: 1,
                                }} 
                            />
                            <Button 
                                icon={{
                                    name: "clear",
                                    color: "#fff",
                                    size: 18,
                                }}
                                title="Remove"
                                titleStyle={{
                                    color: "#fff",
                                    fontSize: 14,
                                }}
                                buttonStyle={{
                                    backgroundColor: "#888",
                                    padding: 5,
                                }}
                                containerStyle={{
                                    marginTop: 5,
                                    alignSelf: 'flex-end',
                                }}
                                onPress={() => {
                                    this.setState({
                                        picture: null,
                                    })
                                }}
                            />
                        </View>
                    }
                    <View style={{
                        flex: 1,
                        marginTop: 30,
                        flexDirection: 'column',
                    }}>
                        <Button 
                            icon={{
                                name: "add",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Add a new ingredient"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#3399ff",
                                padding: 5,
                            }}
                            containerStyle={{
                                marginTop: 5,
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("CollectionRecipeIngredientNew", {recipe_temp_id: this.state.recipe_temp_id})
                            }}
                        />
                        {
                            (!this.state.ingredients || this.state.ingredients.length == 0)
                            &&
                            <Text>No ingredients added yet...</Text>
                        }
                        {
                            (this.state.ingredients && this.state.ingredients.length > 0)
                            &&
                            <FlatList
                                data={this.state.ingredients}
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
                    <View style={{
                        flex: 1,
                        marginTop: 30,
                        flexDirection: 'column',
                    }}>
                        <Button 
                            icon={{
                                name: "add",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Add a new step"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#3399ff",
                                padding: 5,
                            }}
                            containerStyle={{
                                marginTop: 5,
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("CollectionRecipeStepNew", {recipe_temp_id: this.state.recipe_temp_id})
                            }}
                        />
                        {
                            (!this.state.steps || this.state.steps.length == 0)
                            &&
                            <Text>No steps added yet...</Text>
                        }
                        {
                            (this.state.steps && this.state.steps.length > 0)
                            &&
                            <FlatList
                                data={this.state.steps}
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
                    <View style={{
                        flex: 1,
                        marginTop: 30,
                        flexDirection: 'column',
                    }}>
                        <Button 
                            icon={{
                                name: "add",
                                color: "#fff",
                                size: 18,
                            }}
                            title="Add a new material"
                            titleStyle={{
                                color: "#fff",
                                fontSize: 14,
                            }}
                            buttonStyle={{
                                backgroundColor: "#3399ff",
                                padding: 5,
                            }}
                            containerStyle={{
                                marginTop: 5,
                                alignSelf: 'flex-end',
                            }}
                            onPress={() => {
                                this.props.navigation.navigate("CollectionRecipeMaterialNew", {recipe_temp_id: this.state.recipe_temp_id})
                            }}
                        />
                        {
                            (!this.state.materials || this.state.materials.length == 0)
                            &&
                            <Text>No materials added yet...</Text>
                        }
                        {
                            (this.state.materials && this.state.materials.length > 0)
                            &&
                            <FlatList
                                data={this.state.materials}
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
                </ScrollView>
                <View style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    alignContent: "flex-end",
                    marginBottom: 20,
                    paddingTop: 5,
                }}>
                    <Button 
                        icon={{
                            name: "clear",
                            color: "#333",
                            size: 14,
                        }}
                        title="Clear"
                        titleStyle={{
                            color: "#333",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#eee",
                            padding: 5,
                        }}
                        containerStyle={{
                            marginRight: 20,
                        }}
                        onPress={() => {
                            Alert.alert(
                                'Clear form',
                                'Do you want to clear all fields?',
                                [
                                    {text: 'Cancel', onPress: () => {}, style: 'cancel'},
                                    {text: 'Clear', onPress: () => {
                                        this.setState({
                                            name: "",
                                            description: "",
                                            picture: null,
                                        })
                                    }},
                                ],
                                { cancelable: false }
                            )
                        }}
                    />
                    <Button 
                        icon={{
                            name: "done",
                            color: "#fff",
                            size: 14,
                        }}
                        title="Create"
                        titleStyle={{
                            color: "#fff",
                            fontSize: 14,
                        }}
                        buttonStyle={{
                            backgroundColor: "#009900",
                            padding: 5,
                        }}
                        onPress={async () => {
                            let msg = ""

                            if (!this.state.name) {
                                msg += "Please, fill the 'Recipe name' field. "
                            }

                            if (!this.state.description) {
                                msg += "Please, fill the 'Recipe description' field. "
                            }

                            if (!this.state.time_preparation) {
                                msg += "Please, fill the 'Preparation time' field. "
                            }

                            if (!this.state.time_cook) {
                                msg += "Please, fill the 'Cook time' field. "
                            }

                            if (!this.state.serves) {
                                msg += "Please, fill the 'Serves' field. "
                            }

                            if (msg != "") {
                                DropDownHolder.getDropDown().alertWithType('error', 'Error', msg)
                            } else {
                                const recipeMetadataInsert = await stickyPeachDB.insertRecipe({
                                    name: this.state.name,
                                    description: this.state.description,
                                    picture: this.state.picture,
                                    serves: this.state.serves,
                                    time_cook: this.state.time_cook,
                                    time_preparation: this.state.time_preparation,
                                    vegan: false,
                                }, 1)

                                const recipeId = recipeMetadataInsert._array[0].lastId

                                if (this.state.steps && this.state.steps.length > 0) {
                                    this.state.steps.forEach(async function (step) {
                                        await stickyPeachDB.insertRecipeStep({
                                            orderNumber: step.orderNumber,
                                            description: step.description,
                                            picture: step.picture,
                                        }, recipeId)
                                    })
                                }

                                if (this.state.materials && this.state.materials.length > 0) {
                                    this.state.materials.forEach(async function (material) {
                                        await stickyPeachDB.insertRecipeMaterial({
                                            orderNumber: material.orderNumber,
                                            description: material.description,
                                            picture: material.picture,
                                        }, recipeId)
                                    })
                                }

                                if (this.state.ingredients && this.state.ingredients.length > 0) {
                                    this.state.ingredients.forEach(async function (ingredient) {
                                        await stickyPeachDB.insertRecipeIngredient({
                                            orderNumber: ingredient.orderNumber,
                                            description: ingredient.description,
                                            picture: ingredient.picture,
                                        }, recipeId)
                                    })
                                }

                                await stickyPeachDB.insertRecipeCollection(recipeId, this.props.navigation.state.params.collection_id)
                                RecipeStepsStore.clearSteps()
                                
                                this.props.navigation.goBack()
                                DropDownHolder.getDropDown().alertWithType('success', 'Success', 'Recipe "' + this.state.name + '" created with success')
                            }
                        }}
                    />
                </View>
            </View>
        )
    }
}