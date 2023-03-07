import './styles.css';
import logo from '../../assets/logo.svg';
import logout from '../../assets/logout.svg';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import ModalProfile from '../ModalProfile';
import { useEffect, useState } from 'react';

function Header({ showBack }) {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const [openModalProfile, setOpenModalProfile] = useState(false)


    function Logout() {
        localStorage.clear();
        navigate('/SignIn');
    }


    return (

        <div className='header-container'>
            <header>
                <img src={logo} alt='logo' />
                <div className='header-content'>

                    <img
                        onClick={() => setOpenModalProfile(true)}
                        src={profile}
                        alt='logo'
                    />

                    <span className='profile-text font-link-rubik'>{user.nome}</span>


                    <img onClick={Logout} src={logout} alt='logout' />
                </div>

                {openModalProfile &&
                    <ModalProfile
                        setOpenModalProfile={setOpenModalProfile}
                    />
                }


            </header>
        </div>
    )

};

export default Header;