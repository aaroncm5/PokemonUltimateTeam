import { Link, NavLink } from "react-router-dom";
import {Formik, Form, Field, ErrorMessage} from 'formik';
// import './Login.scss';

function Login() {

    const user = {
      email: "",
      password: ""
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  

  const handleChange = () => {
    // let target = event.target;
    // let value = target.type === "checkbox" ? target.checked : target.value;
    // let name = target.name;

    // this.setState({
    //   [name]: value
    // });
  }

  const handleSubmit = () => {
    // event.preventDefault();

    // console.log("The form was submitted with the following data:");
    // console.log(this.state);
  }

    return (
      <div className="formContainer">

        <div className="formContainer-toggle">
              <NavLink to="/login" activeclassname="formContainer-toggle__select-active" className="formContainer-toggle__select">
                Sign In
              </NavLink>
              <NavLink to="/signup" activeclassname="formContainer-toggle__select-active" className="formContainer-toggle__select">
                Sign Up
              </NavLink>
        </div>     

        <Formik
            initialValues= {{email: '', password: ''}}
            validate={values => {
                const errors = {};
                if(!values.email) {
                    errors.email = 'Required';
                } else if (
                    !/^[A-Z0-9]+@[A-Z0-9.-]+[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid Email';
                }
                return errors;
            }}
            onSubmit ={(values, {setSubmitting}) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            <Form className="userForm" onSubmit={handleSubmit}>
                <div className=" userForm-section">
                    <label className=" userForm-section__label" htmlFor="email">
                    E-Mail Address
                    </label>
                    <Field
                    type="email"
                    id="email"
                    className=" userForm-section__input"
                    placeholder="Enter your email"
                    name="email"
                    // value={user.email}
                    // onChange={handleChange}
                    />
                    <ErrorMessage name='email' component='div'/>
                </div>

                <div className=" userForm-section">
                    <label className=" userForm-section__label" htmlFor="password">
                    Password
                    </label>
                    <Field
                    type="password"
                    id="password"
                    className=" userForm-section__input"
                    placeholder="Enter your password"
                    name="password"
                    // value={user.password}
                    // onChange={handleChange}
                    />
                    <ErrorMessage name='password' component='div'/>
                </div>

                <div className=" userForm-section">
                    <button className=" userForm-section__button">Sign In</button>{" "}
                    <Link to="/" className=" userForm-sectionLink">
                    Create an account
                    </Link>
                </div>
            </Form>
        </Formik>

        
      </div>
    );
}

export default Login;
