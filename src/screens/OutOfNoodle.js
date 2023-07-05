import {
    StyleSheet,
    View,
    Image,
    Text,
} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import UIHeader from '../components/UIHeader';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';
import FontSizes from '../utilies/FontSizes';



function OutOfNoodle(props) {

    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation


    return (
        <View style={styles.container}>

            <Background />
            <UIHeader title={'Out Of Noodles'} />
            <View style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
               // backgroundColor:'green'
            }}>
                <View style={{
                   // backgroundColor:'blue'
                }}>
                    <Text style={styles.notificationText}>
                        There is <Text style={styles.zeroCup}>{'0'}</Text> cup of noodles left in the machine. Please fill in to continue.
                    </Text>
                </View>

                <View style={{
                    //flex:1
                   // backgroundColor:'red'
                }}>
                    <Image
                        resizeMode='center'
                        source={
                            Constants.OUT_OF_NOODLES
                        }
                        style={
                            styles.outOfNoodlesImage}
                    />
                </View>
            </View>

            <View style={{
                    flex:1.5
                }}>

            </View>

        </View>

    )
}
export default OutOfNoodle

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    zeroCup: {
        color:Colors.WHITE,
        fontSize: FontSizes.h3,
    },
    notificationText: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        marginHorizontal: 30,
        fontSize: FontSizes.h4,
        fontFamily: 'Nunito',
        fontWeight:'900',
        color:'#A09A9A',

    },
    outOfNoodlesImage: {
        width:210,
        height:200
    }
});