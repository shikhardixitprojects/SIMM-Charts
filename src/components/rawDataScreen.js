import React from "react"
import { ScrollView, StyleSheet, ActivityIndicator, View } from "react-native"
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import { Button } from 'react-native-elements';

class RawDataScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      tableHead: [],
      tableData: []
    }
  }

  async componentDidMount() {
    this.setState({
      loading: true
    })
    const privateRawData = await this.getPrivateChartData();
    this.setState({
      tableHead: privateRawData[0],
      tableData: privateRawData.slice(1),
      loading: false
    })
  }
  
  getPrivateChartData = async () => {
    const res = await fetch('https://enigmatic-wildwood-36923.herokuapp.com/privateRawData');
    const privateData = await res.json();
    return privateData;
  }

  render() {
    let { loading, tableHead, tableData } = this.state;
    if (loading) {
      return (
        <ActivityIndicator
          animating={this.state.loading}
          color='#000000'
          size="large"
          style={styles.activityIndicator} />
      )
    } else {
      let widthArr = [60, 350, 130, 180, 60, 150, 150, 100, 150, 60, 150, 150, 60, 150, 80, 150, 150, 150, 80, 80, 70, 60, 60, 60, 60, 120, 50, 130, 80, 150, 120, 120, 160, 180, 160, 60, 80];

      return (
        <View style={styles.container}>
          <ScrollView horizontal={true} >
            <View>
              <Table>
                <Row data={tableHead} widthArr={widthArr} style={styles.head} textStyle={styles.headText} />
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table>
                  <TableWrapper style={styles.wrapper}>
                    <Rows data={tableData} widthArr={widthArr} style={styles.row} textStyle={styles.text} />
                  </TableWrapper>
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
          <Button containerStyle={{ width: '50%' }} titleStyle={{ color: 'red' }} type="clear" raised={true} title="Sign Out" onPress={() => this.props.screenProps.signOut()} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  dataWrapper: { marginTop: -1 },
  wrapper: { flexDirection: 'row' },
  row: { height: 28 },
  headText: { textAlign: 'center', fontWeight: '600', fontSize: 15 },
  text: { textAlign: 'center' },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});

export default RawDataScreen;
