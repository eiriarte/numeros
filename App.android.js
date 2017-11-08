import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import { Asset, AppLoading } from 'expo';

import NavigatorTranslator from './ui/Translator';
import NavigatorDate from './ui/Date';
import NavigatorTime from './ui/Time';
import NavigatorLearn from './ui/Learn';
import CheatSheetScreen from './ui/CheatSheet';
import NavigatorPractice from './ui/Practice';

export default class App extends React.Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._preloadAssets}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (<MainNavigator />);
  }

  async _preloadAssets() {
    await Asset.loadAsync([
      require('./img/android_backspace.png'),
      require('./img/android_close.png'),
      require('./img/android_date.png'),
      require('./img/android_play.png'),
      require('./img/android_time.png'),
      require('./img/android_doc.png'),
      require('./img/android_good.png'),
      require('./img/android_bad.png'),
      require('./data/cardinals-0-30.html'),
      require('./data/cardinals-31-100.html'),
      require('./data/uses-dates.html'),
      require('./data/uses-time.html')
    ]);
  }
}

const MainTabNavigator = TabNavigator({
  Numbers: { screen: NavigatorTranslator },
  Dates: { screen: NavigatorDate },
  Time: { screen: NavigatorTime },
  Learn: { screen: NavigatorLearn },
  Practice: { screen: NavigatorPractice },
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#3949ab',
    inactiveTintColor: 'rgba(0, 0, 0, 0.54)',
    style: {
      backgroundColor: 'white',
      borderTopWidth: 0,
      elevation: 16,
      height: 56
    },
  }
});

const MainNavigator = StackNavigator({
  Home: { screen: MainTabNavigator },
  LearnDoc: { screen: CheatSheetScreen }
}, {
  headerMode: 'none'
});
