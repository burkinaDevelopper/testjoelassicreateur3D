import * as Yup from 'yup'

export interface AuthFormValues {
    email: string
    password: string
}

export const schema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Adresse e-mail invalide")
        .required("Adresse e-mail requise"),
    password: Yup.string()
        .trim()
        .required("Mot de passe requis"),
})