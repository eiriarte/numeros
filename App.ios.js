import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';

import NavigatorTranslator from './ui/Translator';
import NavigatorDate from './ui/Date';
import NavigatorTime from './ui/Time';
// import NavigatorLearn from './src/components/Learn';

export default class TabbedUI extends React.Component {
  state = {
    selected: 'TranslatorTab'
  };
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="Numbers"
          icon={require('./img/search.png')}
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
          icon={require('./img/calendar.png')}
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
          <View><Text>Tab 4</Text></View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Practice"
          icon={require('./img/book.png')}
          selected={this.state.selected === "PracticeTab"}
          onPress={() => {
            this.setState({ selected: 'PracticeTab' });
          }}>
          <View><Text>Tab 5</Text></View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
