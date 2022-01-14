import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Touchable } from 'react-native';
import PropTypes from "prop-types";

import Checkmark from "./selected.png";

class FotoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isSelected: false
    };
    this.selectMe = this.selectMe.bind(this);
  }

  async selectMe()
  {
    const a = await this.props.updatePhotoSelection( this.props.id );
    this.setState({isSelected: a});
  }

  render() {
    return (
    <TouchableOpacity onPress={ ()=> this.props.showBigPhoto( this.props.id ) } onLongPress={ this.selectMe } >
        <Image 
            style={{
                ...ss.image,
                width: this.props.width * 0.95,
                height: this.props.height * 0.95,
                margin: this.props.width * 0.025,
            }}
            source={{ uri: this.props.src }}
            
        />
        <View style={{...ss.textView, right: this.props.width * 0.08, bottom: this.props.height * 0.1}}>
            <Text style={ss.text}>{ this.props.id }</Text>
        </View>
        <Image style={{ 
                ...ss.selectedOverlay,
                width: this.props.width * 0.95,
                height: this.props.height * 0.95,
                margin: this.props.width * 0.025,
                opacity: this.state.isSelected ? 0.75 : 0
            }}
                 source={Checkmark} />
    </TouchableOpacity>
    );
  }
}


FotoItem.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
}

const ss = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    image: {
        // flex: 1,
        borderRadius: 6,
    },
    textView: {
        position: 'absolute',
    },
    text: {
        fontSize: Dimensions.get("screen").height / 60,
        color: "whitesmoke",
        fontWeight: 'bold'
    },
    selectedOverlay:
    {
        position: "absolute",
        backgroundColor: 'rgba(32, 33, 36, 0.9)',
    }
  });

export default FotoItem;
