import { useNavigate, NavLink } from "react-router-dom";
import {useState} from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import './Login.scss';
import axios from "axios";

function Login() {
    const [fail, setFail] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (values, actions) => {
        const user = {
            user_email: values.email,
            user_password: values.password
        }

        axios.post('http://localhost:8080/users/login', user)
        .then((res) => {
            sessionStorage.setItem("token", res.data.token)
            navigate('/')
            actions.resetForm();
        })
        .catch((err) => {
            console.log(err);
            setFail(true);
        })

        
    }

    const basicSchema = yup.object().shape({
        email: yup.string().email('Please enter valid email').required('Required'),
        password: yup.string().min(5).matches().required('Required'),
    })


    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: basicSchema,
        onSubmit,
    });


    return (
      <div className="formContainer">

        

        <form className="userForm" onSubmit={handleSubmit}>
                <div className="formContainer-toggle">
                    <NavLink to="/login" activeclassname="formContainer-toggle__select-active" className="formContainer-toggle__select">
                        Sign In
                    </NavLink>
                    <NavLink to="/signup" activeclassname="formContainer-toggle__select-active" className="formContainer-toggle__select">
                        Sign Up
                    </NavLink>
                </div>     

                <div className="userForm-section">
                    <label className="userForm-section__label">
                    E-Mail Address
                    </label>
                    <input
                    type="email"
                    id="email"
                    className={errors.email && touched.email ? "input-error" :"userForm-section__input"}
                    placeholder="Enter your email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <p className="error">{errors.email}</p>}
                </div>

                <div className=" userForm-section">
                    <label className=" userForm-section__label">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    className=" userForm-section__input"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                </div>

                <div className=" userForm-section">
                    <button disabled={isSubmitting} type='submit' className=" userForm-section__button">Sign In</button>{" "}
                </div>
            </form>

        
      </div>
    );
}

export default Login;
