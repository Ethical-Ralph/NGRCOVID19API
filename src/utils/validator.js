const Joi = require("@hapi/joi")

const validateTotals = (data) => {
    const schema = Joi.object({
        samplesTested: Joi.number().required(),
        activeCases: Joi.number().required(),
        confirmedCases: Joi.number().required(),
        discharged: Joi.number().required(),
        death: Joi.number().required()
    })

    const { error } = schema.validate(data)
    if (error) return false
    return true
}

const validateStateData = (data) => {
    const schema = Joi.array().items(
        Joi.object({
            state: Joi.string().required(),
            confirmedCases: Joi.number().required(),
            activeCases: Joi.number().required(),
            discharged: Joi.number().required(),
            death: Joi.number().required(),

        })
    )

    const { error } = schema.validate(data)
    if (error) return false
    return true
}

module.exports = {
    validateStateData,
    validateTotals
}