import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text, Image, TouchableOpacity,
  TouchableNativeFeedback } from 'react-native';

const CHECK = 'check';
const UNCHECK = 'uncheck';
const RIGHT = 'right';
const WRONG = 'wrong';


export default class QuizRadioButton extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf([CHECK, UNCHECK, RIGHT, WRONG]).isRequired,
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onCheck: PropTypes.func
  };

  _getImage(state) {
    if (Platform.OS === 'ios') {
      switch (state) {
        case CHECK:
          return require('../img/pr_state_check.png');
        case UNCHECK:
          return require('../img/pr_state_uncheck.png');
        case RIGHT:
          return require('../img/pr_state_right.png');
        case WRONG:
          return require('../img/pr_state_wrong.png');
      }
    } else if (Platform.OS === 'android') {
      switch (state) {
        case CHECK:
          return require('../MaterialDialog/img/android_radio_checked.png');
        case UNCHECK:
          return require('../MaterialDialog/img/android_radio_unchecked.png');
        case RIGHT:
          return require('../img/android_good.png');
        case WRONG:
          return require('../img/android_bad.png');
      }
    }
  }

  render() {
    const btnTraits = ['button'];
    let accText = this.props.children;
    let imageStyle, Touchable;
    if (this.props.state === CHECK) btnTraits.push('selected');
    if (this.props.disabled) btnTraits.push('disabled');
    if (this.props.state === RIGHT) accText = 'Right answer: ' + accText;
    if (this.props.state === WRONG) accText = 'Wrong answer: ' + accText;
    if (Platform.OS === 'ios') {
      Touchable = TouchableOpacity;
      imageStyle = {};
    } else {
      Touchable = TouchableNativeFeedback;
      imageStyle = styles['radio_' + this.props.state];
    }
    return (
      <Touchable disabled={this.props.disabled}
        onPress={() => this.props.onCheck(this.props.index)}
        accessibilityTraits={btnTraits} accessibilityLabel={accText}>
        <View style={styles.container}>
          <Image source={this._getImage(this.props.state)} style={imageStyle} />
          <Text style={styles.label}>{this.props.children}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    // borderWidth: StyleSheet.hairlineWidth,
    // backgroundColor: 'white',
    // borderColor: 'gray',
    minWidth: 180,
  },
  label: {
    margin: 4,
    paddingLeft: 4,
    fontSize: 20
  },
  state: {
    margin: 4
  },
  radio_check: {
    tintColor: '#00bfa5'
  },
  radio_uncheck: {
    tintColor: 'rgba(0, 0, 0, 0.54)'
  },
  radio_right: {
    tintColor: '#4caf50'
  },
  radio_wrong: {
    tintColor: '#f44336'
  }
});
