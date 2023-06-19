import React, { useState,  } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createHotel, updateHotel } from '../../http/hotelsAPI';
import { getService } from './../../http/serviceAPI';

const AddPutHotelModal = ({ show, onHide, onAddOrPutHotel, edit, id, serviceId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [fetchOneService, setFetchOneService] = useState('');


    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchOneServiceF = async () => {
        try {
            const service = await getService('hotels')
            if (!service) {
                const service = await getService('Hotels')
                setFetchOneService(service)
            }
            setFetchOneService(service)
        } catch (e) {
            throw (e)
        }
    }

    const addHotel = async () => {
        fetchOneServiceF()
        console.log(file);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file);
        formData.append('type', type);
        formData.append('isFullBusy', false);
        formData.append('serviceId', fetchOneService.id);
        if (!edit) {
            try {
                await createHotel(formData)
                onAddOrPutHotel();
            } catch (e) {
                throw (e)
            }
        } else {
            try {
                await updateHotel(id, formData)
                onAddOrPutHotel();
            } catch (e) {
                throw (e)
            }
        }
        setTitle('');
        setDescription('');
        setSelectedType('');
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="color-black">
                <Modal.Title id="contained-modal-title-vcenter" className="color-black">
                    {!edit ? 'Добавить отель' : 'Редактировать отель'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите название отеля"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите описание отеля"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Тип отеля для ссылки"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />

                    <Form.Control className="mt-2" placeholder="Введите изображение услуги" onChange={selectFile} type="file" />
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

export default AddPutHotelModal;