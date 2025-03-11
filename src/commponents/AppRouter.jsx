import {Routes , Route, Navigate} from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE, CHAT_ROUTE } from '../utils/consts';
import { Component, useContext } from 'react';
import { AuthContext } from '../main';
import { useAuthState } from 'react-firebase-hooks/auth';


export const AppRouter = () => {
    const { auth } = useContext(AuthContext);
    const [ user ] = useAuthState(auth)

    return user ?
    (
        <Routes >
            {privateRoutes.map(({id, path, component}) => 
                <Route key={id}  path={path} element={component}/>
            )}
             <Route path="*" element={<Navigate to={CHAT_ROUTE} />} />
        </Routes>
    ) :
    (
        <Routes >
        {publicRoutes.map(({id, path, component}) => 
            <Route key={id} path={path} element={component} />
        )}
         <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
    )
}   