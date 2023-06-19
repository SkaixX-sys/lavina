import React, { useState,  } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createInfoPages, updateInfoPages } from '../../http/infoPageAPI';

const InfoPageModal = ({ show, onHide, onAdd, edit, id, typeInfo }) => {
    const [description, setDescription] = useState('');
    const [type, setType] = useState(typeInfo);
    const [infoId, setInfoId] = useState('');
    const [data, setData] = useState('');


    const addHotel = async () => {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('type', type);
        formData.append('infoId', infoId);
        if (!edit) {
            try {
                await createInfoPages(formData)
                onAdd();
            } catch (e) {
                throw (e)
            }
        } else {
            try {
                await updateInfoPages(id, formData)
                onAdd();
            } catch (e) {
                throw (e)
            }
        }
        setType('');
        setDescription('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="color-black">
                <Modal.Title id="contained-modal-title-vcenter" className="color-black">
                    {!edit ? 'Добавить описание' : 'Редактировать описание'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите описание"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type='textarea'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="outline-danger" onClick={onHide} style={{}}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addHotel} style={{ cursor: 'pointer' }}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoPageModal;