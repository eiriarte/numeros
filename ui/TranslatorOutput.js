import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet, ScrollView, Text } from 'react-native';
import { Constants } from 'expo';
import ColoredText from './ColoredText';

export default class TranslatorOutput extends React.Component {
  static propTypes = {
    number: PropTypes.object.isRequired,
    noun: PropTypes.bool.isRequired
  }

  render() {
    const stylesNumeral = [ styles.numeral ];
    if (this.props.number.letters.length > 100) {
      stylesNumeral.push(styles.s);
    } else if (this.props.number.letters.length > 40) {
      stylesNumeral.push(styles.m);
    } else {
      stylesNumeral.push(styles.l);
    }
    return (
      <ScrollView style={styles.scroll}>
        <ColoredText style={styles.digits} chunks={this.props.number.digitChunks}
          noun={this.props.noun} accessibilityLiveRegion='assertive'
          accessibilityTraits='frequentUpdates' />
        <ColoredText style={stylesNumeral} chunks={this.props.number.letterChunks}
          noun={this.props.noun}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    flex: 1,
  },
  digits: {
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
    marginTop: 32
  },
  numeral: {
    textAlign: 'center',
    margin: 8
  },
  l: { fontSize: 32 },
  m: { fontSize: 24 },
  s: { fontSize: 18 }
});
