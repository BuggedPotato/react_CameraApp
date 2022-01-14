import React, { Component } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const size = Dimensions.get("screen").width / 100 * this.props.size;
    return (
      <TouchableOpacity style={{ ...ss.button, width: size + 40, height: size + 40 }}
        onPress={ this.props.onPress } >
        <Image style={{ width: size, height: size, opacity: 0.75 }} source={ this.props.image } />
      </TouchableOpacity>
    );
  }
}

const ss = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(32, 33, 36, 0.85)',
        borderRadius: 100,
        padding: 20
    }
});

export default CircleButton;
