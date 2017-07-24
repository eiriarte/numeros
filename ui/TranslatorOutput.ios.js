import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text } from 'react-native';
import ColoredText from './ColoredText';

export default class TranslatorOutput extends React.Component {
  static propTypes = {
    number: PropTypes.object.isRequired,
    noun: PropTypes.bool.isRequired
  }

  render() {
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <ColoredText style={styles.digits} chunks={this.props.number.digitChunks} noun={this.props.noun}/>
        <ColoredText style={styles.numeral} chunks={this.props.number.letterChunks} noun={this.props.noun}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  digits: {
    fontSize: 18,
    margin: 8
  },
  numeral: {
    textAlign: 'center',
    fontSize: 32,
    margin: 8
  }
});
