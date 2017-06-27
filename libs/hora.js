import _ from 'lodash';
import Numero from './numero';

export default class Hora {
  constructor(time) {
    this._time = {};
    this._num = new Numero();
    this.setTime(time);
  }

  setTime(time) {
    if (time.constructor !== Date) throw new TypeError('Se requiere una fecha.');
    const hh = time.getHours();
    let mm = time.getMinutes();
    const mmPadded = _.padStart(mm, 2, '0');
    let ini = 'Son las', conn = 'y';
    let h = (hh % 12) || 12;
    const tramo = getTramo(hh, mm);

    if (mm > 30) {
      conn = 'menos';
      mm = 60 - mm;
      h = ((h + 1) % 12) || 12;
    }
    if (h === 1) {
      ini = 'Es la';
    }

    this._num.setNumber(h);
    h = this._num.getNumber().letters;
    this._num.setNumber(mm);
    mm = this._num.getNumber().letters;

    this._time.digits = hh + ':' + mmPadded + ' h';
    this._time.letters = fracciones(`${ini} ${h} ${conn} ${mm} ${tramo}`);
  }

  getTime() {
    return this._time;
  }
}

function getTramo(hh, mm) {
  if (mm > 30) hh += 1;
  if (hh === 0) return 'de la noche';
  if (hh < 6) return 'de la madrugada';
  if (hh < 12) return 'de la mañana';
  if (hh === 12 && (mm === 0 || mm > 30)) return 'de la mañana';
  if (hh <= 20) return 'de la tarde';
  return 'de la noche';
}

function fracciones(hora) {
  hora = hora.replace('quince', 'cuarto');
  hora = hora.replace('y cero', 'en punto');
  hora = hora.replace('treinta', 'media');
  hora = hora.replace('la uno', 'la una');
  return hora;
}
