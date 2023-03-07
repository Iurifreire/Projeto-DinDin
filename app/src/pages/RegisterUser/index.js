import './styles.css';
import logo from '../../assets/logo.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  function handleChangeForm(event) {
    const value = event.target.value;

    setForm({ ...form, [event.target.name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.name || !form.address || !form.password || !form.confirmPassword) {
        return
      }

      if (form.password !== form.confirmPassword) {
        return
      }

      const response = await axios.post('http://localhost:3001/usuario', {
        nome: form.name,
        email: form.address,
        senha: form.password
      });

      setForm({
        name: '',
        address: '',
        password: '',
        confirmPassword: '',
      })

      if (response) {
        navigate('/SignIn');
      }



    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <>
      <div className='container-RegisterUser'>
        <div className='container-logo'>
          <img
            className='logo'
            src={logo}
            alt='logo'>
          </img>
        </div>
        <div className='container-Register'>
          <h1 className='Register-tittle'>
            Cadastre-se
          </h1>
          <form>
            <span className='input-tittle'>
              Nome
            </span>
            <input
              type='text'
              required
              value={form.name}
              name='name'
              onChange={(event) => handleChangeForm(event)}>
            </input>
            <span className='input-tittle'>
              E-mail
            </span>
            <input
              type='text'
              required
              value={form.address}
              name='address'
              onChange={(event) => handleChangeForm(event)}>
            </input>
            <span className='input-tittle'>
              Senha
            </span>
            <input
              type='password'
              required
              value={form.password}
              name="password"
              onChange={(event) => handleChangeForm(event)}>
            </input>
            <span className='input-tittle'>
              Confirmação de senha
            </span>
            <input
              type='password'
              required
              value={form.confirmPassword}
              name='confirmPassword'
              onChange={(event) => handleChangeForm(event)}>
            </input>
            <button className='btn-Register'
              onClick={(event) => handleSubmit(event)}>
              Cadastrar
            </button>
            <span className='span-navigate'>Já tem cadastro? <Link className='navigate-link' to='/SignIn'> Clique Aqui!</Link>
            </span>
          </form>
        </div>

      </div>
    </>
  )
};

export default RegisterUser;