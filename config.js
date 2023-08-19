const path = require("path"); // модуль path из стандартных модулей Node.js
const rootPath = __dirname;
// __dirname - специальная глобальная переменная в NodeJS,
// которая в момент выполнения JS-файла (config.js) содержит абсолютный путь к директории,
// в которой этот JS-файл лежит

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, "public/uploads"),
    db: {
        name: "cocktail-recipes",
        url: "mongodb://localhost"
    },
    facebook: {
        appId: "700645038747371",
        appSecret: "1ef2cb163be5c143d6abec498fb4c746"
    }
};