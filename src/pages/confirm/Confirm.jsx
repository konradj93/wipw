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
  code: yup.string().required(),
});

const Confirm = _ =>{
  const [wentWrong, setWentWrong] = useState(null)
  const { register, handleSubmit, errors } = useForm({
    validationSchema: SignupSchema,
  });
  const submitConfirm = handleSubmit(({ email, code }) => {
    const confirmRequest = {
      username: email,
      confirmationCode: code
    }

    console.log(`User ${confirmRequest.username} is going to be confirmed`);
    auth.confirmAccount(confirmRequest)
      .then(result => {console.log('All is fine, user registered'); history.push('/login')})
      .catch(err => console.log('Sth is not YESS' + err.message))
  });

  return <div className="loginPage">
    <div className="container h-100">
      <div className="row h-100 align-items-center justify-content-center">
        <div className="col-md-8">
          <div className="loginFormWrapper">
            <form onSubmit={submitConfirm}>
              <div className="form-group">

                <label form={'email'} >Email</label>
                <input name="email" type="email" ref={register}  id="email"
                       className="form-control" data-testid = "email"/>
                { errors.email &&
                <ErrorComponent  message={ String(errors.email.message) }/>}
              </div>
              <div className="form-group">
                <label form={'code'}>Code</label>
                <input name="code" type='confirmCodeInput' ref={register} id={'code'}
                       className="form-control"/>
                { errors.code &&
                <ErrorComponent
                  message={ String(errors.code.message) }/> }
              </div>
              <button type="submit" data-testid = "submit" className={'btn btn-primary'} >
                Confirm
              </button>
            </form>
            { wentWrong && <ErrorComponent  message={wentWrong} />}
          </div>
        </div>
      </div>

    </div>
  </div>


};


export default Confirm;
