import React from 'react';
import { StyleSheet, Text, View, DatePickerIOS, NavigatorIOS } from 'react-native';
import Fecha from '../libs/fecha';

class DateScreen extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this._fecha = new Fecha(now);
    this.state = { date: now };
    this._onDateChange = this._onDateChange.bind(this);
  }

  _onDateChange(date) {
    this._fecha.setDate(date);
    this.setState({ date: date });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text>{this._fecha.getDate().shortForm}</Text>
          <Text>{this._fecha.getDate().longForm}</Text>
        </View>
        <View style={styles.picker}>
          <DatePickerIOS
            date={this.state.date}
            mode="date"
            onDateChange={this._onDateChange}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50,
    backgroundColor: '#fff',
  },
  output: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    justifyContent: 'flex-end'
  }
});

export default class NavigatorDate extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: DateScreen,
          title: 'Dates'
        }}
        style={{flex: 1}}
      />
    );
  }
}
