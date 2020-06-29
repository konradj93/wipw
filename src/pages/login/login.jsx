import React, {useState, useContext} from 'react';
import history from "../../history";


import {AuthorizationService} from '../../lib/security/authorization.service';
import {authCfg, defaultRegion} from '../../env'
import './login.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import UserContext from '../../context/userContext';

import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import AWS from "aws-sdk/global";

AWS.config.region = defaultRegion;

const auth = new AuthorizationService(authCfg, AWS.config);
const LoginSchema = yup.object().shape({
	email: yup
		.string()
		.email()
		.required(),
	password: yup.string().min(4, 'Your password should be a minimum of 4 characters'),
});

const Login = _ =>{
	const {setAuth} = useContext(UserContext);
	const [wentWrong, setWentWrong] = useState(null)
	const { register, handleSubmit, errors } = useForm({
		validationSchema: LoginSchema,
	});
	const submitLogin = handleSubmit(({ email, password }) => {
		const loginRequest = {
			username: email,
			password: password
		}

		auth.login(loginRequest)
			.then(result => {auth.refreshSession(); setAuth(true)})
			.then(user => { history.push('/dashboard')})
			.catch(err => console.log('access deny' + err.message))
	});

	const onKeyPress = (e) => {
		if(e.which === 13) {
		  submitLogin();
		}
		else return e;
	  }

	return <div className="loginPage">
		<div className="container h-100">
			<div className="row h-100 align-items-center justify-content-center">
				<div className="col-md-8">
					<div className="loginFormWrapper">
						<form onSubmit={submitLogin}>
							<div className="form-group">

								<label form={'emailLogin'} >Login</label>
								<input name="email" type="email" ref={register}  id="emailLogin"
											 className="form-control" data-testid = "email"/>
								{ errors.email &&
								<ErrorComponent  message={ String(errors.email.message) }/>}
							</div>
							<div className="form-group">
								<label form={'loginPassword'}>Password</label>
								<input name="password" type='password' ref={register} id={'loginPassword'}
											 className="form-control" onKeyPress={onKeyPress} data-testid = "password"/>
								{ errors.password &&
								<ErrorComponent
																message={ String(errors.password.message) }/> }
							</div>
							<button type="submit" data-testid = "submit" className={'btn btn-primary'} >
								Log In
							</button>
						</form>
						{ wentWrong && <ErrorComponent  message={wentWrong} />}
					</div>
				</div>
			</div>

		</div>
	</div>
	
			
};


export default Login;
