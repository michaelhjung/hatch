import './Items.css'
import '../Forms.css';
import { Modal } from '../../context/Modal';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import * as itemActions from '../../store/items';
import tools from '../../assets/icons/tools.png';

export default function UpdateItemForm({ item, pencil }) {
    const [validationErrors, setValidationErrors] = useState([]);
    const [name, setName] = useState(item.name || '');
    const [serialId, setSerialId] = useState(item.serial_id || '');
    const [img, setImg] = useState(item.img || '');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

    console.log("ITEM:", item);

    useEffect(() => {
        setName(item.name);
        setSerialId(item.serial_id);
        setImg(item.img)

        return () => {
            setName('');
            setSerialId('');
            setImg('');
        }
    }, [showModal]);

    useEffect(() => {
        const errors = [];

        if (name.length && (name.length < 2 || name.length > 12)) errors.push("Item name must be between 2-12 characters.");
        if (serialId.length && (serialId.length < 2 || serialId.length > 20)) errors.push("Item serialId must be between 2-20 characters.");



        setValidationErrors(errors);
    }, [name, serialId, img]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newItem = await dispatch(itemActions.updateItem(item.id, { name, serial_id: serialId, img }));
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


    return (
        <>
            <img className='update-icon' src={pencil} alt="update" onClick={() => setShowModal(true)} />
            {showModal && (
                <Modal
                    className='update-item-modal'
                    onClose={() => {
                            setName('');
                            setSerialId('');
                            setValidationErrors([]);
                            setShowModal(false)
                        }
                    }
                >
                    <form className='update-item-form' onSubmit={submitHandler}>
                        <span className='update-item-name'>Update Your Item</span>
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
                        >Update Item</button>
                    </form>
                </Modal>
            )}
        </>
    )
}
