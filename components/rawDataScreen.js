import React from "react"
import { Button, Text, View } from "react-native"

class RawDataScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color:'green' }}>
          <Text style={{color:'red'}}>Raw Data Screen!</Text>
          <Button title="Sign Out of Google" onPress={() => this.props.screenProps.signOut()} />
        </View>
      );
    }
  }

  export default RawDataScreen;
  