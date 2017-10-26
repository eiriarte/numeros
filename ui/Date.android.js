import React from 'react';
// import { StyleSheet, Text, View, DatePickerIOS, NavigatorIOS } from 'react-native';
import { StyleSheet, ToolbarAndroid, Image, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Speech, Constants } from 'expo';
import Fecha from '../libs/fecha';

export default class NavigatorDate extends React.Component {
  // static propTypes = { onDateChanged: PropTypes.func.isRequired }
  static navigationOptions = {
    tabBarLabel: 'Dates',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/android_today.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  constructor(props) {
    super(props);
    const now = new Date();
    this._fecha = new Fecha(now);
    this.state = { date: now };
    this._onDateChange = this._onDateChange.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
    // this.props.onDateChanged(this._fecha.getDate().longForm);
  }

  _onActionSelected(position) {
    if (position === 0) {
      console.log('CAMBIANDO FECHA');
    } else if (position === 1) {
      console.log('FECHA SONANDO!!!!');
    }
  }

  _onDateChange(date) {
    this._fecha.setDate(date);
    // this.props.onDateChanged(this._fecha.getDate().longForm);
    this.setState({ date: date });
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar} title='Dates' titleColor='#ffffff'
          actions={[
            {
              title: 'Change date',
              icon: require('../img/android_date.png'),
              show: 'always'
            },
            {
              title: 'Play',
              icon: require('../img/android_play.png'),
              show: 'ifRoom'
            }
          ]}
          onActionSelected={this._onActionSelected} />
        <View style={styles.output}>
          <Text style={styles.digits}>{this._fecha.getDate().shortForm}</Text>
          <Text style={styles.numeral}>{this._fecha.getDate().longForm}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
  },
  output: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
