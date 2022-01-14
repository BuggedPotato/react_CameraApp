import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Touchable, StyleSheet, Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";


class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount()
  {
      let { status } = await MediaLibrary.requestPermissionsAsync();
      if( status !== 'granted' )
        alert( "Brak uprawnien do czytania zdjęć" );
  }


  render() {
    return (
        <TouchableOpacity onPress={ ()=> this.props.navigation.navigate("gallery") }
            style={ss.main}
        >
            <View style={{flex: 8, alignItems: "center", justifyContent: 'center',}}>
                <Text style={{ ...ss.whiteText, ...ss.title }}>Photos App</Text>
                <Text style={ss.whiteText} >show gallery pictures</Text>
                <Text style={ss.whiteText} >delete photo from device</Text>
                <Text style={ss.whiteText} >share photo</Text>
            </View>
            <Text style={{...ss.whiteText, color: "#ff9900", flex: 1}}>Dominik Pikoń 3P1</Text>
        </TouchableOpacity>
    );
  }
}


const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "gold"
    },
    whiteText: {
        color: "whitesmoke",
        fontSize: Dimensions.get("screen").height / 38,
        fontFamily: "monospace",
        textAlign: "center",
    },
    title: {
        fontSize: Dimensions.get("screen").height / 10,
        fontWeight: "bold",
    }
});


export default HomeScreen;
