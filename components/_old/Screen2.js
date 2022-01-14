import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Screen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Screen2 </Text>
        <Button onPress={()=> this.props.navigation.navigate( "s1" ) } title="Go to screen1" />
      </View>
    );
  }
}

export default Screen2;
