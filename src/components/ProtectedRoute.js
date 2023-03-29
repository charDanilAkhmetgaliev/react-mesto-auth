import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import {AppContext} from "../contexts/AppContext.js";

const ProtectedRoute = ({ element: Component, ...props }) => {
	const value = useContext(AppContext);
	return value.loggedIn ? (
		<Component {...props} />
	) : (
		<Navigate to='/sign-in' replace />
	);
};

export default ProtectedRoute;
