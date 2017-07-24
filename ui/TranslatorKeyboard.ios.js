import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

const column1 = ['GRA', '0'];
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
    return col.map((keyLabel, i) => {
      let key = <Text style={styles.keyText}>{keyLabel}</Text>;
      if (keyLabel === 'GRA') {
        key = <Text style={styles.keyText}>{this.props.grammar}</Text>;
      } else if (keyLabel === 'DEL') {
        key= <Image source={require('../img/backspace.png')} />;
      }
      return (
        <TouchableOpacity style={[ styles.key, (keyLabel === '0') && styles.tallKey]}
          key={i} onPress={() => this.props.onKeyPressed(keyLabel)}>
          {key}
        </TouchableOpacity>
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
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  col: {
    flex: 1
  },
  key: {
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  tallKey: {
    flex: 2
  },
  keyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});
