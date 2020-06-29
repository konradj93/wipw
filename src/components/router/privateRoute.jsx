import React, {useContext} from 'react';
import { Redirect, Route} from 'react-router';
import { useEffect } from 'react';
import history from '../../history';
import UserContext from "../../context/userContext";



export const PrivateRoute = props => {
	const {isAuth} = useContext(UserContext);
	let redirectPath = '';
	useEffect(()=>{
		if(!isAuth){
			history.push('/login');
		}
	}, [isAuth]);

	if (redirectPath) {
		const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
		return <Route {...props} component={renderComponent} render={undefined} />;
	} else {
		return <Route {...props} />;
	}
};

export default PrivateRoute;
