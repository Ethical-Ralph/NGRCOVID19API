const fs = require('fs')
const path = require('path')
const modelsdir = path.join(__dirname, 'models')
const models = {}

fs.readdirSync(modelsdir).forEach(modelfile => {
    const model = require(path.join(modelsdir, modelfile))
    models[ model.modelName ] = model
});

module.exports = models
