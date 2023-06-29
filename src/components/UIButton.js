import { Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Constants from '../utilies/Constants';
import FontSizes from '../utilies/FontSizes';
import Colors from '../utilies/Colors';

const UIButton = (props) => {
    const {title, onPress} = props
    return (
        <TouchableOpacity onPress={onPress} >
            <ImageBackground
                source={Constants.BUTTON_BACKGROUND}
                style={styles.buttonBackground}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default UIButton;

const styles = StyleSheet.create({ 
    buttonBackground: {
        justifyContent: 'center',
        alignItems:'center',
        alignSelf: 'center',
        width: 230,
        height: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'PaytoneOne',
        color: Colors.textButton,
        marginBottom: 7
    },
});