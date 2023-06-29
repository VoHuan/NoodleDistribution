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



function Home(props) {

  // //navigation
  // const { navigation, route } = (props)
  // // functions of navigate to/back
  // const { navigate, goBack } = navigation

  const [imageUrl, setImageUrl] = useState(Constants.DEFAULT_USER_IMG); // default image

  const [user, setUser] = useState({
    FullName: '',
    BirthDay: '',
    Gender: '',
    Department: '',
    numberNoodle: 0,
    Image: '',
    doc: ''
  });


  const [selectedNoodle1, setSelectedNoodle1] = useState(false)
  const [selectedNoodle2, setSelectedNoodle2] = useState(false)
  const [selectedNoodle3, setSelectedNoodle3] = useState(false)



  const getUserFromAsyncStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Error getting user from AsyncStorage:', e);
      return null;
    }
  };

  //get user from AsyncStorage
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


  //get image url from user
  const getUrl = async (imageFileName) => {
    const url = await storage().ref('images/' + imageFileName).getDownloadURL();
    console.log(url)
    setImageUrl(url)
  }

  useEffect(() => {
    getUrl(user.Image) //get image urlr
  }, [user]);



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



  const handleUpdateNumberOfNoodle = (value) => {
    setUser(prevState => ({
      ...prevState,
      numberNoodle: value
    }));
  }

  return (
    <View style={styles.container}>

      <Background />
      <UIHeader title={'Information'} />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View>
          <UserInformation
            image={imageUrl.toString()}
            fullName={user?.FullName}
            birthDay={user?.BirthDay}
            gender={user?.Gender}
            department={user?.Department}
          />
        </View>
      </View>


      <View style={{ flex: 1.2 }}>
        <View
          style={styles.groupOfNoodlesButton}>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedNoodle1(!selectedNoodle1);
            }}>
            <Image
              source={
                user?.numberNoodle > 0
                  ? Constants.NOODLE_LEFT
                  : Constants.NOODLE_UNAVAILABLE
              }
              style={styles.noodleImage}
            />

            {selectedNoodle1 && user?.numberNoodle > 0 && (
              <Image
                source={Constants.IS_SELECTED}
                style={styles.noodleIsSelected}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedNoodle2(!selectedNoodle2);
            }}>
            <Image
              source={
                user?.numberNoodle > 0
                  ? Constants.NOODLE_MIDDLE
                  : Constants.NOODLE_UNAVAILABLE
              }
              style={styles.noodleImage}
            />

            {selectedNoodle2 && user?.numberNoodle > 1 && (
              <Image
                source={Constants.IS_SELECTED}
                style={styles.noodleIsSelected}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              setSelectedNoodle3(!selectedNoodle3);
            }}>
            <Image
              source={
                user?.numberNoodle > 0
                  ? Constants.NOODLE_RIGHT
                  : Constants.NOODLE_UNAVAILABLE
              }
              style={styles.noodleImage}
            />

            {selectedNoodle3 && user?.numberNoodle > 2 && (
              <Image
                source={Constants.IS_SELECTED}
                style={styles.noodleIsSelected}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection: 'row',
          marginTop: 20,
          alignSelf: 'center',
        }}>
          <Text
            style={styles.numberOfNoodule}>
            {user?.numberNoodle}
          </Text>
          <Text
            style={styles.textBottom}>
            {' '}cups of noodles left this month
          </Text>
        </View>
      </View>


      <View style={{
        flex: 0.85
      }}>
        <UIButton
          title={'Get your noodles'}
          onPress={() => {
            if (user.numberNoodle > 0) {
              let count = 0;
              if (selectedNoodle1) {
                count++;
              }
              if (selectedNoodle2) {
                count++;
              }
              if (selectedNoodle3) {
                count++;
              }
              if (count > 0) {

                handleUpdateNumberOfNoodle(user.numberNoodle - count)
                count = 0
                console.log(user)
                Alert.alert('DoneScreen');
              } else {
                Alert.alert('Please select noodles before pressing ');
              }
            } else if (user.numberNoodle <= 0) {
              Alert.alert('OutOfNoodle');
            }

          }}
        />
      </View>
    </View>

  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  numberOfNoodule: {
    color: Colors.numberOfCup,
    fontSize: FontSizes.h4,
    fontFamily: 'PaytoneOne'
  },
  textBottom: {
    marginTop: 2.5,
    color: Colors.PINK,
    fontFamily: 'PaytoneOne',
    fontSize: FontSizes.h5
  },
  groupOfNoodlesButton: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center'
  },
  noodleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  noodleIsSelected: {
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '85%',
    zIndex: -2,
  },
});