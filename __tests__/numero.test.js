import Numero from '../libs/numero';

describe('Numero', function() {
  const num = new Numero();
  const number = num.getNumber();

  it('se inicializa a «cero», «0»…', function() {
    expect(number.letters).toBe('cero');
    expect(number.digits).toBe('0');
    expect(number.letterChunks).toEqual([{ style: 'unit', content: ['cero'] }]);
    expect(number.digitChunks).toEqual([{ style: 'unit', content: '0' }]);
  });

  it('añade dígitos', function() {
    num.addDigit('2');
    num.addDigit('0');
    expect(number.letters).toBe('veinte');
    expect(number.digits).toBe('20');
  });

  it('formatea los trozos', function() {
    expect(number.letterChunks).toEqual([{ style: 'ten-unit', content: ['veinte'] }]);
    expect(number.digitChunks).toEqual([{ style: 'ten-unit', content: ['20'] }]);
  });

  it('borra el número', function() {
    num.clear();
    expect(number.letters).toBe('cero');
    expect(number.digits).toBe('0');
    expect(number.letterChunks).toEqual([{ style: 'unit', content: ['cero'] }]);
    expect(number.digitChunks).toEqual([{ style: 'unit', content: ['0'] }]);
  });

  it('incrementa y decrementa', function() {
    num.addDigit('2');
    num.addDigit('0');
    num.sum(1);
    num.sum(1);
    expect(number.letters).toBe('veintidós');
    num.sum(-1);
    expect(number.letters).toBe('veintiuno');
  });

  it('cambia el género', function() {
    num.setGrammar('fem');
    expect(number.letters).toBe('veintiuna');
    num.setGrammar('masc');
    expect(number.letters).toBe('veintiún');
  });

  it('traduce números', function() {
    num.setNumber(2021);
    expect(number.letters).toBe('dos mil veintiún');
    num.setNumber('014');
    expect(number.letters).toBe('catorce');
    num.setNumber('1000000');
    expect(number.letterChunks).toEqual([
      { style: 'zillion', content: ['un millón '] }
    ]);
    expect(number.digitChunks).toEqual([
      { style: 'zillion', content: ['1'] },
      { style: 'zillion', content: ['000'] },
      { style: 'zillion', content: ['000'] }
    ]);
    num.setNumber('1201201');
    num.setGrammar('neu');
    expect(number.letterChunks).toEqual([
      { style: 'zillion', content: ['un millón '] },
      { style: 'thousand', content: [
        'doscient',
        { style: 'm', content: 'os' },
        ' ',
        { style: 'm', content: 'un' },
        ' mil '
      ]},
      { style: 'hundred', content: ['doscientos '] },
      { style: 'unit', content: ['uno'] }
    ]);
    expect(number.digitChunks).toEqual([
      { style: 'zillion', content: ['1'] },
      { style: 'thousand', content: ['201'] },
      { style: 'hundred', content: ['2'] },
      { style: 'unit', content: ['01'] }
    ]);
  });

  it('suma numeros pequeños y grandes', function() {
    let vigintillonesOcho = '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999998';
    let vigintillonesNueve = '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
    expect(num._sum('1', -1)).toBe('0');
    expect(num._sum(vigintillonesNueve, -1)).toBe(vigintillonesOcho);
    expect(num._sum(vigintillonesOcho, 1)).toBe(vigintillonesNueve);
  });

  it('hace caso a la RAE', function() {
    rae.forEach((numeral) => {
      expect(Numero.translate(numeral.number, 'neu')).toBe(numeral.words);
    });
  })
});

