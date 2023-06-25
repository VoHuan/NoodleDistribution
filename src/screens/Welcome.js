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
    InteractionManager
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


const Welcome = (props) => {

    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation
    // const pan = useRef(new Animated.ValueXY()).current;

    // const panResponder = useRef(
    //     PanResponder.create({
    //         onMoveShouldSetPanResponder: () => true,
    //         onPanResponderGrant: () => {
    //             pan.setOffset({
    //                 x: (pan.x)._value,
    //                 y: (pan.y)._value,
    //             });
    //         },
    //         onPanResponderMove: (_, gestureState) => {
    //             const x = (pan.x)._value;
    //             if (x > 100) {
    //                 return;
    //             }

    //             const right = gestureState.dx > 0;
    //             if (right) {
    //                 pan.x.setValue(gestureState.dx);
    //             }
    //         },
    //         onPanResponderRelease: () => {
    //             const x = (pan.x)._value;
    //             if (x > 100) {
    //                 pan.x.setValue(0);
    //                 pan.y.setValue(0);
    //                 //takePicture();
    //                 alert('HomeScreen')
    //             } else {
    //                 // Didn't swipe far enough, animate back to origin
    //                 Animated.spring(pan, {
    //                     toValue: { x: 0, y: 0 },
    //                     useNativeDriver: true
    //                 }).start();
    //             }
    //             pan.flattenOffset();
    //         },
    //     }),
    // ).current;


    const pan = useRef(new Animated.ValueXY()).current;
    const cameraRef = useRef(null);

    // const [scanning, setScanning] = useState(false);

    // onSuccess = e => {
    //     Linking.openURL(e.data).catch(err =>
    //         console.error('An error occured', err)
    //     );
    // };



    

    // action swipe right to scan
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, { dx: pan.x }], { useNativeDriver: false }),
            onPanResponderRelease: (e, gestureState) => {
                if (gestureState.dx > 120) {
                    // Swiped right
                    Animated.timing(pan, {
                        toValue: { x: 500, y: gestureState.dy },
                        duration: 200,
                        useNativeDriver: true
                    }).start(() => {
                        InteractionManager.runAfterInteractions(() => {
                            navigate('QRScreen')
                            // Animate back to origin
                            Animated.timing(pan, {
                                toValue: { x: 0, y: 0 },
                                duration: 200,
                                useNativeDriver: true,
                                delay: 2000 // Wait for 500ms before animating
                            }).start()
                        });
                    });
                } else {
                    // Didn't swipe far enough, animate back to origin
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true
                    }).start();
                }
            }
        })
    ).current;

    // const memoizedOnSwipeLeft = useCallback(() => {
    //     onSwipeRight();
    // }, [onSwipeRight]);

    return (
        <View style={Styles.container}>
            <Background />
            <UIHeader title={'Welcome'} />

            <ImageBackground
                style={{
                    position: 'absolute',
                    top: '43%',
                    left: '50%',
                    transform: [{ translateX: -142.5 }, { translateY: -85 }],
                    width: 285,
                    height: 170,
                }}
                source={Constants.BORDER_VIDEO_ALTA}>
                <View style={[Styles.alignItemsCenter]}>
                    <Image source={Constants.ALTA_MEDIA_VIDEO} style={styles.altaMediaVideo} />
                </View>
            </ImageBackground>

            <View style={styles.containerBottom}>
                <View
                    style={[
                        Styles.row,
                        Styles.alignItemsCenter,
                        Styles.justifyContentCenter,
                        {
                            position: 'absolute',
                            top: '30%',
                            left: '50%',

                            transform: [{ translateX: -115 }, { translateY: -22.5 }],
                        },
                    ]}>
                    <Image source={Constants.ICON_SCAN} style={styles.iconScan} />
                    <Text style={styles.bottomTitle}>
                        Follow the arrow to scan card
                    </Text>
                </View>
                <View
                    style={[
                        Styles.alignItemsCenter,
                        Styles.justifyContentCenter,
                        {
                            width: '100%',
                        },
                    ]}>


                    <Animated.View
                        style={{
                            transform: [{ translateX: pan.x }, { translateY: pan.y }],
                            position: 'absolute',
                            width: 108,
                            height: 140,
                            marginTop: 50,
                            alignItems: 'center',
                        }}
                        {...panResponder.panHandlers}>
                        <Image source={Constants.SCAN_LOGIN} style={styles.scanLogin} />
                        
                    </Animated.View>
                </View>
                <Image source={Constants.DOUBLE_ARROW_RIGHT} style={styles.doubleArrowRight} />
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    altaMediaVideo: {
        width: 265,
        height: 150,
        resizeMode: 'center',
        borderRadius: 10,
        marginTop: 7.5,
        marginBottom: 5,
        marginLeft: 15.5,
        marginRight: 11.5,
    },
    containerBottom: {
        flex: 1,
        paddingHorizontal: 32,
        marginTop: 20,
    },
    iconScan: {
        width: 35,
        height: 35,
    },
    bottomTitle: {
        fontWeight: 'bold',
        color: Colors.titleBottom,
        marginStart: 10,
        fontSize: FontSizes.h4,
        fontFamily: 'Nonito'
    },
    scanLogin: {
        width: 108,
        height: 135,
        resizeMode: 'center',
        top: '100%',
        marginTop: 95,
        borderRadius: 17
    },
    doubleArrowRight: {
        width: 68,
        height: 40,
        position: 'absolute',
        resizeMode: 'center',
        right: 20,
        bottom: 65,
    },
});
