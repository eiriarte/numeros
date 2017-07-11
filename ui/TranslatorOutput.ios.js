import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import ColoredText from './ColoredText';

export default class TranslatorOutput extends React.Component {
  static propTypes = {
    number: PropTypes.object.isRequired,
    noun: PropTypes.bool.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <ColoredText style={styles.digits} chunks={this.props.number.digitChunks} noun={this.props.noun}/>
        <ColoredText style={styles.numeral} chunks={this.props.number.letterChunks} noun={this.props.noun}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digits: {
    fontSize: 18,
    margin: 8
  },
  numeral: {
    fontSize: 32,
    margin: 8
  }
});
