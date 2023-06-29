import {
    StyleSheet,
    StatusBar,
    View,
    Image,
    ImageBackground,
    Animated,
    PanResponder,
    Alert,
    PermissionsAndroid,
    Text,
    InteractionManager,
    TouchableOpacity,
    Linking
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeScanner from 'react-native-qrcode-scanner';
import firebase from '../firebase/firebase'
import firestore from '@react-native-firebase/firestore';



function QRScreen(props) {
    const [user, setUser] = useState({
        FullName: '',
        BirthDay: '',
        Gender: '',
        Department: '',
        numberNoodle: 0,
        Image: '',
        doc:''       //document
      });

    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation

    const fetchUser = async (message) => {
        try {
            const userDocument = await firestore()
                .collection('users')
                .doc(message)
                .get();

            const data = userDocument.exists ? userDocument.data() : null;
            return data;
        } catch (error) {
            console.log(error);
            return null; 
        }
    }


    const onSuccess = async (e) => {
        if (e.data == null || e.data === undefined || e.data == '') {
            console.log('Cannot detect QR code in image')
        }

        const userItem = await fetchUser(e.data); 

        let userDetail = {
            FullName: userItem.FullName,
            BirthDay: userItem.BirthDay,
            Gender: userItem.Gender,
            Department: userItem.Department,
            numberNoodle: userItem.numberNoodle,
            Image: userItem.Image,
            doc: e.data,
        }
        console.log(userDetail)
        if (userDetail.FullName != '') {
            setUser(userDetail)
            saveUserToAsyncStorage(userDetail);
            navigate('Home')
        }
    };

   
    const saveUserToAsyncStorage = async (user) => {
        try {
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('user', jsonValue);
            console.log('User saved to AsyncStorage:', user);
        } catch (e) {
            console.log('Error saving user to AsyncStorage:', e);
        }
    };
    // useEffect(() => {
         
    //     if ( user.FullName != ''){
    //         console.log(user)
    //         navigate('Home')
    //     }
        
    // }, [user]);

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
