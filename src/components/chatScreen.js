import React from "react"
import { ScrollView, Stylesheet, ActivityIndicator, Button, Text, View } from "react-native"

class ChatScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    let loading = this.state.loading;
    if (loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          color='#000000'
          size="large"
          style={styles.activityIndicator} />
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'blue' }}>Chat Screen!</Text>
          <Button containerStyle={{ width: '50%' }} titleStyle={{ color: 'red' }} type="clear" raised={true} title="Sign Out" onPress={() => this.props.screenProps.signOut()} />
        </View>
      );
    }
  }
}

export default ChatScreen;
