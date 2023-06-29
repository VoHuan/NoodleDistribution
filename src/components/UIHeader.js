import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Constants from '../utilies/Constants';
import FontSizes from '../utilies/FontSizes';
import Colors from '../utilies/Colors';

const UIHeader = (props) => {
  const title = props
  return (
    <View style={styles.container}>
      <Image source={Constants.LOGO_ALTA_MEDIA} style={styles.logo} />
      <Text style={styles.textTitle}>{props.title}</Text>
    </View>
  )
}

export default UIHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
   
  },
  logo: {
    width: 85,
    height: 69,
    resizeMode: 'stretch',
    marginBottom: 30,
    marginTop: 10,
  },
  textTitle: {
    fontFamily: 'SVN',
    color: Colors.titleHeader,
    width: 270,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: FontSizes.h1,
    textAlign: 'center',
    
  }
});
