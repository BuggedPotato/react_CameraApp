import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Screen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Screen1 </Text>
        <Button onPress={()=> this.props.navigation.navigate( "s2" ) } title="Go to screen2" />
      </View>
    );
  }
}

export default Screen1;
