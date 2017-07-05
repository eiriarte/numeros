import React from 'react';
import { StyleSheet, NavigatorIOS, Text, TouchableOpacity, ScrollView } from 'react-native';
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
      <TouchableOpacity style={styles.item} onPress={this.onItemClick}>
        <Text style={styles.itemTitle}>{this.props.item.title}</Text>
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
  },
  contentContainer: {
    backgroundColor: 'lightgray'
  },
  item: {
    padding: 8,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgray'
  },
  itemTitle: {
    fontSize: 20,
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
