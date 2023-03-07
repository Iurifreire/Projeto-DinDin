import './styles.css';
import { useEffect, useState } from 'react';
import { axiosGet } from '../../service';

function FilterCategories({ transactions, setTransactions }) {
  const [categories, setCategories] = useState([]);
  const [filterArray, setFilterArray] = useState([]);
  const [queryFiltersearch, setQueryFiltersearch] = useState('');

  async function handleGetCategories(category) {


    setFilterArray([...filterArray, category]);
    categories.forEach((element) => {
      if (element.descricao === category) {
        element.selected = true;
      }

    });



    try {

      let queryFilter = '';

      filterArray.forEach((element) => {
        queryFilter += `&filtro[]=${element}`;
      });


      setQueryFiltersearch(queryFilter);



    } catch (error) {
      console.log(error.message)
    }

  }

  async function renderFilterCategories() {


    try {

      let transactionsFilter = await axiosGet(`transacao?/${queryFiltersearch.replace('&', '')}`)

      setTransactions(transactionsFilter.data)

    } catch (error) {
      console.log(error.message)
    }
  }


  async function clearFilterCategories() {
    let transactionsFilter = await axiosGet('transacao');

    setTransactions(transactionsFilter.data)
    setQueryFiltersearch('');
  }


  useEffect(() => {
    async function getCategories() {
      const allCategories = await axiosGet('categoria');
      allCategories.data.forEach((category) => {
        category.selected = false;
      })




      setCategories(allCategories.data);
    };

    getCategories();
  }, [])


  return (
    <>
      <div className='container-filter'>
        <h1>Categoria</h1>
        <div className='container-filters'>
          {
            categories.map((categorie) => {
              return (


                < button
                  className={categorie.selected ? 'btn-categorie is-selected' : 'btn-categorie'}
                  onClick={() => handleGetCategories(categorie.descricao)}
                >{categorie.descricao} <span>{categorie.selected ? '-' : '+'}</span></button>
              )
            })
          }
        </div>
        <button onClick={() => clearFilterCategories()} className='clear-filters'>Limpar Filtros</button>
        <button onClick={() => renderFilterCategories()} className='aply-filters'>Aplicar Filtros</button>
      </div>
    </>
  )
}

export default FilterCategories;