import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, Text, View, AccessibilityInfo, findNodeHandle }
  from 'react-native';
import QuizRadioButton from './QuizRadioButton';

export default class QuizQuestion extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
      choices: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    answer: PropTypes.number,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this._onCheck = this._onCheck.bind(this);
  }

  _onCheck(index) {
    this.props.onChange(index);
  }

  componentDidUpdate(prevProps) {
    if (Platform.OS !== 'ios') return;
    if (prevProps.item.question !== this.props.item.question) {
      setTimeout(() => {
        const reactTag = findNodeHandle(this);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }, 300);
    }
  }

  render() {
    const choices = this.props.item.choices.map((choice, i) => {
      let state, answer, rightAnswer;
      answer = this.props.item.choices[this.props.answer];
      if (this.props.checked) {
        rightAnswer = this.props.item.answer;
        if (answer === choice && choice !== rightAnswer) {
          state = 'wrong';
        } else {
          state = (rightAnswer === choice) ? 'right' : 'uncheck';
        }
      } else {
        state = (answer === choice) ? 'check' : 'uncheck';
      }
      return (
        <QuizRadioButton label={choice} state={state} key={i} index={i}
          disabled={this.props.checked} onCheck={this._onCheck}>
          {choice}
        </QuizRadioButton>
      );
    });
    const accText = 'Question: ' + this.props.item.question +
                    '. Select the right answer:';
    return (
      <View style={styles.container}>
        <View accessible={true} accessibilityLabel={accText}>
          <Text style={styles.question}>
            {this.props.item.question}
          </Text>
        </View>
        {choices}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
    alignItems: 'stretch',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ececec',
    borderColor: 'gray',
    borderRadius: 3,
  },
  question: {
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 32
  },
});
