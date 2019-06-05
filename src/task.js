const fs = require('fs');

const returnFileData = (file) => {
  return fs.readFileSync(file).toJSON()
};

const listTasks = () => {
  try {
    return returnFileNames(fs.readdirSync('/home/patricio/Documentos/Cursos/Tomados/Udemy/Node/Amead/data'));
  } catch (e) {
    return [];
  }
};

const returnFileNames = (files) => {
  let names = [];
  files.forEach(file => {
    names.push(file.split('.')[0]);
  });
  return names;
};

const saveTaskIntoFile = function(fileName, content) {
  fs.writeFileSync('data/' + fileName + '.json', JSON.stringify(content))
};

const removeTask = (title) => {
  fs.unlinkSync('data/' + title + '.json')
}

module.exports = {
  returnFileNames,
  returnFileData,
  listTasks,
  saveTaskIntoFile,
  removeTask
}
