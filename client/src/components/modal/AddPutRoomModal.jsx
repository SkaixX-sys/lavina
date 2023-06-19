import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getHotel } from '../../http/hotelsAPI';
import { createRoom, updateRoom } from '../../http/roomsAPI';
import { useParams } from 'react-router-dom';

const AddPutRoomModal = ({ show, onHide, onAddOrPutRoom, edit, roomId, typeHotel }) => {
    const [title, setTitle] = useState('');
    const [size, setSize] = useState('');
    const [weekendOldPrice, setWeekendOldPrice] = useState('');
    const [weekdayOldPrice, setWeekdayOldPrice] = useState('');
    const [seats, setSeats] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const { id } = useParams()
    const [oneHotel, setOneHotel] = useState('')


    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };
    useEffect(() => {
        const fetchOneHotel = async () => {
            try {
                const hotel = await getHotel(typeHotel)
                setOneHotel(hotel.id);
            } catch (e) {
                throw (e)
            }
        }
        fetchOneHotel()
    }, [show]);


    const addHotel = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', file);
        formData.append('description', description);
        formData.append('size', size);
        formData.append('weekendOldPrice', weekendOldPrice);
        formData.append('weekdayOldPrice', weekdayOldPrice);
        formData.append('seats', seats);
        formData.append('typeOfHotel', typeHotel);
        formData.append('isBusy', false);
        formData.append('hotelId', oneHotel);
        if (id) {
            try {
                await updateRoom(roomId, formData)
                onAddOrPutRoom();
            } catch (e) {
                throw (e)
            }
        }
        if (!edit && !id) {
            try {
                await createRoom(typeHotel, formData)
                onAddOrPutRoom();
            } catch (e) {
                throw (e)
            }
        } else {
            try {
                await updateRoom(roomId, formData)
                onAddOrPutRoom();
            } catch (e) {
                throw (e)
            }
        }
        setTitle('');
        setSize('');
        setWeekendOldPrice('');
        setWeekdayOldPrice('');
        setSeats('');
        setDescription('');
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="color-black">
                <Modal.Title id="contained-modal-title-vcenter" className="color-black">
                    {!edit ? 'Добавить комнату' : 'Редактировать комнату'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите комнаты название комнаты"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите описание комнаты"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {!edit && (
                        <>

                            <Form.Control
                                className="mt-2"
                                placeholder="Введите размер комнаты"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                type='number'
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите количество мест в комнате"
                                value={seats}
                                type='number'
                                onChange={(e) => setSeats(e.target.value)}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите стоимость аренды в день по праздникам и выходным"
                                value={weekendOldPrice}
                                type='number'
                                onChange={(e) => setWeekendOldPrice(e.target.value)}
                            />
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите стоимость аренды в день по будням"
                                value={weekdayOldPrice}
                                type='number'
                                onChange={(e) => setWeekdayOldPrice(e.target.value)}
                            />
                        </>
                    )}
                    <Form.Control className="mt-2" placeholder="Введите изображение комнаты" onChange={selectFile} type="file" />
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

export default AddPutRoomModal;