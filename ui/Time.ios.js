import React from 'react';
import { StyleSheet, Text, View, DatePickerIOS, NavigatorIOS } from 'react-native';
import { PropTypes } from 'prop-types';
import { Speech, Constants } from 'expo';
import Hora from '../libs/hora';

class TimeScreen extends React.Component {
  static propTypes = {
    onTimeChanged: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const now = new Date();
    this._hora = new Hora(now);
    this.state = { time: now };
    this._onTimeChange = this._onTimeChange.bind(this);
    this.props.onTimeChanged(this._hora.getTime().letters);
  }

  _onTimeChange(time) {
    this._hora.setTime(time);
    this.props.onTimeChanged(this._hora.getTime().letters);
    this.setState({ time: time });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={styles.digits}>{this._hora.getTime().digits}</Text>
          <Text style={styles.numeral}>{this._hora.getTime().letters}</Text>
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
    paddingTop: Constants.statusBarHeight + 44,
    paddingBottom: 50,
  },
  output: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  picker: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: '#ececec',
  },
  digits: {
    fontSize: 18,
    margin: 8,
    color: '#3771c8'
  },
  numeral: {
    textAlign: 'center',
    fontSize: 32,
    margin: 8,
    color: '#3771c8'
  }
});

export default class NavigatorTime extends React.Component {
  constructor(props) {
    super(props);
    this._onTimeChanged = this._onTimeChanged.bind(this);
  }

  _onTimeChanged(time) {
    this._time = time;
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TimeScreen,
          title: 'Time',
          passProps: { onTimeChanged: this._onTimeChanged },
          rightButtonSystemIcon: 'play',
          onRightButtonPress: async () => {
            if (await Speech.isSpeakingAsync()) {
              Speech.stop();
            } else {
              Speech.speak(this._time, { language: 'es' });
            }
          }
        }}
        style={{flex: 1}}
      />
    );
  }
}
