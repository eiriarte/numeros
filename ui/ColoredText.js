import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class ColoredText extends React.Component {
  static propTypes = {
    chunks: PropTypes.array.isRequired,
    noun: PropTypes.bool.isRequired
  }

  _renderChunks(chunks) {
    const styles = this.props.noun ? stylesNoun : stylesAdjective;
    return chunks.map((chunk, i) => {
      if (typeof chunk === 'string') return chunk;
      if (typeof chunk.content === 'string') return (
        <Text style={styles[chunk.style]} key={i}>{chunk.content}</Text>
      );
      return (
        <Text style={styles[chunk.style]} key={i}>
          {this._renderChunks(chunk.content)}
        </Text>
      );
    });
  }

  render() {
    return (
      <Text style={this.props.style}>{this._renderChunks(this.props.chunks)}</Text>
    );
  }
}

const stylesNoun = StyleSheet.create({
  'zillion': { color: '#641b1b' },
  'thousand': { color: '#c83737' },
  'hundred': { color: '#6537c8' },
  'ten': { color: '#c87037' },
  'ten-unit': { color: '#c8378b' },
  'unit': { color: '#3771c8' },
});

const stylesAdjective = StyleSheet.create({
  'f': { color: '#ff8080' },
  'm': { color: '#80c3ff' }
});
