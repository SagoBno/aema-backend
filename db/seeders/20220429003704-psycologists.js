module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Psychologists', [
      {
        id: 1,
        name: 'Cuerpo Arte y Palabra - Psicologos Clinicos',
        phonenumber: '(+57) 3219465830',
        city: 'Bogota',
        address: 'Cra. 20 #137-21',
        page: 'https://www.cuerpoarteypalabra.com/psicologia-adolescentes.html',
      }, {
        id: 2,
        name: 'AEPSI – Asesorías y Estrategias Psicológicas',
        phonenumber: '(+57) 3208724660',
        email: 'info@aepsi.com.co',
        city: 'Bogota',
        address: 'Calle 93B No. 16 – 08. Consultorio 301',
        page: 'https://aepsi.com.co/',
      }, {
        id: 3,
        name: 'Neuro Therapy - Estimulación Infantil',
        phonenumber: '(+57) 3243875714',
        email: 'bogota@neurotherapy.com.co',
        city: 'Bogota',
        address: 'Calle 99 #49 38 Cons. 711 Centum Bussiness',
        page: 'https://neurotherapy.com.co/',
      }, {
        id: 4,
        name: 'Neuro Therapy - Estimulación Infantil',
        phonenumber: '(+57) 3017463418',
        email: 'medellin@neurotherapy.com.co',
        city: 'Medellin',
        address: 'Calle 34 B # 65 D 02. Cons 301 Edificio Entre Calles',
        page: 'https://neurotherapy.com.co/',
      }, {
        id: 5,
        name: 'Neuro Therapy - Estimulación Infantil',
        phonenumber: '(+57) 3162439436',
        email: 'cali@neurotherapy.com.co',
        city: 'Cali',
        page: 'https://neurotherapy.com.co/',
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
