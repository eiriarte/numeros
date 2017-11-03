import React from 'react';
import { StyleSheet, ToolbarAndroid, View, Text, Image, TouchableNativeFeedback,
  ScrollView } from 'react-native';
import { Constants } from 'expo';
import CheatSheetScreen from './CheatSheet';
import cheatSheets from '../data/CheatSheets';

class ListItem extends React.Component {
  onItemClick = () => {
    const { item } = this.props;
    this.props.nav.navigate('LearnDoc', { title: item.title, source: item.source });
  };

  render() {
    return (
      <TouchableNativeFeedback onPress={this.onItemClick}
        accessibilityComponentType='button' accessibilityTraits='button'>
        <View style={styles.item}>
          <Image
            source={require('../img/android_doc.png')}
            style={styles.listIcon}/>
          <Text style={styles.itemTitle} numberOfLines={1} >
            {this.props.item.title}
          </Text>
        </View>
      </TouchableNativeFeedback>
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
    backgroundColor: '#3849aa'
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 8
  },
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
    elevation: 6
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white',
  },
  listIcon: {
    tintColor: 'rgba(0, 0, 0, 0.54)',
    marginRight: 32
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
  }
});
