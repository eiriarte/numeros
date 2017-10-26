import React from 'react';
import { StyleSheet, NavigatorIOS, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import CheatSheetScreen from './CheatSheet';
import cheatSheets from '../data/CheatSheets';

class ListItem extends React.Component {
  onItemClick = () => {
    this.props.nav.push({
      component: CheatSheetScreen,
      title: this.props.item.title,
      passProps: { source: this.props.item.source }
    });
  };

  render() {
    return (
      <TouchableOpacity style={styles.item} onPress={this.onItemClick}
        accessibilityComponentType='button' accessibilityTraits='button'>
        <Text style={styles.itemTitle} numberOfLines={1} >{this.props.item.title}</Text>
        <Image source={require('../img/chevron.png')} />
      </TouchableOpacity>
    );
  }
}

function getItems(nav) {
  return cheatSheets.map((item, i) => (
    <ListItem nav={nav} item={item} key={i} />
  ));
}

class LearnScreen extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}
                  style={styles.container}>
        {getItems(this.props.navigator)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f3'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray'
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
  }
});

export default class NavigatorLearn extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute = {{ component: LearnScreen, title: 'Learn' }}
        style={{ flex: 1 }}
      />
    );
  }
}
