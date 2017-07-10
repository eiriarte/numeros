import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class StartScreen extends React.Component {
  static propTypes = {
    onStart: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Ready, set, go!</Text>
        <Button title="Start quiz" onPress={this.props.onStart}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
