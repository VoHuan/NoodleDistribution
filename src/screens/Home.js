import {
  StyleSheet,
  View,
  Image,
  Alert,
  Text,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Background from '../components/Background';
import UserInformation from '../components/UserInformation';
import UIHeader from '../components/UIHeader';
import UIButton from '../components/UIButton';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';
import FontSizes from '../utilies/FontSizes';
import AsyncStorage from '@react-native-async-storage/async-storage';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';



function Home(props) {

  //navigation
  const { navigation, route } = (props)
  // functions of navigate to/back
  const { navigate, goBack } = navigation

  const [imageUrl, setImageUrl] = useState(Constants.DEFAULT_USER_IMG); // default image

  const [user, setUser] = useState({
    FullName: '',
    BirthDay: '',
    Gender: '',
    Department: '',
    numberNoodle: 0,
    Image: Constants.DEFAULT_USER_IMG,
    doc: ''
  });


  const [selectedNoodle1, setSelectedNoodle1] = useState(false)
  const [selectedNoodle2, setSelectedNoodle2] = useState(false)
  const [selectedNoodle3, setSelectedNoodle3] = useState(false)


  const updateNumberNoodleToFirebase = async (userId, newData) => {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update(newData);
      console.log('User updated successfully');
      return true
    } catch (error) {
      console.log('Failed to update user: ', error);
      return false
    }
  }

  const saveUserToAsyncStorage = async (userUpdate) => {
    try {
      const jsonValue = JSON.stringify(userUpdate);
      await AsyncStorage.setItem('user', jsonValue);
      console.log('User saved to AsyncStorage:1', userUpdate);
      return true
    } catch (e) {
      console.log('Error saving user to AsyncStorage:1', e);
      return false
    }
  };

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
  const getUser = async () => {
    const userItem = await getUserFromAsyncStorage();
    console.log('User from AsyncStorage:', userItem);
    if (userItem != null) {
      setUser(userItem);
    }
  };

  //update user to AsyncStorage
  const updateUser = async (user) => {
    const result = await saveUserToAsyncStorage(user);
    return result
  };


   //update user to firebase
   const updateUserToFirebase = async (userId, newData) => {
    const result = await updateNumberNoodleToFirebase(userId, newData);
    return result
  };

  useEffect(() => {
    getUser();
  }, []);


  //get image url from user
  const getUrl = async (imageFileName) => {
    const url = await storage().ref('images/' + imageFileName).getDownloadURL();
    console.log(url)
    setImageUrl(url)
  }

  useEffect(() => {
    getUrl(user.Image) //get image url
    updateUser(user)
    updateUserToFirebase(user.doc, { numberNoodle: user.numberNoodle })
  }, [user]);



  const handleUpdateNumberOfNoodle = async (value) => {
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
                user?.numberNoodle > 1
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
                user?.numberNoodle > 2
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
        flex: 0.9
      }}>
        <UIButton
          title={'Get your noodles'}
          onPress={() => {
            if (user.numberNoodle > 0) {
              let selectedNoodles = [selectedNoodle1, selectedNoodle2, selectedNoodle3];
              let selectedCount = selectedNoodles.filter((noodle) => noodle).length;
              
              if (selectedCount > 0) {
                handleUpdateNumberOfNoodle(user.numberNoodle - selectedCount).finally(navigate('Done'));
                setSelectedNoodle1(false);
                setSelectedNoodle2(false);
                setSelectedNoodle3(false);
              } else {
                Alert.alert('Please select noodles before pressing');
              }
            } else {
              navigate('OutOfNoodle')
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