import React from 'react';
import { AccessibilityInfo, Platform, StyleSheet, View, Text, TouchableOpacity,
  ProgressViewIOS, ProgressBarAndroid, findNodeHandle } from 'react-native';
import { PropTypes } from 'prop-types';
import { Constants } from 'expo';
import _ from 'lodash';
import QuizScore from './QuizScore';
import QuizQuestion from './QuizQuestion';
import BetterButton from './BetterButton';

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

  componentDidMount() {
    if (Platform.OS !== 'ios') return;
    if (this.scorePanel) {
      const reactTag = findNodeHandle(this.scorePanel);
      if (reactTag) {
        setTimeout(() => {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }, 300);
      }
    }
  }

  render() {
    const current = this.state.right + this.state.wrong;
    const total = this.props.quiz.length;
    const item = this.props.quiz[current];
    const answer = this.state.answer;
    const last = (current === total - 1);
    const isBtnDisabled = _.isUndefined(answer);
    const isChecked = this.state.checked;
    const btnTraits = ['button'];
    const accProgressText = current + ' of ' + total + ' questions answered. ' +
                    this.state.right + ' right answers.';
    let progressBar, containerStyle;
    let accBtnText = 'Check your answer';
    if (isChecked) {
      accBtnText = 'Your answer is ';
      accBtnText += (item.choices[answer] === item.answer) ? 'right' : 'wrong';
      accBtnText += last ? '. Finish quiz.' : '. Next question.';
    }
    if (isBtnDisabled) btnTraits.push('disabled');
    if (Platform.OS === 'ios') {
      containerStyle = styles.containerIOS;
      progressBar = <ProgressViewIOS style={{ width: '100%' }} progress={current/total}/>
    } else if (Platform.OS === 'android') {
      containerStyle = styles.containerAndroid;
      progressBar = <ProgressBarAndroid styleAttr='Horizontal' indeterminate={false}
        style={{ width: '100%' }} progress={current/total}/>
    }
    return (
      <View style={containerStyle}>
        <View style={styles.progress} accessible={true}
          accessibilityLabel={accProgressText} ref={(elem) => { this.scorePanel = elem; }}>
          <QuizScore label='Right' score={this.state.right} />
          <View style={styles.progressView}>
            <Text>{current} of {total}</Text>
            {progressBar}
          </View>
          <QuizScore label='Wrong' score={this.state.wrong} />
        </View>
        <View style={styles.quiz}>
          <QuizQuestion answer={answer} checked={isChecked} item={item}
            onChange={this._onChange} />
          <BetterButton title={isChecked ? (last?'Finish':'Next') : 'Check'}
            onPress={this._onCheckNext} disabled={isBtnDisabled}
            accessibilityTraits={btnTraits} accessibilityLabel={accBtnText}
            light={ Platform.OS === 'android' && !isBtnDisabled && !isChecked }
            color={ Platform.OS === 'android' ? '#3849aa' : '' }
            inverse={ Platform.OS === 'ios' && isChecked }
            bordered={ Platform.OS === 'ios' } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerIOS: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 44,
    paddingBottom: 50,
    backgroundColor: '#eef0f3'
  },
  containerAndroid: {
    flex: 1,
    backgroundColor: '#e8eaf6'
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
});
