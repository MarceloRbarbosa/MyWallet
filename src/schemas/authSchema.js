import joi from "joi";

export const authSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required().messages({"any.only": "Erro na confirmação de senha!"})
});


export const authLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});