import Axios from 'axios'
import { Formik, Form,  Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import style from './Cadastro.module.css'
import { Link } from 'react-router-dom'

function Cadastro () {

    const validationCadastro = yup.object().shape({
        email: yup.string().email("Digite um e-mail válido").required("Esse campo é obrigatório."),
        password: yup.string().min(8, "Mínimo de 8 caracteres.").required("Esse campo é obrigatório."),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não são iguais")
    })
    const registrar = (values) => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            password: values.password
        }).then((response) => {
            console.log(response)
        })
    }

    return(
        <div className={style.container}>
             <h1 className={style.tittle} >Cadastro</h1>

        <Formik initialValues={{}} onSubmit={registrar}
        validationSchema={validationCadastro}>
        <Form className={style.login_form}>
        <div className={style.login_form_group}>
        <Field name="email"
         className={style.form_field}
         placeholder="Email" />

        <ErrorMessage
        component="span"
        name="email"
        className="form-error" />
        </div>

        <div className={style.login_form_group}>
            <Field name="password"
             className={style.form_field}
            placeholder="Senha" />

            <ErrorMessage
            component="span"
            name="password"
            className="form-error" />
        </div>

        <div className={style.login_form_group}>
            <Field name="confirmPassword"
            className={style.form_field}
            placeholder="Confirme sua senha" />

            <ErrorMessage
            component="span"
            name="confirmPassword"
            className="form-error" />
        </div>

        <button type='submit' className='button'>Cadastrar</button>
        <Link to='/'>
            <button>Voltar</button>
        </Link>
    </Form>
</Formik>

        </div>
    )
}

export default Cadastro;