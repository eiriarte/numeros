import React from 'react';
import { StyleSheet, Text, WebView } from 'react-native';

export default class CheatSheetScreen extends React.Component {
  render() {
    return (
      <WebView source={this.props.source} />
    );
  }
}
