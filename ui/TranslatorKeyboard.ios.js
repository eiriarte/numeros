import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const column1 = ['C', '0'];
const column2 = ['7', '4', '1'];
const column3 = ['8', '5', '2'];
const column4 = ['9', '6', '3'];
const column5 = ['FEM', '+1', '-1'];

export default class TranslatorKeyboard extends React.Component {
  static propTypes = {
    onKeyPressed: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this._getColumn = this._getColumn.bind(this);
  }

  _getColumn(col) {
    return col.map((key, i) => {
      return (
        <TouchableOpacity style={[ styles.key, (key === '0') && styles.tallKey]}
          key={i} onPress={() => this.props.onKeyPressed(key)}>
          <Text style={styles.keyText}>{key}</Text>
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
