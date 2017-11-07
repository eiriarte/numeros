import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Image, TouchableOpacity,
  TouchableNativeFeedback, Text } from 'react-native';

const column1 = ['GRA', 'C', '0'];
const column2 = ['7', '4', '1'];
const column3 = ['8', '5', '2'];
const column4 = ['9', '6', '3'];
const column5 = ['+1', '-1', 'DEL'];

export default class TranslatorKeyboard extends React.Component {
  static propTypes = {
    onKeyPressed: PropTypes.func.isRequired,
    grammar: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this._getColumn = this._getColumn.bind(this);
  }

  _getColumn(col) {
    const backspace = Platform.OS === 'android' ?
      require('../img/android_backspace.png') :
      require('../img/backspace.png');
    return col.map((keyLabel, i) => {
      const keyStyles = [ styles.key ];
      const textStyles = [ styles.keyText ];
      if (/^\d$/.test(keyLabel)) {
        keyStyles.push(styles.digitKey);
        textStyles.push(styles.digitText);
      }
      let key = <Text style={textStyles}>{keyLabel}</Text>;
      if (keyLabel === 'C') {
        key = <Text style={textStyles} accessibilityLabel='Clear'>{keyLabel}</Text>;
      } else if (keyLabel === 'GRA') {
        key = <Text style={styles.keyText}
          accessibilityLabel={ 'Type of number: ' + this.props.grammar }>
          {this.props.grammar}</Text>;
      } else if (keyLabel === 'DEL') {
        key = <Image source={backspace} style={{ tintColor: '#555555' }}
          accessibilityLabel='Backspace' />;
      }
      const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
      return (
        <Touchable key={i} onPress={() => this.props.onKeyPressed(keyLabel)}
          accessibilityComponentType='button' accessibilityTraits='button'
          style={{flex: 1}}>
          <View style={keyStyles}>{key}</View>
        </Touchable>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.col}>
          {this._getColumn(column1)}
        </View>
        <View style={styles.col}>
          {this._getColumn(column2)}
        </View>
        <View style={styles.col}>
          {this._getColumn(column3)}
        </View>
        <View style={styles.col}>
          {this._getColumn(column4)}
        </View>
        <View style={styles.col}>
          {this._getColumn(column5)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: Platform.OS === 'ios' ? 50 : 0,
  },
  col: {
    flex: 1
  },
  key: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'gainsboro',
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  keyText: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.65)',
    fontSize: 22
  },
  digitKey: {
    backgroundColor: '#ececec'
  },
  digitText: {
    color: 'rgba(0, 0, 0, 0.87)'
  }
});
