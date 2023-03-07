import './styles.css';
import logo from '../../assets/logo.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: '',
    password: ''
  });

  function handleChangeForm(event) {
    const value = event.target.value;

    setForm({ ...form, [event.target.name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (!form.address || !form.password) {
        return
      }

      const response = await axios.post("http://localhost:3001/login", {
        email: form.address,
        senha: form.password
      });

      setForm({
        address: '',
        password: ''
      });



      localStorage.setItem('idUser', response.data.usuario.id);
      localStorage.setItem('token', response.data.token);

      localStorage.setItem('user', JSON.stringify(response.data.usuario));


      if (response) {
        navigate('/Main');
      }

    } catch (error) {
      console.log(error.message);
    }

  }



  return (
    <>
      <div className='container-all-page'>
        <div className='container-logo'>
          <img
            className='logo'
            src={logo}
            alt='logo'>
          </img>
        </div>
        <section className='container-to-Register'>
          <h1>
            Controle suas <span>finanças</span>, sem planilha chata.
          </h1>
          <p>
            Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.
          </p>
          <button className='btn-to-Register'><Link to='/RegisterUser' className='navigate-linktxt'>Cadastrar-se</Link></button>
        </section>
        <section className='container-SignIn'>
          <h1 className='SignIn-tittle'>
            Login
          </h1>
          <form>
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
            <button
              className='btn-enter'
              onClick={(event) => handleSubmit(event)}
            >
              Entrar
            </button>
          </form>
        </section>

      </div>
    </>
  )
};

export default SignIn;