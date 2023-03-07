import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Main from './pages/Main';
import RegisterUser from './pages/RegisterUser';
import SignIn from './pages/SignIn';

function ProtectedRoutes({ redirectTo }) {
    const isAuthorized = localStorage.getItem("token");

    return isAuthorized ? <Outlet /> : <Navigate to={redirectTo} />
}


function MainRoutes() {

    return (
        <Routes>

            <Route redirectTo="/RegisterUser" >
                <Route path="SignIn" element={<SignIn />} />
            </Route>

            <Route redirectTo="/SignIn" >
                <Route path="/RegisterUser" element={<RegisterUser />} />
            </Route>

            <Route element={<ProtectedRoutes redirectTo="/" />}>
                <Route path="/Main" element={<Main />} />
            </Route>


        </Routes>
    )
}


export default MainRoutes;
