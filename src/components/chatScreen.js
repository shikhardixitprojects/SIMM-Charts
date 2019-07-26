import React from "react"
import { Button, Text, View } from "react-native"

class ChatScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color:'blue'}}>Chat Screen!</Text>
          <Button title="Sign Out of Google" onPress={() => this.props.screenProps.signOut()} />
        </View>
      );
    }
  }

  export default ChatScreen;
  