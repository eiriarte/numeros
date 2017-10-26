import React from 'react';
import { StyleSheet, View, Text, Button, ProgressViewIOS, ProgressBarAndroid,
  findNodeHandle, Platform, AccessibilityInfo } from 'react-native';
import { Constants } from 'expo';
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
    const right = this.props.result.right;
    const wrong = this.props.result.wrong;
    const total = right + wrong;
    const score = Math.floor(right*100/(right+wrong));
    const accProgressText = total + ' of ' + total + ' questions answered. ' +
                    right + ' right answers.';
    let containerStyle, progressBar;
    if (Platform.OS === 'ios') {
      containerStyle = styles.containerIOS;
      progressBar = <ProgressViewIOS style={{ width: '100%' }} progress={1}/>
    } else if (Platform.OS === 'android') {
      containerStyle = styles.containerAndroid;
      progressBar = <ProgressBarAndroid styleAttr='Horizontal' indeterminate={false}
        style={{ width: '100%' }} progress={1}/>
    }
    return (
      <View style={containerStyle}>
        <View style={styles.progress} accessible={true}
          accessibilityLabel={accProgressText} ref={(elem) => { this.scorePanel = elem; }}>
          <QuizScore label='Right' score={right} />
          <View style={styles.progressView}>
            <Text>{total} of {total}</Text>
            {progressBar}
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
  containerIOS: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 44,
    paddingBottom: 50,
  },
  containerAndroid: {
    flex: 1,
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
