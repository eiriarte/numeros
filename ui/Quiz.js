import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ProgressViewIOS }
  from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import QuizScore from './QuizScore';
import QuizQuestion from './QuizQuestion';

export default class QuizScreen extends React.Component {
  static propTypes = {
    quiz: PropTypes.arrayOf(PropTypes.object).isRequired,
    onFinish: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      right: 0,
      wrong: 0,
      answer: undefined,
      checked: false
    };
    this._onChange = this._onChange.bind(this);
    this._onCheckNext = this._onCheckNext.bind(this);
  }

  _onChange(answer) {
    this.setState({ answer: answer });
  }

  _onCheckNext() {
    if (this.state.checked) {
      this.setState((prevState, props) => {
        let right = prevState.right;
        let wrong = prevState.wrong;
        const item = this.props.quiz[right + wrong];
        const answer = item.choices[prevState.answer];
        if (answer === item.answer) {
          right++;
        } else {
          wrong++;
        }
        if (right + wrong < this.props.quiz.length) {
          return {
            right: right,
            wrong: wrong,
            answer: undefined,
            checked: false
          };
        } else {
          this.props.onFinish({ right: right, wrong: wrong });
        }
      });
    } else {
      this.setState({ checked: true });
    }
  }

  render() {
    const current = this.state.right + this.state.wrong;
    const total = this.props.quiz.length;
    const item = this.props.quiz[current];
    const last = (current === total - 1);
    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <QuizScore label='Right' score={this.state.right} />
          <View style={styles.progressView}>
            <Text>{current} of {total}</Text>
            <ProgressViewIOS style={{ width: '100%' }} progress={current/total}/>
          </View>
          <QuizScore label='Wrong' score={this.state.wrong} />
        </View>
        <View style={styles.quiz}>
          <QuizQuestion answer={this.state.answer}
            checked={this.state.checked} item={item} onChange={this._onChange}/>
          <TouchableOpacity disabled={_.isUndefined(this.state.answer)}
            onPress={this._onCheckNext}>
            <Text style={styles.button}>
              {this.state.checked ? (last?'Finish':'Next') : 'Check'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50,
  },
  progress: {
    flexDirection: 'row'
  },
  progressView: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  quiz: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    fontSize: 18,
    padding: 8
  }
});
