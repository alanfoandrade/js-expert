const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert');


(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';

    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/fourItems-invalid.csv';
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);

    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }

  {
    const filePath = './mocks/threeItems-valid.csv';
    const result = await File.csvToJson(filePath);

    const expected =
      [
        {
          "id": 123,
          "name": "Gilmar Mota",
          "profession": "Dono do bar",
          "birthYear":1955
        },
        {
          "id": 321,
          "name": "João Gilberto",
          "profession": "Músico",
          "birthYear":1923
        },
        {
          "id": 231,
          "name": "Pedro Cansado",
          "profession": "Garçom",
          "birthYear":1702
        }
      ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})()