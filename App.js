import React from "react"
import { StyleSheet, ActivityIndicator, Alert } from "react-native"
import * as GoogleSignIn from 'expo-google-sign-in'
import * as Google from 'expo-google-app-auth'
import Constants from 'expo-constants';
import NavBar from './src/components/tabNav'
import googleConfig from './config/google_config'
import LoginPage from './src/components/logInPage'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      publicChartLabelData: [],
      publicChartMoneyData: [],
      loading: true
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    const pcData = await this.getPublicChartData();
    this.setState({
      publicChartLabelData: pcData.map(pc => pc[0]),
      publicChartMoneyData: pcData.map(pc => parseFloat(pc[1].replace('$', '').replace(',', ''))),
      loading: false
    })
  }

  getPublicChartData = async () => {
    const res = await fetch('https://enigmatic-wildwood-36923.herokuapp.com/publicChartData');
    const pcData = await res.json();
    return pcData;
  }

  isAuthorized = async (incomingEmail) => {
    const data = { email: incomingEmail }
    const res = await fetch('https://enigmatic-wildwood-36923.herokuapp.com/authData', {
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

  handleAuthorization = async (type, userEmail) => {
    if (type === "success") {
      this.setState({
        loading: true
      })
      const isAuthorized = await this.isAuthorized(userEmail);
      if (isAuthorized) {
        this.setState({
          signedIn: true,
          loading: false
        })
      }
      else {
        if (Constants.appOwnership === 'standalone') {
          await GoogleSignIn.signOutAsync();
        }
        this.setState({
          loading: false
        })
        Alert.alert(
          'Log in Error',
          'Not authorized to enter.',
          [
            { text: 'OK', onPress: () => { } },
          ],
          { cancelable: true },
        );
      }
    }
  }

  signIn = async () => {
    try {
      if (Constants.appOwnership === "expo") {
        const result = await Google.logInAsync({
          androidClientId: googleConfig.androidClientId,
          iosClientId: googleConfig.iosClientId,
          scopes: ["profile", "email"]
        })
        this.handleAuthorization(result.type, result.user.email);
      } else if (Constants.appOwnership === "standalone") {
        this.setState({
          loading: true
        })
        await GoogleSignIn.initAsync({
          clientId: googleConfig.iosStandaloneAppClientId
        })
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();
        this.handleAuthorization(type, user.email);
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  signOut = async () => {
    try {
      if (Constants.appOwnership === 'standalone') {
        await GoogleSignIn.signOutAsync();
      }
      Alert.alert(
        '',
        'Are you sure you want to Sign Out?',
        [
          {
            text: 'Yes', onPress: () => this.setState({
              signedIn: false,
            }),
            style: 'default'
          },
          {
            text: 'Cancel',
            onPress: () => { },
            style: 'cancel',
          },
        ],
        { cancelable: true },
      );
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          color='#000000'
          size="large"
          style={styles.activityIndicator} />
      )
    } else {
      if (this.state.signedIn === true) {
        return (
          <NavBar screenProps={{ signOut: this.signOut, labelData: this.state.publicChartLabelData, moneyData: this.state.publicChartMoneyData }}></NavBar>
        )
      } else {
        return (
          <LoginPage
            signIn={this.signIn}
            labelData={this.state.publicChartLabelData}
            moneyData={this.state.publicChartMoneyData}></LoginPage>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
})