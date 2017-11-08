import React from 'react';
import { StatusBar, TabBarIOS } from 'react-native';
import { AppLoading, Asset } from 'expo';

import NavigatorTranslator from './ui/Translator';
import NavigatorDate from './ui/Date';
import NavigatorTime from './ui/Time';
import NavigatorLearn from './ui/Learn';
import NavigatorPractice from './ui/Practice';

export default class TabbedUI extends React.Component {
  state = {
    selected: 'TranslatorTab',
    isReady: false
  };

  async _preloadAssets() {
    await Asset.loadAsync([
      require('./img/backspace.png'),
      require('./img/pr_state_check.png'),
      require('./img/pr_state_right.png'),
      require('./img/pr_state_uncheck.png'),
      require('./img/pr_state_wrong.png'),
      require('./img/chevron.png'),
      require('./data/cardinals-0-30.html'),
      require('./data/cardinals-31-100.html'),
      require('./data/uses-dates.html'),
      require('./data/uses-time.html')
    ]);
  }
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

    StatusBar.setBarStyle('dark-content');

    return (
      <TabBarIOS>
        <TabBarIOS.Item title="Numbers"
          icon={require('./img/keypad.png')}
          selected={this.state.selected === "TranslatorTab"}
          onPress={() => {
            this.setState({ selected: 'TranslatorTab' });
          }}>
          <NavigatorTranslator />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Dates"
          icon={require('./img/calendar.png')}
          selected={this.state.selected === "DateTab"}
          onPress={() => {
            this.setState({ selected: 'DateTab' });
          }}>
          <NavigatorDate />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Time"
          icon={require('./img/clock.png')}
          selected={this.state.selected === "TimeTab"}
          onPress={() => {
            this.setState({ selected: 'TimeTab' });
          }}>
          <NavigatorTime />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Learn"
          icon={require('./img/book.png')}
          selected={this.state.selected === "LearnTab"}
          onPress={() => {
            this.setState({ selected: 'LearnTab' });
          }}>
          <NavigatorLearn />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Practice"
          icon={require('./img/check.png')}
          selected={this.state.selected === "PracticeTab"}
          onPress={() => {
            this.setState({ selected: 'PracticeTab' });
          }}>
          <NavigatorPractice />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
