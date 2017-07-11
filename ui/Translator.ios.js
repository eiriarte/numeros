import React from 'react';
import { StyleSheet, Text, View, ActionSheetIOS, NavigatorIOS } from 'react-native';
import TranslatorKeyboard from './TranslatorKeyboard';
import TranslatorOutput from './TranslatorOutput';
import Numero from '../libs/numero';

const grammarOptions = ['Masculine', 'Femenine', 'Noun', 'Cancel'];
const grammarValues = ['masc', 'fem', 'neu'];
const grammarLabels = ['Masc', 'Fem', 'Noun'];

class TranslatorScreen extends React.Component {
  constructor(props) {
    super(props);
    this._numero = new Numero();
    this.state = { number: this._numero.getNumber(), grammar: 'Noun' };
    this._onKeyPressed = this._onKeyPressed.bind(this);
  }

  _onKeyPressed(key) {
    if (key >= '0' && key <= '9') {
      this._numero.addDigit(key);
    } else {
      switch (key) {
        case '+1':
          this._numero.sum(1);
          break;
        case '-1':
          this._numero.sum(-1);
          break;
        case 'DEL':
          this._numero.del();
          break;
        case 'GRA':
          ActionSheetIOS.showActionSheetWithOptions({
            options: grammarOptions,
            cancelButtonIndex: 3,
            title: 'Type of numeral',
            message: 'Choose noun, masculine adjective or feminine adjective (uno, un gato, una gata).'
          }, (buttonIndex) => {
            const grammar = grammarValues[buttonIndex];
            if (grammar) {
              this._numero.setGrammar(grammar);
              this.setState({
                number: this._numero.getNumber(),
                grammar: grammarLabels[buttonIndex]
              });
            }
          });
          return;
      }
    }
    this.setState({ number: this._numero.getNumber() });
  }

  render() {
    return (
      <View style={styles.container}>
        <TranslatorOutput number={this.state.number} noun={this.state.grammar === 'Noun'} />
        <TranslatorKeyboard grammar={this.state.grammar} onKeyPressed={this._onKeyPressed} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default class NavigatorTranslator extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: TranslatorScreen,
          title: 'Numbers'
        }}
        style={{flex: 1}}
      />
    );
  }
}
