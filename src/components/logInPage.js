import React from "react"
import { Dimensions, StyleSheet, Text, View, Button } from "react-native"
import {
    LineChart
  } from 'react-native-chart-kit'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          clickedValue: null,
          clickedDate: null
        }
      }

    render(){
        return (
            <View style={styles.container}>
              <Text style={styles.header}>SIMM Public Portfolio</Text>
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
                withShadow={false}
                withInnerLines={false}
                withVerticalLabels={false}
                chartConfig={{
                  backgroundGradientFrom: '#1E2923',
                  backgroundGradientTo: '#08130D',
                  decimalPlaces: 2,
                  color: () => '#00FFFF',
                }}
                onDataPointClick={({value, dataset, getColor}) => {
                  let dateIndex = this.props.moneyData.indexOf(value);  
                  this.setState({
                      clickedValue: value,
                      clickedDate: this.props.labelData[dateIndex]
                  })
                }}
                style={{
                  borderRadius: 16,
                  paddingTop: 30
                }}
              />
              <View>
                <Text style={{fontSize:20}}>Date: {this.state.clickedDate}, Value: {this.state.clickedValue}</Text>
              </View>
              <Button title="Sign in with Google" onPress={() => this.props.signIn()} />
            </View>
          )
    }
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    },
    header: {
      fontSize: 30,
      paddingTop: 50
    },
    image: {
      marginTop: 15,
      width: 150,
      height: 150,
      borderColor: "rgba(0,0,0,0.2)",
      borderWidth: 3,
      borderRadius: 150
    }
  })

  export default LoginPage;