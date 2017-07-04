export default class Numero {
  constructor() {
    this._number = {
      digits: '0',
      letters: 'cero',
      letterChunks: [{ style: 'unit', content: ['cero'] }],
      digitChunks: [{ style: 'unit', content: '0' }]
    };
    this._grammar = 'neu';
  }

  static translate(number, gender) {
    number = _getDigits(number);
    return cleanStyles(_getStyledNumber(number, gender)).trim();
  }

  setNumber(number) {
    this._number.digits = _getDigits(number);
    this._spanishNumberToWords(this._number.digits, this._grammar);
    this._number.digitChunks = _formatNumber(this._number.digits);
  }

  addDigit(digit) {
    this._number.digits = _getDigits(this._number.digits + digit);
    this._spanishNumberToWords(this._number.digits, this._grammar);
    this._number.digitChunks = _formatNumber(this._number.digits);
  }

  clear() {
    this._number.digits = '0';
    this._number.letters = 'cero';
    this._number.letterChunks = [{ style: 'unit', content: ['cero'] }];
    this._number.digitChunks = [{ style: 'unit', content: ['0'] }];
  }

  sum(num) {
    this._number.digits = this._sum(this._number.digits, num);
    this._spanishNumberToWords(this._number.digits, this._grammar);
    this._number.digitChunks = _formatNumber(this._number.digits);
  }

  setGrammar(type) {
    this._grammar = type;
    this._spanishNumberToWords(this._number.digits, this._grammar);
  }

  getNumber() {
    return this._number;
  }

  _sum(number, addend) {
    let result = '';
    let digit, newDigit;

    number = number.replace(/[^\d]/, '');
    if (number === '') {
      number = '0';
    }
    if (/^0+$/.test(number) && addend === -1) {
      return number;
    }
    if ((number.length > 126 || number === Array(127).join('9')) && addend === 1) {
      return number;
    }

    for (var i = number.length - 1; i >= 0; i--) {
      digit = +number[i];
      newDigit = digit + addend;
      if (newDigit === 10) {
        newDigit = 0;
      } else if (newDigit === -1) {
        newDigit = 9;
      } else {
        addend = 0;
      }
      result = newDigit + result;
    }
    if (newDigit === 0) {
      if (addend !== 0) {
        result = '1' + result;
      } else {
        result = result.slice(1);
      }
    }
    return result || '0';
  }

  _spanishNumberToWords(number, gender) {
    var result = _getStyledNumber(number, gender);

    this._number.letters = cleanStyles(result).trim();
    this._number.letterChunks = parseStyles(result);
  }
}

function _getStyledNumber(number, gender) {
  var chunks = [];
  var result;

  if (/^0*$/.test(number)) {
    result = 'unit/cero';
  } else {
    chunks = _chunkNumber(number);
    result = chunks.map((chunk, index) => {
      var result, zillion;
      if (index > 1) {
        result = _getChunk(chunk, 'masc', index);
        if (index % 2 === 0) {
          if (chunk === '000' && chunks[index + 1] === '000') {
            result = ''; // "billones millones" => "billones"
          } else {
            zillion = millions[index + ''];
            if (!/^0*1$/.test(chunk)) {
              zillion = zillion.replace('llón', 'llones'); // "dos millón" => "dos millones"
            }
            result += ' ' + zillion;
          }
        } else if (result) {
          if (/^0*1$/.test(chunk)) {
            result = 'mil'; // "un mil" => "mil"
          } else {
            result += ' mil';
          }
        }
        result = 'zillion/' + result + '|';
      } else if (index === 1) {
        result = _getChunk(chunk, gender !== 'fem' ? 'masc' : 'fem', index);
        if (result) {
          if (/^0*1$/.test(chunk)) {
            result = 'mil'; // "un mil" => "mil"
          } else {
            result += ' mil';
          }
          result = 'thousand/' + result + '|';
        }
      } else {
        result = _getChunk(chunk, gender, index);
      }
      return result;
    });
    result = result.reverse().join(' ').trim();
  }

  return result;
}

function _getChunk(number, gender, index) {
  var result = '';
  var unit = number.slice(-1);
  var tenUnit = number.slice(-2);
  var ten = number.slice(-2, -1);
  var hundred = number.slice(-3, -2);
  var unitClass = 'unit';

  tenUnit = units[tenUnit];
  if (number.length > 1 && tenUnit) {
    unit = tenUnit;
    ten = '';
    unitClass = 'ten-unit';
  } else {
    unit = units[unit] || '';
    ten = tens[ten] || '';
    if (ten && unit) {
      ten = ten + ' y ';
    }
  }
  hundred = hundreds[hundred] || '';
  if (hundred) {
    if (hundred === 'ciento' && !ten && !unit) {
      hundred = 'cien';
    }
    hundred += ' ';
  }

  if (index === 0) {
    result = 'hundred/' + hundred + '|ten/' +
    ten + '|' + unitClass + '/' + unit;
  } else {
    result = hundred + ten + unit;
  }

  return _toGender(result.trim(), gender, index);
}

