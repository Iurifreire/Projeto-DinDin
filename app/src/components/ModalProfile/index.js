import './styles.css';
import closeModal from '../../assets/closeModal.svg';
import { api } from '../../pages/Main';
import { useState, useEffect } from 'react';
import { axiosPut, axiosGet } from '../../service';

function ModalProfile({ setOpenModalProfile }) {
    const [user, setUser] = useState();
    const [userForm, setUserForm] = useState({

        name: '',
        email: '',
        password: ''
    });


    async function getUser() {
        const result = await axiosGet('usuario')
        setUserForm({
            ...result.data,
            name: result.data.nome,
        })
    }


    async function updateLoggedUser(e) {
        e.preventDefault()
        try {

            await axiosPut('usuario', {
                nome: userForm.name,
                email: userForm.email,
                senha: userForm.password
            })


        } catch (error) {
            console.log(error.message)
        }
    }

    function handleChange(e) {
        setUserForm({ ...userForm, [e.target.name]: e.target.value })

    }


    useEffect(() => {
        getUser()
    }, []);


    return (

        <div className='container-modal-profile'>

            <div className='modal-header'>
                <h1>Editar Perfil <img onClick={() => setOpenModalProfile(false)}
                    className='close-modal-icon'
                    src={closeModal}
                    alt='close modal' />
                </h1>

                <form className='form-profile' onSubmit={updateLoggedUser}>
                    <h3>Nome</h3>
                    <input
                        value={userForm.name}
                        name={'name'}
                        onChange={handleChange}
                        type='name'
                    />
                    <h3>Email</h3>
                    <input
                        value={userForm.email}
                        name={'email'}
                        onChange={handleChange}
                        type='email'
                    />
                    <h3>Senha</h3>
                    <input
                        value={userForm.password}
                        name={'password'}
                        onChange={handleChange}
                        type='password'
                    />

                    <h3>Confirmação de Senha</h3>
                    <input type='password' />

                    <button className='btn-modal-profile'>Confirmar</button>
                </form>

            </div>

        </div>

    )

}

export default ModalProfile;