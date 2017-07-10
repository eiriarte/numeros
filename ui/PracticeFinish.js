import React from 'react';
import { StyleSheet, View, Text, Button, ProgressViewIOS } from 'react-native';
import PropTypes from 'prop-types';
import QuizScore from './QuizScore';

export default class FinishScreen extends React.Component {
  static propTypes = {
    result: PropTypes.shape({
      wrong: PropTypes.number,
      right: PropTypes.number
    }).isRequired,
    onStart: PropTypes.func.isRequired
  };

  render() {
    const right = this.props.result.right;
    const wrong = this.props.result.wrong;
    const total = right + wrong;
    return (
      <View style={styles.container}>
        <View style={styles.progress}>
          <QuizScore label='Right' score={right} />
          <View style={styles.progressView}>
            <Text>{total} of {total}</Text>
            <ProgressViewIOS style={{ width: '100%' }} progress={1}/>
          </View>
          <QuizScore label='Wrong' score={wrong} />
        </View>
        <View style={styles.result}>
          <Text style={styles.grade}>{Math.floor(right*100/(right+wrong))}%</Text>
          <Button title="Take another quiz" onPress={this.props.onStart}/>
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
  result: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  grade: {
    fontSize: 32
  }
});
