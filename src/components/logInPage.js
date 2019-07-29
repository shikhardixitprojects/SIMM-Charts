import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { Button } from 'react-native-elements';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedValue: ' ',
      clickedDate: ' '
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.header}>SIMM Public Portfolio</Text>
        </View>
        <View style={{ flex: 8 }}>
          <LineChart
            data={{
              labels: this.props.labelData,
              datasets: [{
                data: this.props.moneyData,
                strokeWidth: 2
              }]
            }}
            width={Dimensions.get('window').width}
            height={350}
            withInnerLines={false}
            withVerticalLabels={false}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: () => '#00FFFF',
            }}
            onDataPointClick={({ value, dataset, getColor }) => {
              let dateIndex = this.props.moneyData.indexOf(value);
              this.setState({
                clickedValue: `Value: $${value}`,
                clickedDate: `Date: ${this.props.labelData[dateIndex]}`
              })
            }}
            style={{
              borderRadius: 16,
              paddingTop: 30
            }}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width }}>
          <Text style={{ fontSize: 23, fontWeight: '500' }}>{this.state.clickedDate}    {this.state.clickedValue}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Button raised={true} title="Sign In With Google" type="solid" onPress={() => { this.props.signIn() }} />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    paddingTop: 50,
    fontWeight: '600',
    textDecorationLine: 'underline',
    textShadowColor: 'blue'
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },

})

export default LoginPage;