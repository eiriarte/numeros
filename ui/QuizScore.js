import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

export default class QuizScore extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.score}>{this.props.score}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8
  },
  label: {
    color: 'gray',
    marginBottom: 4
  },
  score: {
    fontSize: 24,
  },
});
