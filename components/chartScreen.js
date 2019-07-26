import React from "react"
import { Button, Text, View } from "react-native"

class ChartScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'yellow' }}>
          <Text style={{color:'green'}}>Chart Screen!</Text>
          <Button title="Sign Out of Google" onPress={() => this.props.screenProps.signOut()} />
        </View>
      );
    }
  }

  export default ChartScreen;
  