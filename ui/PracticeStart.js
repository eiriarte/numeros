import React from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import BetterButton from './BetterButton';

export default class StartScreen extends React.Component {
  static propTypes = {
    onStart: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <BetterButton title="Start quiz" onPress={this.props.onStart}
          color={Platform.OS === 'android' ? '#3849aa' : '' }
          bordered={true} />
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
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});
