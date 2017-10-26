import React from 'react';
import { StyleSheet, ToolbarAndroid, Image, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Speech, Constants } from 'expo';
import Hora from '../libs/hora';

export default class TimeScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Time',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/android_watch.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  constructor(props) {
    super(props);
    const now = new Date();
    this._hora = new Hora(now);
    this.state = { time: now };
    this._onTimeChange = this._onTimeChange.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected(position) {
    if (position === 0) {
      console.log('CAMBIANDO HORA');
    } else if (position === 1) {
      this.playAudio();
    }
  }

  _onTimeChange(time) {
    this._hora.setTime(time);
    this.setState({ time: time });
  }

  async playAudio() {
    if (await Speech.isSpeakingAsync()) {
      Speech.stop();
    } else {
      Speech.speak(this._hora.getTime().letters, { language: 'es' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar} title='Time' titleColor='#ffffff'
          actions={[
            {
              title: 'Change time',
              icon: require('../img/android_time.png'),
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
          <Text style={styles.digits}>{this._hora.getTime().digits}</Text>
          <Text style={styles.numeral}>{this._hora.getTime().letters}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
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
    justifyContent: 'center'
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