function _toGender(number, gender, index) {
  if (gender === 'neu') return number;

  if (gender === 'fem') {
    number = number.replace('tos', 't;f:as;');
    number = number.replace('uno', ';f:una;');
  } else if (gender === 'masc') {
    if (index > 1) {
      number = number.replace('veintiuno', 'veintiún');
      number = number.replace('uno', 'un');
    } else {
      number = number.replace('tos', 't;m:os;');
      number = number.replace('veintiuno', 'veinti;m:ún;');
      number = number.replace('uno', ';m:un;');
    }
  }

  return number;
}

function _formatNumber(number, gender) {
  const chunks = _chunkNumber(number);
  let join = ' ';

  let result = chunks.map(function(chunk, index) {
    let unit, tenUnit, ten, hundred, unitClass = 'unit';
    if (index > 1) {
      chunk = 'zillion/' + chunk + '|';
    } else if (index === 1) {
      if (chunk === '000') {
        chunk = 'zillion/000|';
      } else {
        chunk = 'thousand/' + chunk + '|';
      }
    } else {
      unit = chunk.slice(-1);
      tenUnit = chunk.slice(-2);
      ten = chunk.slice(-2, -1);
      hundred = chunk.slice(-3, -2);
      unitClass = 'unit';

      if (chunk === '000') {
        if (chunks[1] === '000') return 'zillion/000';
        return 'thousand/000';
      } else if (chunk.length > 1 && units[tenUnit]) {
        unit = tenUnit;
        ten = '';
        unitClass = 'ten-unit';
      } else if (tenUnit === '00') {
        unit = '';
        ten = '';
        hundred += '00';
      } else if (ten === '0') {
        unit = '0' + unit;
        ten = '';
      }

      chunk = 'hundred/' + hundred + '|ten/' + ten + '|' +
      unitClass + '/' + unit;
    }
    return chunk;
  });
  if (number.length < 5) {
    join = '';
  }
  result = result.reverse().join(join) || 'unit/0';
  return parseStyles(result);
}

function _chunkNumber(number) {
  var chunks = [];

  for (var i = number.length; i > 0; i -= 3) {
    if (i >= 3) {
      chunks.push(number.slice(i - 3, i));
    } else {
      chunks.push(number.slice(0, i));
    }
  }

  return chunks;
}

function _getDigits(number) {
  let digits = '' + number;
  digits = digits.replace(/^0+/, '');
  if (digits === '') digits = '0';
  return digits;
}

function cleanStyles(number) {
  number = number.replace(/[a-z\-]+\//g, '');
  number = number.replace(/[mf]\:/g, '');
  number = number.replace(/[|;]/g, '');
  number = number.replace(/\s\s+/g, ' ').trim();
  return number;
}

function parseStyles(number) {
  const result = [];

  number.split('|').forEach((chunk) => {
    chunk = chunk.split('/');
    if (chunk[1].trim() === '') return;
    result.push({ style: chunk[0].trim(), content: mapGenders(chunk[1]) });
  });

  return result;

  function mapGenders(chunk) {
    return chunk.split(';').map((chunk) => {
      chunk = chunk.split(':');
      if (chunk.length > 1) {
        return { style: chunk[0].trim(), content: chunk[1] };
      } else {
        return chunk[0];
      }
    });
  }
}

var units = {
  '1': 'uno',
  '2': 'dos',
  '3': 'tres',
  '4': 'cuatro',
  '5': 'cinco',
  '6': 'seis',
  '7': 'siete',
  '8': 'ocho',
  '9': 'nueve',
  '11': 'once',
  '12': 'doce',
  '13': 'trece',
  '14': 'catorce',
  '15': 'quince',
  '16': 'dieciséis',
  '17': 'diecisiete',
  '18': 'dieciocho',
  '19': 'diecinueve',
  '20': 'veinte',
  '21': 'veintiuno',
  '22': 'veintidós',
  '23': 'veintitrés',
  '24': 'veinticuatro',
  '25': 'veinticinco',
  '26': 'veintiséis',
  '27': 'veintisiete',
  '28': 'veintiocho',
  '29': 'veintinueve',
  '30': 'treinta',
  '40': 'cuarenta',
  '50': 'cincuenta',
  '60': 'sesenta',
  '70': 'setenta',
  '80': 'ochenta',
  '90': 'noventa'
};

var tens = {
  '1': 'diez',
  '2': 'veinte',
  '3': 'treinta',
  '4': 'cuarenta',
  '5': 'cincuenta',
  '6': 'sesenta',
  '7': 'setenta',
  '8': 'ochenta',
  '9': 'noventa'
};

var hundreds = {
  '1': 'ciento',
  '2': 'doscientos',
  '3': 'trescientos',
  '4': 'cuatrocientos',
  '5': 'quinientos',
  '6': 'seiscientos',
  '7': 'setecientos',
  '8': 'ochocientos',
  '9': 'novecientos'
};

var millions = {
  '2': 'millón',
  '4': 'billón',
  '6': 'trillón',
  '8': 'cuatrillón',
  '10': 'quintillón',
  '12': 'sextillón',
  '14': 'septillón',
  '16': 'octillón',
  '18': 'nonillón',
  '20': 'decillón',
  '22': 'undecillón',
  '24': 'duodecillón',
  '26': 'tredecillón',
  '28': 'cuatordecillón',
  '30': 'quindecillón',
  '32': 'sexdecillón',
  '34': 'septendecillón',
  '36': 'octodecillón',
  '38': 'novendecillón',
  '40': 'vigintillón'
};
