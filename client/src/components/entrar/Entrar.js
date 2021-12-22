import Axios from 'axios'
import { Formik, Form,  Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import style from './Entrar.module.css'
import { Link } from 'react-router-dom'

function Entrar () {

    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um e-mail válido").required("Esse campo é obrigatório."),
        password: yup.string().min(8, "Mínimo de 8 caracteres.").required("Esse campo é obrigatório.")
    })

   
    const login = values => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password
        }).then((response) => {
            alert(response.data.msg)
        })
    }

    return(
        <div className={style.container}>
            <h1 className={style.tittle}>Entrar</h1>
        <Formik initialValues={{}} onSubmit={login}
        validationSchema={validationLogin} >
            
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

                <button type='submit' className={style.button}>Login</button>
                <Link to='/cadastro'>
                    <button className={style.button} >Cadastrar</button>
                </Link>
                
            </Form>
        </Formik>

        </div>
    )
}

export default Entrar;