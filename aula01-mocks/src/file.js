const { readFile } = require('fs/promises');
const User = require('./user');
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
}

class File {
  static async csvToJson(filePath) {
    const content = await File.getFileContent(filePath);

    const validation = File.isValid(content);

    if (!validation.valid) throw new Error(validation.error);

    const users = File.parseCSVToJson(content);

    return users;
  }

  static async getFileContent(filePah) {
    // const filename = join(__dirname, filePah);

    return (await readFile(filePah)).toString('utf8');
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...dataRows] = csvString.split('\n');

    const isHeaderValid = header === options.fields.join(',');

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLengthAccepted = (
      dataRows.length && dataRows.length <= options.maxLines
    );

    if (!isContentLengthAccepted) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static parseCSVToJson(csvString) {
    const lines = csvString.split('\n');

    const firstLine = lines.shift();

    const header = firstLine.split(',');

    const users = lines.map(line => {
      const columns = line.split(',');
      let user = {};

      columns.forEach((column, index) => {
        user[header[index]] = column;
      });

      return new User(user);
    })

    return users;
  }
}

// (async () => {
//   const result = await File.csvToJoson('./../mocks/threeItems-valid.csv');
//   // const result = await File.csvToJoson('./../mocks/fourItems-invalid.csv');
//   // const result = await File.csvToJoson('./../mocks/invalid-header.csv');

//   console.log('result', result);
// })();

module.exports = File;