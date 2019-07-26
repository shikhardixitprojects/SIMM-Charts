import React from "react"
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View, Image, Button, Alert } from "react-native"
import { Google } from 'expo';
import NavBar from './components/tabNav'
import {
  LineChart
} from 'react-native-chart-kit'
const googleConfig = require('./config/google_config')

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      email: '',
      name: "",
      photoUrl: "",
      publicChartLabelData: [],
      publicChartMoneyData: []
    }
  }

  async componentDidMount() {
    const pcData = await this.getPublicChartData();
    this.setState({
      publicChartLabelData: pcData.map(pc => pc[0]),
      publicChartMoneyData: pcData.map(pc => parseFloat(pc[1].replace('$', '').replace(',', '')))
    })
  }

  getPublicChartData = async () => {
    const res = await fetch('http://ca7d405b.ngrok.io/publicChartData');
    const pcData = await res.json();
    return pcData;
  }

  isAuthorized = async (incomingEmail) => {
    const data = { email: incomingEmail }
    const res = await fetch('http://ca7d405b.ngrok.io/authData', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    );
    const isAuthorized = await res.json();
    return isAuthorized;
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: googleConfig.androidClientId,
        iosClientId: googleConfig.iosClientId,
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        const isAuthorized = await this.isAuthorized(result.user.email);
        if (isAuthorized) {
          this.setState({
            signedIn: true
          })
        }
        else {
          Alert.alert(
            'Log in Error:',
            'Reason: Not authorized to enter.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true },
          );
        }
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  signOut = async () => {
    try {
      this.setState({
        signedIn: false
      })
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    if (this.state.signedIn === true) {
      return (
        <NavBar screenProps={{ signOut: this.signOut }}></NavBar>
      )
    } else {
      return (
        <View style={styles.container}>
          {<LoginPage signIn={this.signIn} labelData={this.state.publicChartLabelData} moneyData={this.state.publicChartMoneyData}/>}
        </View>
      )
    }
  }
}

const LoginPage = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SIMM Public Portfolio</Text>
      <LineChart
        data={{
          labels: props.labelData,
          datasets: [{
            data: props.moneyData,
            strokeWidth: 2
          }]
        }}
        width={Dimensions.get('window').width}
        height={400}
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
          console.log(value)
        }}
        style={{
          borderRadius: 16,
          paddingTop: 30
        }}
      />
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text>{props.email}</Text>
      <Text style={styles.header}>Welcome {props.name}!</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <Button title="Sign Out of Google" onPress={() => props.signOut()} />
    </View>
  )
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