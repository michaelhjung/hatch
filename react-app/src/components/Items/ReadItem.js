import './Items.css';
import { Modal } from '../../context/Modal';
import { useState } from 'react';
import tools from '../../assets/icons/tools.png';

export default function ReadItem({ item }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='item-card' onClick={() => setShowModal(true)}>
                <span className='item-title'>{item.name}</span>
                <img className='item-card-img' src={item.img} onError={e => e.target.src=tools} />
            </div>
            {showModal && (
                <Modal
                    className='read-item-modal'
                    onClose={() => setShowModal(false)}
                >
                    <div className='item-details-container'>
                        <div className='item-details-name'>
                            {item.name}
                        </div>
                        <div className='item-img-container'>
                            <img className='item-details-img' src={item.img} onError={e => e.target.src=tools} />
                        </div>
                        <div className='item-details-serialid'>
                            serial id#: {item.serial_id}
                        </div>
                    </div>
                </Modal>
            )}
        </>
    )
}
