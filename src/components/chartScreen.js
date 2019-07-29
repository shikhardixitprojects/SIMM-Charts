import React from "react"
import { Button, Text, View } from "react-native"

class ChartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedValue: ' ',
      clickedDate: ' '
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', color: 'yellow' }}>
        <Text style={{ color: 'green' }}>Chart Screen!</Text>
        <Button containerStyle={{ width: '50%' }} titleStyle={{ color: 'red' }} type="clear" raised={true} title="Sign Out" onPress={() => this.props.screenProps.signOut()} />
      </View>
    );
  }
}

export default ChartScreen;
