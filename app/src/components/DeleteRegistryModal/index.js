import './styles.css'


function DeleteRegistryModal({ handleDelete, setOpenDeleteRegistryModal }) {

    return (

        < div className="delete-registry-modal" >
            <span>Apagar item?</span>
            <div className='registry-buttons'>
                <button className='delete-yes' onClick={handleDelete}>Sim</button>
                <button className='delete-no' onClick={() => setOpenDeleteRegistryModal(false)}>Não</button>
            </div>
        </div >

    )
}

export default DeleteRegistryModal;