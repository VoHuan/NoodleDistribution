import {
    StyleSheet,
    Text,
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';

import { fetchUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import {saveUserToAsyncStorage} from '../AsyncStorage/User'




function QRScreen(props) {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

   
    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation

 

    const handleFetchUser = async (doc) => {
         dispatch(fetchUser(doc));
    };


    const onSuccess = async (e) => {
        if (e.data == null || e.data === undefined || e.data == '') {
            navigation.replace('Error')
        }
        else {
            console.log(e.data)
            await handleFetchUser(e.data)
        }

        if (user.status === "failed") {
            navigation.replace('Error')
        }
        
        if (user.status === "succeeded") {
            navigation.replace('Home')
        }
    };

    useEffect(() => {
        if(user.user != null && user.user != undefined ){
            saveUserToAsyncStorage(user.user);
        }
        if (user.status === "failed") {
            navigation.replace('Error')
        }
        
        if (user.status === "succeeded") {
            navigation.replace('Home')
        }
        
    }, [user]);

    return (
        <QRCodeScanner
            onRead={onSuccess}
            //flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
                <Text style={styles.centerText}>
                    Move your camera to the QR code to Scan !!!
                </Text>
            }
        />
    );
}
export default QRScreen

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 20,
        padding: 32,
        color: 'rgb(0,122,255)',
        textAlign: 'center'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});
