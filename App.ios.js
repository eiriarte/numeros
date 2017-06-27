import React from 'react';
import { TabBarIOS, Text, View } from 'react-native';

// import NavigatorTranslator from './src/components/Translator';
// import NavigatorTime from './src/components/Time';
// import NavigatorLearn from './src/components/Learn';

export default class TabbedUI extends React.Component {
  state = {
    selected: 'TranslatorTab'
  };
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="Translator"
          icon={require('./img/search.png')}
          selected={this.state.selected === "TranslatorTab"}
          onPress={() => {
            this.setState({ selected: 'TranslatorTab' });
          }}>
          <View><Text>Tab 1</Text></View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Date"
          icon={require('./img/calendar.png')}
          selected={this.state.selected === "DateTab"}
          onPress={() => {
            this.setState({ selected: 'DateTab' });
          }}>
          <View><Text>Tab 2</Text></View>
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Time"
          icon={require('./img/calendar.png')}
          selected={this.state.selected === "TimeTab"}
          onPress={() => {
            this.setState({ selected: 'TimeTab' });
          }}>
          <View><Text>Tab 3</Text></View>
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
