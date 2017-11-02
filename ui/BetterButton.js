'use strict';

import React from 'react';
import { Platform, StyleSheet, View, TouchableOpacity, TouchableNativeFeedback,
          Text, Button } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Based on https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js).
 */

class BetterButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    accessibilityLabel: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    light: PropTypes.bool,
    bordered: PropTypes.bool,
    inverse: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    hasTVPreferredFocus: PropTypes.bool,
    buttonStyle: PropTypes.object,
    textStyle: PropTypes.object
  };

  render() {
    const {
      accessibilityLabel,
      color,
      onPress,
      title,
      hasTVPreferredFocus,
      buttonStyle,
      textStyle,
      light,
      bordered,
      inverse,
      disabled,
    } = this.props;
    const buttonStyles = [styles.button, buttonStyle];
    const textStyles = [styles.text, textStyle];
    let formattedTitle = Platform.OS === 'android' ? title.toUpperCase() : title;
    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({color: color});
      } else {
        buttonStyles.push({backgroundColor: color});
      }
    }
    const accessibilityTraits = ['button'];
    if (light) {
      buttonStyles.push(styles.buttonLight);
      textStyles.push(styles.textLight);
    }
    if (Platform.OS === 'ios') {
      if (bordered) {
        buttonStyles.push(styles.buttonBordered);
        textStyles.push(styles.textBordered);
        formattedTitle = formattedTitle.toLowerCase();
      }
      if (inverse) {
        buttonStyles.push(styles.buttonInverse);
        textStyles.push(styles.textInverse);
      }
    }
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityTraits.push('disabled');
    }
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        background={TouchableNativeFeedback.Ripple &&
          TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.26)', false)}
        accessibilityComponentType='button'
        accessibilityLabel={accessibilityLabel}
        accessibilityTraits={accessibilityTraits}
        hasTVPreferredFocus={hasTVPreferredFocus}
        disabled={disabled}
        onPress={onPress}>
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>{formattedTitle}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {},
    android: {
      elevation: 2,
      // Material design blue from https://material.google.com/style/color.html#color-color-palette
      backgroundColor: '#2196F3',
      borderRadius: 2,
    },
  }),
  text: Platform.select({
    ios: {
      // iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
      color: '#007AFF',
      textAlign: 'center',
      padding: 8,
      fontSize: 18,
      backgroundColor: 'transparent'
    },
    android: {
      color: 'white',
      textAlign: 'center',
      padding: 8,
      fontWeight: '500',
    },
  }),
  buttonDisabled: Platform.select({
    ios: {
      borderColor: 'black',
      opacity: 0.2,
    },
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: 'black',
    },
    android: {
      color: '#a1a1a1',
    }
  }),
  buttonLight: {
    backgroundColor: 'white'
  },
  textLight: {
    color: 'black'
  },
  buttonInverse: {
    backgroundColor: '#007AFF',
  },
  textInverse: {
    color: 'white',
  },
  buttonBordered: {
    borderColor: '#007AFF',
    borderWidth: 1,
    borderRadius: 3
  },
  textBordered: {
    fontWeight: '500',
    fontVariant: ['small-caps']
  }
});

module.exports = BetterButton;
