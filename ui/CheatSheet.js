import React from 'react';
import { WebView } from 'react-native';

export default class CheatSheetScreen extends React.Component {
  render() {
    return (
      <WebView source={this.props.source} />
    );
  }
}
