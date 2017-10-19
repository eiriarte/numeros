import React from 'react';
import { StyleSheet, View, Text, Button, ProgressViewIOS, findNodeHandle,
  AccessibilityInfo } from 'react-native';
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

  componentDidMount() {
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
    const right = this.props.result.right;
    const wrong = this.props.result.wrong;
    const total = right + wrong;
    const score = Math.floor(right*100/(right+wrong));
    const accProgressText = total + ' of ' + total + ' questions answered. ' +
                    right + ' right answers.';
    return (
      <View style={styles.container}>
        <View style={styles.progress} accessible={true}
          accessibilityLabel={accProgressText} ref={(elem) => { this.scorePanel = elem; }}>
          <QuizScore label='Right' score={right} />
          <View style={styles.progressView}>
            <Text>{total} of {total}</Text>
            <ProgressViewIOS style={{ width: '100%' }} progress={1}/>
          </View>
          <QuizScore label='Wrong' score={wrong} />
        </View>
        <View style={styles.result}>
          <View accessible={true} accessibilityLabel={ 'Your score: ' + score + '%' }>
            <Text style={styles.grade}>{score}%</Text>
          </View>
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
