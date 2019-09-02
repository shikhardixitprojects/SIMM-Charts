import React from "react"
import { StyleSheet, ActivityIndicator, Alert } from "react-native"
import { Google } from 'expo';
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

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: googleConfig.androidClientId,
        iosClientId: googleConfig.iosClientId,
        iosStandaloneAppClientId: googleConfig.iosStandaloneAppClientId,
        androidStandaloneAppClientId: googleConfig.androidStandaloneAppClientId,
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
        this.setState({
          loading: true
        })
        const isAuthorized = await this.isAuthorized(result.user.email);
        if (isAuthorized) {
          this.setState({
            signedIn: true,
            loading: false
          })
        }
        else {
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
      this.setState({
        loading: false
      })
    } catch (e) {
      console.log(e.message)
    }
  }

  signOut = async () => {
    try {
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
          <NavBar screenProps={{ signOut: this.signOut, labelData:this.state.publicChartLabelData, moneyData:this.state.publicChartMoneyData }}></NavBar>
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