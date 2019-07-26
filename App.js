import React from "react"
import { StyleSheet, View, Alert } from "react-native"
import { Google } from 'expo';
import NavBar from './src/components/tabNav'
import googleConfig from './config/google_config'
import LoginPage from './src/components/logInPage'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      email: '',
      name: "",
      photoUrl: "",
      publicChartLabelData: [],
      publicChartMoneyData: [],
      currentPublicChartValue: NaN
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
            'Not authorized to enter.',
            [
              { text: 'OK', onPress: () => {} },
            ],
            { cancelable: true },
          );
        }
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
          <LoginPage 
            signIn={this.signIn} 
            labelData={this.state.publicChartLabelData} 
            moneyData={this.state.publicChartMoneyData}
            currentValue={this.state.currentPublicChartValue}
          />  
        </View>
      )
    }
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