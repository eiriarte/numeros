import React from 'react';
import { StyleSheet, ToolbarAndroid, Image, Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import { Constants } from 'expo';
import TranslatorKeyboard from './TranslatorKeyboard';
import TranslatorOutput from './TranslatorOutput';
import Numero from '../libs/numero';

const grammarOptions = ['Masculine adjective', 'Femenine adjective', 'Noun', 'Cancel'];
const grammarValues = ['masc', 'fem', 'neu'];
const grammarLabels = ['Masc', 'Fem', 'Noun'];

export default class NavigatorTranslator extends React.Component {
  // static propTypes = { onNumberChanged: PropTypes.func.isRequired }
  static navigationOptions = {
    tabBarLabel: 'Numbers',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../img/android_dialpad.png')}
        style={{ tintColor: tintColor }}/>
    )
  }

  constructor(props) {
    super(props);
    this._numero = new Numero();
    this.state = { number: this._numero.getNumber(), grammar: 'Noun' };
    this._onKeyPressed = this._onKeyPressed.bind(this);
    this._onActionSelected = this._onActionSelected.bind(this);
  }

  _onActionSelected(position) {
    if (position === 0) {
      console.log('SONANDO!!!!');
    }
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
          // ActionSheetIOS.showActionSheetWithOptions({
          //   options: grammarOptions,
          //   cancelButtonIndex: 3,
          //   title: 'Type of numeral',
          // }, (buttonIndex) => {
          //   const grammar = grammarValues[buttonIndex];
          //   if (grammar) {
          //     this._numero.setGrammar(grammar);
          //     this.props.onNumberChanged(this._numero.getNumber().letters);
          //     this.setState({
          //       number: this._numero.getNumber(),
          //       grammar: grammarLabels[buttonIndex]
          //     });
          //   }
          // });
          return;
      }
    }
    // this.props.onNumberChanged(this._numero.getNumber().letters);
    this.setState({ number: this._numero.getNumber() });
  }

  render() {
    return (
      <View style={styles.container}>
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
  }
});
