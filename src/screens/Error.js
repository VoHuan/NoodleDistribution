import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    Animated,
    PanResponder,
    Text,
    InteractionManager
} from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Background from '../components/Background';
import UIHeader from '../components/UIHeader';
import Colors from '../utilies/Colors';
import Constants from '../utilies/Constants';
import FontSizes from '../utilies/FontSizes';

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/user/userSlice';


const Error = (props) => {

    //navigation
    const { navigation, route } = (props)
    // functions of navigate to/back
    const { navigate, goBack } = navigation

    const pan = useRef(new Animated.ValueXY()).current;
    
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    



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

                            dispatch(setUser()) // reset status and value of user if scan error
                            navigate('QRScreen') // navigate to QRScreen

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
        <View style={styles.container}>
            <Background />
            <UIHeader title={'Error'} />

            <View style={styles.containerMiddle}>
                <Text style={{
                    fontFamily: 'Nunito-ExtraBold',
                    fontSize: FontSizes.h3,
                    color: '#980000',
                }}>Can not recongnize your ID card.</Text>
                <View style={{
                    paddingVertical: 10
                }}>
                    <ImageBackground
                        source={Constants.BACKGROUND_TEXT}
                        resizeMode='center'
                        style={styles.backGroundText}>
                        <Text style={{
                            fontSize: FontSizes.h4,
                            color: Colors.WHITE,
                            fontFamily: 'Nunito-ExtraBold',
                        }}>Please scan again.</Text>
                    </ImageBackground>
                </View>
                <Image
                    source={
                        Constants.ERROR_CARD
                    }
                    style={
                        styles.errorCard}
                />
            </View>

            <View style={styles.containerBottom}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: '15%',
                        left: '50%',
                        transform: [{ translateX: -115 }, { translateY: -22.5 }],
                    }}>

                    <Image source={Constants.ICON_SCAN} style={styles.iconScan} />
                    <Text style={styles.bottomTitle}>
                        Follow the arrow to scan card
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent:'center',
                        alignItems:'center',
                        width: '100%',
                    }}>

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
                <Image source={Constants.ARROW_RIGHT} style={styles.doubleArrowRight} />
            </View>
        </View>
    );
};

export default Error;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerMiddle: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'green'
    },
    backGroundText: {
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: 'center'
    },
    errorCard: {
        // backgroundColor: 'yellow',
        flex: 1,
        resizeMode: 'contain',
    },
    containerBottom: {
        flex: 1.5,
        paddingHorizontal: 32,
        //marginTop: 20,
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
        marginTop: 23,
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
