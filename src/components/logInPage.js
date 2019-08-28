import React from "react";
import { Linking, Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { Button } from 'react-native-elements';

class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedValue: '',
      clickedDate: 'Click on Dot to view X/Y Value'
    }
  }

  render() {    
    return (
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Text style={styles.header}>SBU SIMM Charts</Text>
        </View>
        <View style={{ flex: 11 }}>
          <LineChart
            data={{
              labels: this.props.labelData,
              datasets: [{
                data: this.props.moneyData,
                strokeWidth: 3
              }]
            }}
            width={Dimensions.get('window').width}
            height={450}
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
              paddingTop: 20
            }}
          />
        </View>
        <View style={{ position: 'absolute', bottom: '22%', left: '2%', flex: 1, flexDirection: 'row', justifyContent: 'center', width: Dimensions.get('window').width }}>
          <Text style={{ color: 'white', fontSize: 23, fontWeight: '500' }}>{this.state.clickedDate}    {this.state.clickedValue}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Button raised={true} title="Sign In With Google" type="solid" onPress={() => { this.props.signIn() }} />
          <Text style={{color:'white'}}>(For Authentication Purposes)</Text>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text style={{ color: 'blue' }}
              onPress={() => Linking.openURL('https://docs.google.com/document/d/1j8rH0IlnFkCElLeaIaYba1zVD0uiuUNDBG_ueOFJZJw/edit?ts=5d6434b1')}>
              Contact
            </Text> */}
            <Text style={{ color: '#0185EA',  textDecorationLine:'underline'}}
              onPress={() => Linking.openURL('https://docs.google.com/document/d/1j8rH0IlnFkCElLeaIaYba1zVD0uiuUNDBG_ueOFJZJw/edit?ts=5d6434b1')}>
              Privacy Policy
            </Text>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    letterSpacing: 3,
    paddingTop: 50,
    fontWeight: '700',
    color:'white'
  }
})

export default LoginPage;