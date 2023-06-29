import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';
import React from 'react';
import Styles from '../utilies/Styles';
import FontSizes from '../utilies/FontSizes';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';

const UserInformation = (props) => {
  const {
    fullName = '',
    birthDay = '',
    gender = '',
    department = '',
    //numberNoodle= 0,
    image = ''
  } = (props)


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        resizeMode="contain"
        source={Constants.INFOMATION_IMG}>
        <View style={{
          alignItems: 'center',
          marginHorizontal: 20
        }}>
          <Image
            style={styles.avatar}
            source={{ uri: image  }} />
        </View>
        <View style={[Styles.row]}>
          <View>
            <Text
              style={styles.infomationTitle}>
              Full Name:
            </Text>
            <Text
              style={styles.infomationTitle}>
              Birthday:
            </Text>
            <Text
              style={styles.infomationTitle}>
              Gender:
            </Text>
            <Text
              style={styles.infomationTitle}>
              Department:
            </Text>
          </View>
          <View style={{ marginStart: 15 }}>
            <Text
              style={styles.infomationText}
              numberOfLines={1}
              ellipsizeMode="tail">{fullName}</Text>
            <Text style={styles.infomationText}>{birthDay }</Text>
            <Text style={styles.infomationText}>{gender}</Text>
            <Text
              style={styles.infomationText}
              numberOfLines={1}
              ellipsizeMode="tail">{department}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default UserInformation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    height: '100%',
  },
  background: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 500,
    resizeMode: 'cover',
  },
  infomationTitle: {
    color: Colors.textInforUser,
    marginVertical: 2,
    fontWeight: "bold",
    fontSize: FontSizes.h5,
  },
  infomationText: {
    color: Colors.textInforUser,
    fontSize: FontSizes.h5,
    marginVertical: 2,
    maxWidth: 95,
  },

});
