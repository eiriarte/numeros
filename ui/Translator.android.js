import React from 'react';
import { StyleSheet, ToolbarAndroid, Image, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Speech, Constants } from 'expo';
import { SinglePickerMaterialDialog } from '../MaterialDialog';
import TranslatorKeyboard from './TranslatorKeyboard';
import TranslatorOutput from './TranslatorOutput';
import Numero from '../libs/numero';

const grammarOptions = [
  { label: 'Masculine adjective', value: 'masc' },
  { label: 'Femenine adjective', value: 'fem' },
  { label: 'Noun', value: 'neu' }
];
const grammarLabels = {
  'masc': 'Masc',
  'fem': 'Fem',
  'neu': 'Noun'
}

export default class NavigatorTranslator extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Numbers',
    tabBarIcon: ({ tintColor }) => (
      <Image source={require('../img/android_dialpad.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  constructor(props) {
    super(props);
    this._numero = new Numero();
    this.state = {
      number: this._numero.getNumber(),
      grammar: 'Noun',
      grammarModalVisible: false,
      grammarSelected: grammarOptions[2]
    };
    this._onKeyPressed = this._onKeyPressed.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
    this._onGrammarChanged = this._onGrammarChanged.bind(this);
  }

  _onActionSelected(position) {
    if (position === 0) {
      this.playAudio();
    }
  }

  _onKeyPressed(key) {
    if (key >= '0' && key <= '9') {
      if (this._numero.getNumber().digits.length >= 126) return;
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
        case 'C':
          this._numero.clear();
          break;
        case 'GRA':
          this.setState({ grammarModalVisible: true });
          return;
      }
    }
    this.setState({ number: this._numero.getNumber() });
  }

  _onGrammarChanged(result) {
    const item = result.selectedItem;
    this._numero.setGrammar(item.value);
    this.setState({
      number: this._numero.getNumber(),
      grammarModalVisible: false,
      grammarSelected: item,
      grammar: grammarLabels[item.value]
    });
  }

  async playAudio() {
    if (await Speech.isSpeakingAsync()) {
      Speech.stop();
    } else {
      Speech.speak(this._numero.getNumber().letters, { language: 'es' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SinglePickerMaterialDialog title='Type of numeral'
          items={grammarOptions} selectedItem={this.state.grammarSelected}
          visible={this.state.grammarModalVisible} onOk={this._onGrammarChanged}
          onCancel={() => this.setState({ grammarModalVisible: false })} />
        <ToolbarAndroid
          style={styles.toolbar} title='Numbers' titleColor='#ffffff'
          actions={[
            {
              title: 'Play',
              icon: require('../img/android_play.png'),
              show: 'always'
            }
          ]}
          onActionSelected={this._onActionSelected} />
        <TranslatorOutput number={this.state.number} noun={this.state.grammar === 'Noun'} />
        <TranslatorKeyboard grammar={this.state.grammar} onKeyPressed={this._onKeyPressed} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  toolbar: {
    backgroundColor: '#3849aa',
    height: 56,
    alignSelf: 'stretch',
    elevation: 6
  }
});
