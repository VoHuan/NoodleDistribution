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
  BackHandler
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Styles from '../utilies/Styles';
import Background from '../components/Background';
import UIHeader from '../components/UIHeader';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';
import RNQRGenerator from 'rn-qr-generator';
import * as ImagePicker from 'react-native-image-picker';
import FontSizes from '../utilies/FontSizes';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

function Home(props) {

  //navigationyả
  const { navigation, route } = (props)
  // functions of navigate to/back
  const { navigate, goBack } = navigation

  const [user, setUser] = useState({
    FullName: '',
    BirthDay: '',
    Gender: '',
    Department: '',
    numberNoodle: 0,
    Image: ''
  });

  const getUserFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Error getting user from AsyncStorage:', e);
      return null;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const userItem = await getUserFromAsyncStorage();
      console.log('User from AsyncStorage:', userItem);
      if (userItem != null) {
        setUser(userItem);
      }
    };
    getUser();
  }, []);



  // Back to Welcome screen if user click back on phone
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    if (route.name === 'Home') {
      navigation.dispatch(StackActions.popToTop())
      return true;
    }

    return false;
  });

  useEffect(() => {
    return () => backHandler.remove();
  }, []);



  return (
    <View>
      <Text>FullName: {user.FullName}</Text>
      <Text>Birthday: {user.BirthDay}</Text>
      <Text>Gender: {user.Gender}</Text>
      <Text>Department: {user.Department}</Text>
      <Text>numberNoodle: {user.numberNoodle}</Text>
      <Text>Image: {user.Image}</Text>
    </View>

  )
}
export default Home