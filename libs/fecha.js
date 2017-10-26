export default class Fecha {
  constructor(date) {
    this._date = {};
    this.setDate(date);
  }

  setDate(date) {
    if (date.constructor !== Date) throw new TypeError('Se requiere una fecha.');
    const weekDay = dias[date.getDay()];
    const day = date.getDate();
    const longDay = day === 1 ? '1º' : day;
    const month = date.getMonth();
    const year = date.getFullYear();
    this._date.date = date;
    this._date.shortForm = day + '/' + (month + 1) + '/' + year;
    this._date.longForm = weekDay + ', ' + longDay + ' de ' + meses[month] +
                          ' de ' + year;
  }

  getDate() {
    return this._date;
  }
}

var meses = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre'
];

var dias = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado'
];
