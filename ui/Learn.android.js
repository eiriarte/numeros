import React from 'react';
import { StyleSheet, ToolbarAndroid, View, Text, Image, TouchableOpacity,
  ScrollView } from 'react-native';
import { Constants } from 'expo';
// import { StyleSheet, NavigatorIOS, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import CheatSheetScreen from './CheatSheet';
import cheatSheets from '../data/CheatSheets';

class ListItem extends React.Component {
  onItemClick = () => {
    const { item } = this.props;
    this.props.nav.navigate('LearnDoc', { title: item.title, source: item.source });
  };

  render() {
    return (
      <TouchableOpacity style={styles.item} onPress={this.onItemClick}
        accessibilityComponentType='button' accessibilityTraits='button'>
        <Text style={styles.itemTitle} numberOfLines={1} >{this.props.item.title}</Text>
      </TouchableOpacity>
    );
  }
}

function getItems(nav) {
  return cheatSheets.map((item, i) => (
    <ListItem nav={nav} item={item} key={i} />
  ));
}

export default class NavigatorLearn extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Learn',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/android_book.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title='Learn'
          titleColor='#ffffff' />
        <ScrollView contentContainerStyle={styles.contentContainer}
                    style={styles.scrollview}>
          {getItems(this.props.navigation)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#eef0f3'
  },
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
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
