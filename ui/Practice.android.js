import React from 'react';
// import { View, NavigatorIOS } from 'react-native';
import { StyleSheet, ToolbarAndroid, Image, View } from 'react-native';
import { Constants } from 'expo';
import StartScreen from './PracticeStart';
import FinishScreen from './PracticeFinish';
import QuizScreen from './Quiz';
import Quiz from '../libs/quiz';

export default class NavigatorPractice extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Practice',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/android_check.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  constructor(props) {
    super(props);
    this.state = { screen: 'start' };
    this._onStart = this._onStart.bind(this);
    this._onFinish = this._onFinish.bind(this);
  }

  _onStart() {
    this.setState({ screen: 'quiz', quiz: Quiz.getNumberQuiz(1, 30, 10) });
  }

  _onFinish(result) {
    this.setState({ screen: 'finish', result: result });
  }

  render() {
    let screen = '';
    if (this.state.screen === 'start') {
      screen = <StartScreen onStart={this._onStart} />;
    } else if (this.state.screen === 'quiz') {
      screen = <QuizScreen quiz={this.state.quiz} onFinish={this._onFinish} />;
    } else if (this.state.screen === 'finish') {
      screen = <FinishScreen result={this.state.result} onStart={this._onStart}/>
    }
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          style={styles.toolbar}
          title='Practice'
          titleColor='#ffffff' />
        {screen}
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
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
    elevation: 6
  }
});
