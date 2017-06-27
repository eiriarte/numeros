import Hora from '../libs/hora';

describe('Hora', function() {
  var ahora = new Date(2000, 0, 1, 21, 30);
  var hora = new Hora(ahora);
  var time = hora.getTime();

  it('se inicializa correctamente', function() {
    expect(time).toEqual({
      digits: '21:30 h',
      letters: 'Son las nueve y media de la noche'
    });
  });

  it('se modifica correctamente', function() {
    horas.forEach((test) => {
      hora.setTime(new Date(1970, 0, 1, test[0], test[1]));
      expect(time).toEqual({ digits: test[2], letters: test[3] });
    });
  });
});

var horas = [
  [ 0, 0, '0:00 h', 'Son las doce en punto de la noche' ],
  [ 23, 45, '23:45 h', 'Son las doce menos cuarto de la noche' ],
  [ 0, 20, '0:20 h', 'Son las doce y veinte de la noche' ],
  [ 0, 45, '0:45 h', 'Es la una menos cuarto de la madrugada' ],
  [ 1, 15, '1:15 h', 'Es la una y cuarto de la madrugada' ],
  [ 5, 30, '5:30 h', 'Son las cinco y media de la madrugada' ],
  [ 5, 45, '5:45 h', 'Son las seis menos cuarto de la mañana' ],
  [ 6, 3, '6:03 h', 'Son las seis y tres de la mañana' ],
  [ 11, 39, '11:39 h', 'Son las doce menos veintiuno de la mañana' ],
  [ 12, 0, '12:00 h', 'Son las doce en punto de la mañana' ],
  [ 12, 21, '12:21 h', 'Son las doce y veintiuno de la tarde' ],
  [ 12, 40, '12:40 h', 'Es la una menos veinte de la tarde' ],
  [ 13, 0, '13:00 h', 'Es la una en punto de la tarde' ],
  [ 18, 27, '18:27 h', 'Son las seis y veintisiete de la tarde' ],
  [ 20, 30, '20:30 h', 'Son las ocho y media de la tarde' ],
  [ 20, 35, '20:35 h', 'Son las nueve menos veinticinco de la noche' ],
  [ 21, 30, '21:30 h', 'Son las nueve y media de la noche' ],
  [ 23, 30, '23:30 h', 'Son las once y media de la noche' ]
];
