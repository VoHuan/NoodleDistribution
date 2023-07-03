import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Animated,
    PanResponder,
    Alert,
    PermissionsAndroid,
    Text,
    InteractionManager,
    BackHandler,
    TouchableOpacity
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Styles from '../utilies/Styles';
import Background from '../components/Background';
import UserInformation from '../components/UserInformation';
import UIHeader from '../components/UIHeader';
import UIButton from '../components/UIButton';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';
import RNQRGenerator from 'rn-qr-generator';
import * as ImagePicker from 'react-native-image-picker';
import FontSizes from '../utilies/FontSizes';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import App from '../navigation/App'

import storage from '@react-native-firebase/storage';
import firebase from '../firebase/firebase'
import firestore from '@react-native-firebase/firestore';



function Done(props) {

    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation


    return (
        <View style={styles.container}>

            <Background />
            <UIHeader title={'Done'} />
            <View style={{
                flex: 4
            }}>
                <View>
                    <Image
                        resizeMode="contain"
                        source={
                            Constants.DONE_IMG
                        }
                        style={styles.doneImage}
                    />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                    //backgroundColor:'green',
                }}>
                    <Text style={styles.centerText}>Enjoy your noodles</Text>
                    <Image
                        resizeMode="contain"
                        source={
                            Constants.HEART_ICON
                        }
                        style={styles.heartIcon}
                    />
                </View>
            </View>

            <View style={{
                flex: 1.7,
                justifyContent:'center',
                alignItems:'center',
                
            }}>
                <UIButton
                    title={'Back to home'}
                    onPress={() => {
                        goBack()
                    }}
                />
                <Text style={styles.bottomText}>Get them below</Text>
                <Image
                    resizeMode='center'
                    source={

                        Constants.ARROW_DOWN
                    }
                    style={

                        styles.arrowDownImage}
                />
            </View>
            
        </View>

    )
}
export default Done

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    doneImage: {
        marginTop: 75,
        width: 220,
        height: 220,
        alignSelf: 'center',
    },
    centerText: {
        color: Colors.titleHeader,
        fontFamily: 'PaytoneOne',
        fontSize: 22,
        marginRight: 10,
        paddingBottom: 3
    },
    bottomText: {
        color: Colors.textBottom,
        fontFamily: 'PaytoneOne',
        fontSize: 18,
        paddingTop:15,
        paddingBottom: 3,
    },
    heartIcon: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowDownImage: {
        width:35,
        height:35
    }
});