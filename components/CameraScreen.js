import React, { Component } from 'react';
import { View, Text, ToastAndroid, Image, StyleSheet } from 'react-native';
import { Camera } from "expo-camera";
import CircleButton from './CircleButton';
import * as MediaLibrary from "expo-media-library";

import cameraPNG from "./aparat.png";
import changeCameraPNG from "./changeCamera.png";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hasCameraPermissions: null,
        type: Camera.Constants.Type.back,
        previewDisplay: "none",
    };
    this.camera = React.createRef();
    this.preview = React.createRef();

    this.changeCamera = this.changeCamera.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.showPhotoPreview = this.showPhotoPreview.bind(this);
  }

  async componentDidMount(){
      let { status } = await Camera.requestCameraPermissionsAsync();
      console.log( "s:" );
      console.log( status );
      this.setState({ hasCameraPermissions: status == "granted" })
  }

  changeCamera()
  {
      this.setState({
          type: this.state.type == Camera.Constants.Type.back
            ? Camera.Constants.Type.front 
            : Camera.Constants.Type.back
      });
  }

  async takePhoto()
  {
    if (this.camera) {
        let foto = await this.camera.takePictureAsync();
        let asset = await MediaLibrary.createAssetAsync(foto.uri);
        // alert( JSON.stringify(asset, null, 4) );
        this.showToast()
        await this.showPhotoPreview( foto );
    }
  }

  showToast()
  {
    ToastAndroid.showWithGravity(
        "Zapisano zdjęcie",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
    );
  }

  async showPhotoPreview( photo )
  {
    this.setState({ previewDisplay: "flex",
                    previewURI: photo.uri });
    setTimeout( async ()=>{console.log("dadad"); await this.setState({previewDisplay: "none"}) }, 2500 );
  }

  render() {
    const { hasCameraPermissions } = this.state;
    if( hasCameraPermissions == null )
    {
        return <View />;
    }
    else if( hasCameraPermissions == false )
    {
        return <Text style={{ color: "whitesmoke", margin: 50 }}>Brak dostępu do kamery</Text>
    }
    else
    {
        return(
            <View style={{flex: 1}}>
                <Camera
                    ref={ ref => {this.camera = ref; }}
                    style={{flex: 1}}
                    type={this.state.type}>

                    <View style={{flex: 1, margin: "10%"}}>
                        <Image style={{ ...ss.previewImg, display: this.state.previewDisplay}} ref={ this.preview } source={{ uri: this.state.previewURI }} />
                    </View>
                    <View style={{ flex: 2 }}></View>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center"}}>
                        <CircleButton image={cameraPNG} size={24} onPress={ async ()=> await this.takePhoto() } />
                        <CircleButton image={changeCameraPNG} size={10} onPress={ this.changeCamera } />
                    </View>
                </Camera>
            </View>
        )
    }
  }
}


const ss = StyleSheet.create({
    previewImg: {
        // flex: 1, 
        height: "100%", 
        resizeMode: "contain",
        borderRadius: 10
    }
});


export default CameraScreen;
