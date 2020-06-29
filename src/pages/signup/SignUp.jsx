import React, {useState} from 'react';
import AWS from 'aws-sdk/global';
import history from "../../history";

import {AuthorizationService} from '../../lib/security/authorization.service';
import {authCfg, defaultRegion} from '../../env'


import './signup.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

AWS.config.region = defaultRegion;

const auth = new AuthorizationService(authCfg, AWS.config);
const SignupSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  fullName: yup.string().required(),
  password: yup.string().min(4, 'Your password should be a minimum of 4 characters')
});

const SignUp = _ =>{
  const [wentWrong, setWentWrong] = useState(null)
  const { register, handleSubmit, errors } = useForm({
    validationSchema: SignupSchema,
  });
  const submitSignUp = handleSubmit(({ email, password, fullName }) => {
    const registerRequest = {
      email: email,
      password: password,
      fullName: fullName
    }
    auth.registerUser(registerRequest)
      .then(result => { console.log('All is fine, user registered'); history.push('/confirm')} )
      .catch(err => { console.log('Sth is not YESS' + err.message); setWentWrong('something wnet wrong')})
  });

  return <div className="loginPage">
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="loginFormWrapper">
            <form onSubmit={submitSignUp}>
              <div className="form-group">

                <label form={'email'} >Login</label>
                <input name="email" type="email" ref={register}  id="email"
                       className="form-control" data-testid = "email"/>
                { errors.email &&
                <ErrorComponent  message={ String(errors.email.message) }/>}
              </div>
              <div className="form-group">
                <label form={'password'}>Password</label>
                <input name="password" type='password' ref={register} id={'password'}
                       className="form-control"  data-testid = "password"/>
                { errors.password &&
                <ErrorComponent
                  message={ String(errors.password.message) }/> }
              </div>
              <div className="form-group">
                <label form={'fullName'}>Full Name</label>
                <input name="fullName" type='fullName' ref={register} id={'fullName'}
                       className="form-control"  data-testid = "fullName"/>
                { errors.fullName &&
                <ErrorComponent
                  message={ String(errors.password.message) }/> }
              </div>
              <button type="submit" data-testid = "submit" className={'btn btn-primary'} >
                Register
              </button>
            </form>
            { wentWrong && <ErrorComponent  message={wentWrong} />}
          </div>
        </div>
      </div>

    </div>
  </div>


};


export default SignUp;
