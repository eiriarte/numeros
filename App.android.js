import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
// import { Asset } from 'expo';

import NavigatorTranslator from './ui/Translator';
import NavigatorDate from './ui/Date';
import NavigatorTime from './ui/Time';
import NavigatorLearn from './ui/Learn';
import CheatSheetScreen from './ui/CheatSheet';
import NavigatorPractice from './ui/Practice';

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
  animationEnabled: false
});

export default StackNavigator({
  Home: { screen: MainTabNavigator },
  LearnDoc: { screen: CheatSheetScreen }
}, {
  headerMode: 'none'
})

// export default class TabbedUI extends React.Component {
//   state = {
//     selected: 'TranslatorTab'
//   };
//
//   componentWillMount() {
//     // Asset.loadAsync([ require('./img/backspace.png'), require('./img/pr_state_check.png'), ]);
//   }
//
//   render() {
//     return (
//       <TabBarIOS>
//         <TabBarIOS.Item title="Numbers"
//           icon={require('./img/keypad.png')}
//           selected={this.state.selected === "TranslatorTab"}
//           onPress={() => {
//             this.setState({ selected: 'TranslatorTab' });
//           }}>
//           <NavigatorTranslator />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item title="Dates"
//           icon={require('./img/calendar.png')}
//           selected={this.state.selected === "DateTab"}
//           onPress={() => {
//             this.setState({ selected: 'DateTab' });
//           }}>
//           <NavigatorDate />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item title="Time"
//           icon={require('./img/clock.png')}
//           selected={this.state.selected === "TimeTab"}
//           onPress={() => {
//             this.setState({ selected: 'TimeTab' });
//           }}>
//           <NavigatorTime />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item title="Learn"
//           icon={require('./img/book.png')}
//           selected={this.state.selected === "LearnTab"}
//           onPress={() => {
//             this.setState({ selected: 'LearnTab' });
//           }}>
//           <NavigatorLearn />
//         </TabBarIOS.Item>
//         <TabBarIOS.Item title="Practice"
//           icon={require('./img/check.png')}
//           selected={this.state.selected === "PracticeTab"}
//           onPress={() => {
//             this.setState({ selected: 'PracticeTab' });
//           }}>
//           <NavigatorPractice />
//         </TabBarIOS.Item>
//       </TabBarIOS>
//     );
//   }
// }
