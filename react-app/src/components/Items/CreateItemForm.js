import './Items.css'
import '../Forms.css';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as itemActions from '../../store/items';
import tools from '../../assets/icons/tools.png';

export default function CreateItemForm({ add }) {
    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState('');
    const [serialId, setSerialId] = useState('');
    const [img, setImg] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newItem = await dispatch(itemActions.createItem({ name, serial_id: serialId, img }));
            if (newItem) {
                setName('');
                setSerialId('');
                setImg('');
                setValidationErrors([]);
                setShowModal(false)
            }
        }

        catch (res) {
            // setValidationErrors(Object.values(data));
            console.log("ANY ERRORS?", res);
        }
    }

    useEffect(() => {
        const errors = [];

        if (name.length && (name.length < 2 || name.length > 12)) errors.push("Item name must be between 2-12 characters.");
        if (serialId.length && (serialId.length < 2 || serialId.length > 20)) errors.push("Item serialId must be between 2-20 characters.");



        setValidationErrors(errors);
    }, [name, serialId, img]);


    return (
        <>
            <img className='add-icon' src={add} alt="add" width='50px' onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal
                    className='create-item-modal'
                    onClose={() => {
                            setName('');
                            setSerialId('');
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='create-item-form' onSubmit={submitHandler}>
                        <span className='create-item-name'>Make an Item</span>
                        {validationErrors.length > 0 && (
                            <div className='error-list'>
                                {validationErrors.map((error, ind) => (
                                    <div className='error-list-item' key={ind}>{error}</div>
                                ))}
                            </div>
                        )}
                            <input
                                type='text'
                                name='name'
                                placeholder='item name*'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                required={true}
                                className='form-field-input first-field-input'
                            />
                            <input
                                type='text'
                                name='serialId'
                                placeholder='item serial id*'
                                onChange={e => setSerialId(e.target.value)}
                                value={serialId}
                                required={true}
                                className='form-field-input'
                            />
                            <input
                                type='text'
                                name='itemImg'
                                placeholder='item img url*'
                                onChange={e => setImg(e.target.value)}
                                value={img}
                                required={true}
                                className='form-field-input last-field-input'
                            />
                            {(name.length === 0 || serialId.length === 0 || img.length === 0) && (
                                <small className='req-text' >*All fields are required.</small>
                            )}
                            {img && (
                                <div className='item-img-prev-container'>
                                    <span>Item Picture Preview:</span>
                                    <img className='item-img-preview' src={img} alt="item" onError={e => e.target.src=tools} />
                                </div>
                            )}
                        <button
                            className='submit-button'
                            type='submit'
                            disabled={validationErrors.length}
                        >Create Item</button>
                    </form>
                </Modal>
            )}
        </>
    )
}
