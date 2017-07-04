import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';

export default class TranslatorOutput extends React.Component {
  static propTypes = {
    number: PropTypes.object.isRequired
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{ this.props.number.digits }</Text>
        <Text>{ this.props.number.letters }</Text>
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
