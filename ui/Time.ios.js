import React from 'react';
import { StyleSheet, Text, View, DatePickerIOS, NavigatorIOS } from 'react-native';
import Hora from '../libs/hora';

class TimeScreen extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this._hora = new Hora(now);
    this.state = { time: now };
    this._onTimeChange = this._onTimeChange.bind(this);
  }

  _onTimeChange(time) {
    this._hora.setTime(time);
    this.setState({ time: time });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text>{this._hora.getTime().digits}</Text>
          <Text>{this._hora.getTime().letters}</Text>
        </View>
        <View style={styles.picker}>
          <DatePickerIOS
            date={this.state.time}
            mode="time"
            onDateChange={this._onTimeChange}
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

export default class NavigatorTime extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TimeScreen,
          title: 'Time'
        }}
        style={{flex: 1}}
      />
    );
  }
}