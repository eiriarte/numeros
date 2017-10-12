import React from 'react';
import { StyleSheet, Text, View, DatePickerIOS, NavigatorIOS } from 'react-native';
import { PropTypes } from 'prop-types';
import { Speech } from 'expo';
import Fecha from '../libs/fecha';

class DateScreen extends React.Component {
  static propTypes = {
    onDateChanged: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    const now = new Date();
    this._fecha = new Fecha(now);
    this.state = { date: now };
    this._onDateChange = this._onDateChange.bind(this);
    this.props.onDateChanged(this._fecha.getDate().longForm);
  }

  _onDateChange(date) {
    this._fecha.setDate(date);
    this.props.onDateChanged(this._fecha.getDate().longForm);
    this.setState({ date: date });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={styles.digits}>{this._fecha.getDate().shortForm}</Text>
          <Text style={styles.numeral}>{this._fecha.getDate().longForm}</Text>
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

export default class NavigatorDate extends React.Component {
  constructor(props) {
    super(props);
    this._onDateChanged = this._onDateChanged.bind(this);
  }

  _onDateChanged(date) {
    this._date = date;
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: DateScreen,
          title: 'Dates',
          passProps: { onDateChanged: this._onDateChanged },
          rightButtonIcon: require('../img/sound.png'),
          onRightButtonPress: async () => {
            if (await Speech.isSpeakingAsync()) {
              Speech.stop();
            } else {
              Speech.speak(this._date, { language: 'es' });
            }
          }
        }}
        style={{flex: 1}}
      />
    );
  }
}
