    import React, { useState, useRef } from 'react';
    import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
    import { RNCamera } from 'react-native-camera';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import { useNavigation } from '@react-navigation/native';

    const Camera = () => {
    const cameraRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);
    const navigation = useNavigation();

    

    

    const takePicture = async () => {
        if (cameraRef.current) {
        try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data.uri); // You can save or process the captured image here
            Alert.alert("Picture Taken at :"+data.uri)
        } catch (error) {
            console.error('Error taking picture: ', error);
        }
        }
    };

    return (
        <View style={styles.container}>
        <RNCamera
            ref={cameraRef}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            captureAudio={true}
        />
        <View style={styles.controls}>
            <TouchableOpacity
            onPress={takePicture}
            
            >
            <View style={styles.captureRing}>
                
            </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
        >
            <Icon name="times" size={30} color="white" />
        </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    controls: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
    },
    capture: {
        backgroundColor: 'transparent',
        borderRadius: 50,
    },
    recording: {
        backgroundColor: '#ff0000',
    },
    captureRing: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureText: {
        fontSize: 16,
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    });

    export default Camera;
