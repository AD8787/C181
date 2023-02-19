import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';


export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
    }


    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA)
    }

    onCameraPermission = (s) => {
        this.setState({
            hasCameraPermission: s.status == 'granted'
        })
    }

    onFacesDetected = (faces) => {
        this.setState({
            faces: faces
        })
    }

    onFacesDetectionError = (error) => {
        console.log(error)
    }

    render() {
        if (hasCameraPermission == null) {
            return <View />
        }

        if (hasCameraPermission == false) {
            return (
                <Text style={styles.container}>
                    No Access to the Camera
                </Text>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>
                        Face Filter
                    </Text>
                </View>

                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                </View>

                <View style={styles.filterContainer}>

                </View>

                <View style={styles.actionContainer}>

                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});


// ---------------------------------------------------------------------------------------------------------------
// ● mode
// (FaceDetector.Constants.Mode): Whether to detect faces in fast
// or accurate mode.

// ● detectLandmarks(FaceDetecto
// r.Constants.Landmarks):
// Whether to detect and return
// landmark positions on the face
// (ears, eyes, mouth, cheeks,
// nose). Valid values: all, none.

// ● runClassifications(FaceDetect
// or.Constants.Classifications):
// Whether to run additional
// classifications on detected faces
// (smiling probability, open eye
// probabilities). Valid values: all,
// none