import React from 'react';
import { View, NavigatorIOS } from 'react-native';
import StartScreen from './PracticeStart';
import FinishScreen from './PracticeFinish';
import QuizScreen from './Quiz';
import Quiz from '../libs/quiz';

class PracticeScreen extends React.Component {
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
    if (this.state.screen === 'start') {
      return <StartScreen onStart={this._onStart} />;
    } else if (this.state.screen === 'quiz') {
      return <QuizScreen quiz={this.state.quiz} onFinish={this._onFinish} />;
    } else if (this.state.screen === 'finish') {
      return <FinishScreen result={this.state.result} onStart={this._onStart}/>
    }
  }
}

export default class NavigatorPractice extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{ component: PracticeScreen, title: 'Practice' }}
        style={{flex: 1}}
      />
    );
  }
}
