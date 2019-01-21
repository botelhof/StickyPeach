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
} from 'react-native'

import FloatLabelTextInput from './FloatingLabel'

import * as Constants from '../utils/Constants.js'

export default class CollectionNewScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: "New Collection",
          headerStyle: {
            backgroundColor: Constants.COLORS.SYSTEM.PRIMARY,
          },
          headerTintColor: Constants.COLORS.SYSTEM.SECONDARY,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }
      }

    constructor() {
        super()
        this.state = {
            name: null,
        }
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <ScrollView
                    style={{
                        padding: 10,
                    }}
                >
                    <FloatLabelTextInput
                        placeholder={"Collection name"}
                        value={this.state.name}
                        keyboardType="default"
                        noBorder
                        maxLength={100}
                        selectionColor={Constants.COLORS.SYSTEM.PRIMARY}
                        onFocus={() => {

                        }}
                        onBlur={() => {
                            
                        }}
                        style={{
                            fontSize: 12,
                        }}
                    />
                </ScrollView>
            </View>
        )
    }
}