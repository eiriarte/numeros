import _ from 'lodash';
import Numero from './numero';

export default class Quiz {
  static getNumberQuiz(min, max, numQuestions) {
    const numChoices = 4;
    const numbers = _.shuffle(_.range(min, max + 1)).slice(0, numQuestions);
    const quiz = numbers.map((number) => this._getQuestion(number, numChoices));
    return quiz;
  }

  static _getQuestion(number, numChoices) {
    const item = {};
    item.question = '' + number;
    item.answer = Numero.translate(number, 'neu');
    item.choices = this._getWrongChoices(number, item.answer);
    item.choices = _.shuffle(item.choices).slice(0, numChoices - 1);
    item.choices.push(false);
    item.choices.splice(_.random(numChoices - 1), 0, item.answer);
    item.choices.pop();

    return item;
  }

  static _getWrongChoices(number, answer) {
    const errors = [];
    // Todos los posibles errores ortográficos:
    dictErrores.forEach((errores) => {
      const correcto = errores[0];
      if (answer.includes(correcto)) {
        errores[1].forEach((error) => {
          errors.push(answer.replace(correcto, error));
        })
      }
    });

    // +10 -10
    if (number % 10 !== 0) {
      if (number > 10) {
        errors.push(Numero.translate(number + 10, 'neu'));
      }
      if (number > 25) {
        errors.push(Numero.translate(number - 10, 'neu'));
      }
    }

    // -1, +1
    if (number > 1) {
      errors.push(Numero.translate(number - 1, 'neu'));
    }
    errors.push(Numero.translate(number + 1, 'neu'));

    return errors;
  }
}

var dictErrores = [
  ["uno", ["umo", "unno", "une", "ono"]],
  ["dos", ["dose", "doble", "tos", "dós"]],
  ["tres", ["trese", "treis", "thres", "trees", "trés"]],
  ["cuatro", ["catro", "cuarto", "quatro", "carto"]],
  ["cinco", ["quinto", "ceinco", "sinco", "zinco", "cinquo"]],
  ["seis", ["seix", "sieis", "seise", "seís"]],
  ["siete", ["septe", "sete", "siette", "seite"]],
  ["ocho", ["octo", "ochio", "osho", "occho"]],
  ["nueve", ["novo", "nuebe", "neuve", "nove"]],
  ["diez", ["deci", "dies", "diece", "deiz"]],
  ["once", ["onseis", "onse", "dieciuno", "diez y uno"]],
  ["doce", ["dose", "tose", "toce", "diecidós", "diez y dos", "veinte"]],
  ["trece", ["terce", "treice", "trese", "diez y tres", "diecitrés", "treciuno", "treinta"]],
  ["catorce", ["cuartorce", "quatorce", "cuatorce", "catorse", "diez y cuatro", "diecicuatro", "cuatrorce", "cuarentiuno", "cuarenta"]],
  ["quince", ["cince", "quinse", "diez y cinco", "diecicinco", "cincuentiuno", "cincuenta"]],
  ["dieciséis", ["sesenta"]],
  ["diecisiete", ["sesenta"]],
  ["dieciocho", ["ochenta"]],
  ["diecinueve", ["noventa"]],
  ["veinte", ["beinte", "viente", "vente", "deinte"]],
  ["treinta", ["tereinta", "trienta", "trenta", "treinte"]],
  ["séis", ["seis", "sèis"]],
  ["dieci", ["dici", "deici", "dieici", "diez y "]],
  ["dós", ["tós", "dos", "dòs"]],
  ["trés", ["tres", "très", "ters"]],
  ["veinti", ["venti", "beinti", "vienti", "vieinti", "veinte y "]],
  ["treinta y", ["treinti", "trenti"]],
];
