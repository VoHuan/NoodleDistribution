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

import { updateNumberNoodleToFirebase } from '../features/user/userSlice'
import { fetchUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

import {getUserFromAsyncStorage} from '../AsyncStorage/User'


function Home(props) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  //navigation
  const { navigation, route } = (props)
  // functions of navigate to/back
  const { navigate, goBack } = navigation

  const [selectedNoodle1, setSelectedNoodle1] = useState(false)
  const [selectedNoodle2, setSelectedNoodle2] = useState(false)
  const [selectedNoodle3, setSelectedNoodle3] = useState(false)

  const handleUpdateNumberNoodle = async ( doc, newData ) => {
    dispatch(updateNumberNoodleToFirebase({ userId: doc, newData: newData }));
  };

  const handleFetchUser = async (doc) => {
    dispatch(fetchUser(doc));
  };

  async function handleGetYourNoodles() {
    if (user?.numberNoodle > 0) {
      let selectedNoodles = [selectedNoodle1, selectedNoodle2, selectedNoodle3];
      let selectedCount = selectedNoodles.filter((noodle) => noodle).length; // count noodles is selected
  
      if (selectedCount > 0) {
        let userId = user.document; // userId = document in firestore database
        let dataUpdate = user.numberNoodle - selectedCount; // new number noodle
        try {
          await handleUpdateNumberNoodle(userId, dataUpdate); // update number of noodle
          await handleFetchUser(userId); // reload number of noodle on Home Screen
          navigate('Done');
        } catch (error) {
          console.error('Failed to update number noodle:', error);
          Alert.alert('Failed to update number noodle. Please try again later.');
        }
        // reset select after click
        setSelectedNoodle1(false);
        setSelectedNoodle2(false);
        setSelectedNoodle3(false);
      } else {
        Alert.alert('Please select noodles before pressing');
      }
    } else {
      navigate('OutOfNoodle');
    }
  }

  useEffect(() => {   
      handleFetchUser(user.document)  
  }, []);


  return (
    <View style={styles.container}>

      <Background />
      <UIHeader title={'Information'} />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View>
          <UserInformation
            image={user?.Image}
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
            handleGetYourNoodles()
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