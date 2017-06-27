import Fecha from '../libs/fecha';

describe('Fecha', function() {
  const ahora = new Date(1975, 3, 21);
  const fecha = new Fecha(ahora);
  const date = fecha.getDate();

  it('requiere una fecha', function() {
    const peta = function() {
      return new Fecha('12/04/1999');
    }
    const noPeta = function() {
      return new Fecha(new Date());
    }
    expect(peta).toThrowError(TypeError);
    expect(noPeta).not.toThrow();
  });

  it('se inicializa correctamente', function() {
    expect(date).toEqual({
      shortForm: '21/4/1975',
      longForm: 'Lunes, 21 de abril de 1975'
    });
  });

  it('se modifica correctamente', function() {
    fecha.setDate(new Date(2016, 0, 1));
    expect(date).toEqual({
      shortForm: '1/1/2016',
      longForm: 'Viernes, 1º de enero de 2016'
    });
  });
});
