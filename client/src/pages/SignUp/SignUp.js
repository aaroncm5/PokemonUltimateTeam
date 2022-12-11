import { Link, NavLink } from "react-router-dom";
import {useFormik} from 'formik';
import * as yup from 'yup';
import './SignUp.scss';

function SignUpForm() {

    const onSubmit = (values, actions) => {
        console.log('submitted')
        const user = {
            name: values.name,
            email: values.email,
            password: values.password
        }

        console.log(user)

        actions.resetForm();
    }

    const basicSchema = yup.object().shape({
        name: yup.string().required('Required'),
        email: yup.string().email('Please enter valid email').required('Required'),
        password: yup.string().min(5).matches().required('Required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'passwords must match').required('Required')
    })


    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: basicSchema,
        onSubmit,
    });

    console.log(errors)

    console.log(values.confirmPassword);

    return (
      <div className="formContainer">

        

        

            <form onSubmit={handleSubmit} className="userForm">

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
                    Full Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    className={errors.name && touched.name ? "input-error" :"userForm-section__input"}
                    placeholder="Enter your full name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.name && touched.name && <p className="error">{errors.name}</p>}
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
                <div className="userForm-section">
                    <label className="userForm-section__label">
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    className={errors.password && touched.password ? "input-error" :"userForm-section__input"}
                    placeholder="Enter your password"
                    // name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.password && touched.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="userForm-section">
                    <label className="userForm-section__label">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    id="confirmPassword"
                    className={errors.confirmPassword && touched.confirmPassword ? "input-error" :"userForm-section__input"}
                    placeholder="Confirm password"
                    // name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <div className="userForm-section">
                    <button disabled={isSubmitting} type='submit' className="userForm-section__button">Sign Up</button>{" "}
                </div>
            </form>
        
      </div>
    );
}

export default SignUpForm;
