import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
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
    return (
      <View style={styles.container}>
        <Text style={styles.question}>{this.props.item.question}</Text>
        {choices}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'stretch'
  },
  question: {
    marginBottom: 4,
    textAlign: 'center',
    fontSize: 32
  },
});
