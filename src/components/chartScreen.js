import React from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { Button } from 'react-native-elements';

class ChartScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clickedValue: '',
      clickedDate: 'Click on Dot to view X/Y Value'
    }
  }

  render() {

    return (
      <View style={styles.chartScreenTopLevel}>
        <View>
          <LineChart
            data={{
              labels: this.props.screenProps.labelData,
              datasets: [{
                data: this.props.screenProps.moneyData,
                strokeWidth: 3
              }]
            }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height - 140}
            withInnerLines={false}
            withVerticalLabels={false}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientTo: '#08130D',
              decimalPlaces: 2,
              color: () => '#00FFFF',
            }}
            onDataPointClick={({ value, dataset, getColor }) => {
              let dateIndex = this.props.screenProps.moneyData.indexOf(value);
              this.setState({
                clickedValue: `Value: $${value}`,
                clickedDate: `Date: ${this.props.screenProps.labelData[dateIndex]}`
              })
            }}
            style={styles.lineChart}
          />
        </View>
        <View style={styles.chooseXYLocation}>
          <Text style={styles.chooseXYText}>{this.state.clickedDate}    {this.state.clickedValue}</Text>
        </View>
        <Button containerStyle={{ width: '50%' }} titleStyle={{ color: 'red' }} type="clear" raised={true} title="Sign Out" onPress={() => this.props.screenProps.signOut()} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  lineChart: {
    paddingTop: 35
  },
  chartScreenTopLevel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  chooseXYLocation: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: '14%',
    left: '2%',
    width: Dimensions.get('window').width
  },
  chooseXYText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500'
  }

})

export default ChartScreen;