var rae = [
  { number: "2", words: "dos" },
  { number: "3", words: "tres" },
  { number: "4", words: "cuatro" },
  { number: "5", words: "cinco" },
  { number: "6", words: "seis" },
  { number: "7", words: "siete" },
  { number: "8", words: "ocho" },
  { number: "9", words: "nueve" },
  { number: "10", words: "diez" },
  { number: "11", words: "once" },
  { number: "12", words: "doce" },
  { number: "13", words: "trece" },
  { number: "14", words: "catorce" },
  { number: "15", words: "quince" },
  { number: "16", words: "dieciséis" },
  { number: "17", words: "diecisiete" },
  { number: "18", words: "dieciocho" },
  { number: "19", words: "diecinueve" },
  { number: "20", words: "veinte" },
  { number: "21", words: "veintiuno" },
  { number: "22", words: "veintidós" },
  { number: "23", words: "veintitrés" },
  { number: "24", words: "veinticuatro" },
  { number: "25", words: "veinticinco" },
  { number: "26", words: "veintiséis" },
  { number: "27", words: "veintisiete" },
  { number: "28", words: "veintiocho" },
  { number: "29", words: "veintinueve" },
  { number: "30", words: "treinta" },
  { number: "31", words: "treinta y uno" },
  { number: "32", words: "treinta y dos" },
  { number: "40", words: "cuarenta" },
  { number: "50", words: "cincuenta" },
  { number: "60", words: "sesenta" },
  { number: "70", words: "setenta" },
  { number: "80", words: "ochenta" },
  { number: "90", words: "noventa" },
  { number: "100", words: "cien" },
  { number: "101", words: "ciento uno" },
  { number: "102", words: "ciento dos" },
  { number: "200", words: "doscientos" },
  { number: "202", words: "doscientos dos" },
  { number: "300", words: "trescientos" },
  { number: "400", words: "cuatrocientos" },
  { number: "500", words: "quinientos" },
  { number: "600", words: "seiscientos" },
  { number: "700", words: "setecientos" },
  { number: "800", words: "ochocientos" },
  { number: "900", words: "novecientos" },
  { number: "999", words: "novecientos noventa y nueve" },
  { number: "1000", words: "mil" },
  { number: "1001", words: "mil uno" },
  { number: "1002", words: "mil dos" },
  { number: "1003", words: "mil tres" },
  { number: "1010", words: "mil diez" },
  { number: "1011", words: "mil once" },
  { number: "1020", words: "mil veinte" },
  { number: "1021", words: "mil veintiuno" },
  { number: "1022", words: "mil veintidós" },
  { number: "1023", words: "mil veintitrés" },
  { number: "1030", words: "mil treinta" },
  { number: "1031", words: "mil treinta y uno" },
  { number: "1100", words: "mil cien" },
  { number: "1101", words: "mil ciento uno" },
  { number: "1102", words: "mil ciento dos" },
  { number: "1103", words: "mil ciento tres" },
  { number: "1111", words: "mil ciento once" },
  { number: "1200", words: "mil doscientos" },
  { number: "1300", words: "mil trescientos" },
  { number: "2000", words: "dos mil" },
  { number: "2001", words: "dos mil uno" },
  { number: "2002", words: "dos mil dos" },
  { number: "2003", words: "dos mil tres" },
  { number: "2010", words: "dos mil diez" },
  { number: "2011", words: "dos mil once" },
  { number: "2020", words: "dos mil veinte" },
  { number: "2021", words: "dos mil veintiuno" },
  { number: "2022", words: "dos mil veintidós" },
  { number: "2023", words: "dos mil veintitrés" },
  { number: "2100", words: "dos mil cien" },
  { number: "2101", words: "dos mil ciento uno" },
  { number: "2102", words: "dos mil ciento dos" },
  { number: "2103", words: "dos mil ciento tres" },
  { number: "3000", words: "tres mil" },
  { number: "4000", words: "cuatro mil" },
  { number: "5000", words: "cinco mil" },
  { number: "6000", words: "seis mil" },
  { number: "7000", words: "siete mil" },
  { number: "8000", words: "ocho mil" },
  { number: "9000", words: "nueve mil" },
  { number: "10000", words: "diez mil" },
  { number: "11000", words: "once mil" },
  { number: "20000", words: "veinte mil" },
  { number: "21000", words: "veintiún mil" },
  { number: "30000", words: "treinta mil" },
  { number: "31000", words: "treinta y un mil" },
  { number: "40000", words: "cuarenta mil" },
  { number: "50000", words: "cincuenta mil" },
  { number: "100000", words: "cien mil" },
  { number: "200000", words: "doscientos mil" },
  { number: "300000", words: "trescientos mil" },
  { number: "500000", words: "quinientos mil" },
  { number: "1000000", words: "un millón" },
  { number: "1000001", words: "un millón uno" },
  { number: "1000100", words: "un millón cien" },
  { number: "1001000", words: "un millón mil" },
  { number: "1010000", words: "un millón diez mil" },
  { number: "1100000", words: "un millón cien mil" },
  { number: "1111111", words: "un millón ciento once mil ciento once" },
  { number: "2000000", words: "dos millones" },
  { number: "2000234", words: "dos millones doscientos treinta y cuatro" },
  { number: "2222222", words: "dos millones doscientos veintidós mil doscientos veintidós" },
  { number: "3020469", words: "tres millones veinte mil cuatrocientos sesenta y nueve" },
  { number: "9834752", words: "nueve millones ochocientos treinta y cuatro mil setecientos cincuenta y dos" },
  { number: "10000000", words: "diez millones" },
  { number: "21121021", words: "veintiún millones ciento veintiún mil veintiuno" },
  { number: "89322891", words: "ochenta y nueve millones trescientos veintidós mil ochocientos noventa y uno" },
  { number: "100000000", words: "cien millones" },
  { number: "1000000000", words: "mil millones" },
  { number: "10000000000", words: "diez mil millones" },
  { number: "100000000000", words: "cien mil millones" },
  { number: "1000000000000", words: "un billón" },
  { number: "1000000000000000000", words: "un trillón" },
  { number: "1000000000000000000000000", words: "un cuatrillón" },
  { number: "1000000000000000000000000000000", words: "un quintillón" },
  { number: "1000000000000000000000000000000000000", words: "un sextillón" },
  { number: "1000000000000000000000000000000000000000000", words: "un septillón" },
  { number: "1000000000000000000000000000000000000000000000000", words: "un octillón" },
  { number: "1000000000000000000000000000000000000000000000000000000", words: "un nonillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000", words: "un decillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000", words: "un undecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000", words: "un duodecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un tredecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un cuatordecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un quindecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un sexdecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un septendecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un octodecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un novendecillón" },
  { number: "1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000", words: "un vigintillón" },
];
