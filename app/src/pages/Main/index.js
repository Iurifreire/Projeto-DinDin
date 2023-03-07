import './styles.css';
import { format } from 'date-fns';

import ptbr from 'date-fns/locale/pt';
import Header from '../../components/Header';
import dateFilter from '../../assets/dateFilter.svg';
import editLogo from '../../assets/editLogo.svg';
import deleteLogo from '../../assets/deleteLogo.svg';
import filterLogo from '../../assets/filterLogo.svg';
import Modal from '../../components/Modal';
import DeleteRegistryModal from '../../components/DeleteRegistryModal';
import FilterCategories from '../../components/FilterCategories';
import { useState, useEffect } from 'react';
import { axiosDelete, axiosGet } from '../../service';

function Main() {

    const [sortDate, setSortDate] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState()
    const [openDeleteRegistryModal, setOpenDeleteRegistryModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [resumeBalance, setResumeBalance] = useState([]);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    useEffect(() => {

        getTransactions();
        getResume()
    }, [])

    async function getTransactions() {
        let allTransactions = await axiosGet('transacao');

        setTransactions(allTransactions.data);

    };

    async function handleDelete(id) {


        try {

            await axiosDelete(`transacao/${id}`)

            const listTransactions = [...transactions]
            const filterTransactions = listTransactions.filter((transaction) => {
                return transaction.id !== id;
            })

            setTransactions(filterTransactions);

        } catch (error) {
            console.log(error.message)
        }
    }

    async function getResume() {

        try {
            const result = await axiosGet('transacao/extrato')

            setResumeBalance(result.data)


        } catch (error) {
            console.log(error.message)
        }
    }

    function sortByDate() {
        const result = [...transactions]

        result.sort((a, b) => {
            const dateA = new Date(a.data);
            const dateB = new Date(b.data);

            return sortDate ? +dateA - +dateB : +dateB - +dateA;
        })

        setTransactions(result);

    }



    return (
        <>
            <Header />
            <div className='container-main'>

                <div className='container-filters'>
                    <button
                        className='filter-button font-link'
                        onClick={() => { setOpenFilter(!openFilter) }}
                    >
                        <img src={filterLogo} alt='filter button'
                        />Filtrar
                    </button>
                    {
                        openFilter &&
                        <FilterCategories
                            transactions={transactions}
                            setTransactions={setTransactions}
                        />
                    }
                </div>

                {openModal &&
                    <Modal
                        getTransactions={getTransactions}
                        modalTitle={'Adicionar Registro'}
                        setOpenModal={setOpenModal}
                    />
                }

                {openModalEdit &&
                    <Modal
                        modalTitle={'Editar Registro'}
                        setOpenModal={setOpenModalEdit}
                        transactionInfo={selectedTransaction}
                        getTransactions={getTransactions}
                    />
                }

                <div className='container'>

                    <div className='container-table font-link'>
                        <div className='header-columns'>
                            <strong>Data <img
                                onClick={() => {
                                    setSortDate(!sortDate)
                                    sortByDate()
                                }
                                }
                                src={dateFilter}
                                alt='Filter logo'
                            />
                            </strong>
                            <strong>Dia da semana</strong>
                            <strong>Descrição</strong>
                            <strong>Categoria</strong>
                            <strong className='tittle-value'>Valor</strong>
                        </div>

                        <div className='main-table'>
                            {transactions.map((transaction) => (

                                <div className='table-objects' key={transaction.id}>

                                    <b>{format(new Date(transaction.data), 'dd/MM/yyyy')}</b>
                                    <p>{format(new Date(transaction.data), 'EEEE', {
                                        locale: ptbr
                                    }).replace('-feira', '')}</p>
                                    <p>{transaction.descricao ? transaction.descricao : '-'}</p>
                                    <p>{transaction.categoria_nome}</p>
                                    <p className={transaction.tipo === 'entrada' ? 'p-value-enter' : 'p-value-exit'} >R$ {transaction.valor / 100}</p>
                                    <p className='row-icons'>
                                        <img className='edit-logo'
                                            onClick={() => {
                                                setSelectedTransaction(transaction)
                                                setOpenModalEdit(true)
                                            }}
                                            src={editLogo}
                                            alt='Edit logo'
                                        />

                                        <img className='delete-logo'
                                            onClick={() => setOpenDeleteRegistryModal(transaction.id)}
                                            src={deleteLogo}
                                            alt='Trash logo'
                                        />

                                        {openDeleteRegistryModal === transaction.id &&
                                            <DeleteRegistryModal
                                                handleDelete={() => handleDelete(transaction.id)}
                                                setOpenDeleteRegistryModal={setOpenDeleteRegistryModal}
                                            />
                                        }

                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>

                    <div>
                        <div className='container-resume font-link-rubik'>
                            <h1>Resumo</h1>
                            <div className='resume-table'>
                                <div className='resume-table-item'>
                                    <h3>Entradas</h3>
                                    <h4 className='value-flowIn'> R$ {resumeBalance.entrada / 100}</h4>
                                </div>

                                <div className='resume-table-item'>
                                    <h3>Saídas</h3>
                                    <h4 className='value-flowOut'> R$ {resumeBalance.saida / 100}</h4>
                                </div>


                                <hr className='line' />


                                <div className='resume-table-balance'>
                                    <strong>Saldo</strong>
                                    <h4 className={`${resumeBalance.entrada - resumeBalance.saida > 0 ? 'value-total-positive' : 'value-total-negative'}`}>
                                        R$ {((resumeBalance.entrada / 100) - (resumeBalance.saida / 100)).toFixed(2)}</h4>
                                </div>

                            </div>

                        </div>
                        <button className='add-register-button font-link-rubik' onClick={() => setOpenModal(true)}>Adicionar Registro</button>
                    </div>
                </div>

            </div>
        </>
    )
};

export default Main;