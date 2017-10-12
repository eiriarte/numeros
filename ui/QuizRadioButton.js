import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

export default class QuizRadioButton extends React.Component {
  static CHECK = 'check';
  static UNCHECK = 'uncheck';
  static RIGHT = 'right';
  static WRONG = 'wrong';
  static propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.oneOf(['check', 'uncheck', 'right', 'wrong']).isRequired,
    index: PropTypes.number.isRequired,
    disabled: PropTypes.bool,
    onCheck: PropTypes.func
  };

  _getImage(state) {
    switch (state) {
      case 'check':
        return require('../img/pr_state_check.png');
      case 'uncheck':
        return require('../img/pr_state_uncheck.png');
      case 'right':
        return require('../img/pr_state_right.png');
      case 'wrong':
        return require('../img/pr_state_wrong.png');
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} disabled={this.props.disabled}
        onPress={() => this.props.onCheck(this.props.index)}>
        <Image source={this._getImage(this.props.state)} />
        <Text style={styles.label}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    borderColor: 'gray',
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
});
