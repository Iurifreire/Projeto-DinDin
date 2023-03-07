import './styles.css';
import closeModal from '../../assets/closeModal.svg';
import { useEffect, useState } from 'react';
import { axiosGet, axiosPost, axiosPut } from '../../service';


function Modal({ getTransactions, modalTitle, setOpenModal, transactionInfo }) {
    const [transactionType, setTransactionType] = useState('saida')
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({

        description: transactionInfo?.descricao ?? '',
        value: transactionInfo?.valor ?? '',
        date: transactionInfo?.data ?? '',
        category: transactionInfo?.categoria_id ?? 0,
    });

    async function listOptionsCategories() {
        const result = await axiosGet('categoria')

        setCategories(result.data)
    };


    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    function handleCategory(e) {
        const category = categories.find((category) => {
            return category.id === Number(e.target.value);
        })

        setForm({ ...form, category: category.id })
    }

    useEffect(() => {
        listOptionsCategories()
    }, []);


    async function handleUpdateTransaction(id) {
        try {
            const payloadResult = {
                tipo: transactionType,
                descricao: form.description,
                valor: form.value,
                data: form.date,
                categoria_id: form.category ? form.category : categories[0].id
            }
            await axiosPut(`transacao/${id}`, { ...payloadResult })
            await getTransactions()

        } catch (error) {
            console.log(error.message)
        }

    }

    async function handleAddTransaction() {

        const payloadResult = {
            tipo: transactionType,
            descricao: form.description,
            valor: form.value,
            data: form.date,
            categoria_id: form.category ? form.category : categories[0].id
        }

        try {


            const register = await axiosPost('transacao',
                payloadResult
            )

            await getTransactions()


            setForm({
                description: '',
                value: '',
                date: '',
                category: 0,
            });

            setOpenModal(false)

        } catch (error) {
            console.log(error.message)
        }

    }

    async function getTransaction() {

        try {

            const result = await axiosGet('transaction')

            setForm({
                description: result.nome,
                value: result.valor,
                date: result.data,
                category: result.categoria
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (modalTitle === 'Editar Registro') {
            handleUpdateTransaction(transactionInfo.id)
        } else {
            handleAddTransaction()
        }
    }

    useEffect(() => {

        if (modalTitle === 'Editar Registro') {
            getTransaction()
        }
    }, );


    return (


        < div className="container-modal" >

            <div className='modal'>
                <h1>{modalTitle}<img onClick={() => setOpenModal(false)}
                    className='close-modal-icon'
                    src={closeModal}
                    alt='close modal' />
                </h1>

                <div className='register-buttons'>
                    <button
                        onClick={() => setTransactionType('entrada')}
                        className={`disable-button ${transactionType === 'entrada' && 'flow-in-button'}`} >Entrada</button>

                    <button
                        onClick={() => setTransactionType('saida')}
                        className={`disable-button ${transactionType === 'saida' && 'flow-out-button'}`}>Saída</button>
                </div>

                <form className='form-modal' onSubmit={handleSubmit}>
                    <h3>Valor</h3>
                    <input
                        value={form.value}
                        name={'value'}
                        onChange={handleChange}
                        type='number'
                    />

                    <h3>Categoria</h3>
                    <label>
                        <select
                            value={form.category}
                            onChange={handleCategory}
                        >
                            {categories.map(category => (
                                <option
                                    key={category.id}
                                    value={category.id}>{category.descricao}
                                </option>
                            ))}
                        </select>
                    </label>

                    <h3>Data</h3>
                    <input
                        value={form.date}
                        name={'date'}
                        onChange={handleChange}
                        type='text'
                    />

                    <h3>Descrição</h3>
                    <input
                        value={form.description}
                        name={'description'}
                        onChange={handleChange}
                        type='text'
                    />
                    <button className='confirm-button font-link-rubik'>Confirmar</button>

                </form>

            </div>

        </div >


    );
}

export default Modal;
