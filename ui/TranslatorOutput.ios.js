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
        <ColoredText chunks={this.props.number.digitChunks} noun={this.props.noun}/>
        <ColoredText chunks={this.props.number.letterChunks} noun={this.props.noun}/>
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
});
