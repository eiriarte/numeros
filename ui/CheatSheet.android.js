import React from 'react';
import { StyleSheet, ToolbarAndroid, WebView, View } from 'react-native';
import { Constants } from 'expo';

export default class CheatSheetScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title={params.title}
          titleColor='#ffffff'
          navIcon={require('../img/android_close.png')}
          onIconClicked={() => this.props.navigation.goBack()} />
        <WebView source={params.source} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#3849aa',
  },
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
  }
});
