import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteType, getTypes } from '../http/typesAPI';
import { Table, Button, Container } from 'react-bootstrap';
import CreateUpdateType from '../components/modal/CreateUpdateType';


const Types = () => {
    const { type } = useParams();
    const [types, setTypes] = useState([]);
    const [showModal, setShowModal] = useState()
    const [edit, setEdit] = useState(false)
    const [typeId, setTypeId] = useState()

    const fetchTypes = async () => {
        try {
            const typesData = await getTypes(type);
            setTypes(typesData);
        } catch (error) {
            throw (error)
        }
    };
    useEffect(() => {
        fetchTypes();
    }, []);

    const handleAddType = () => {
        setEdit(false)
        setShowModal(true)
    };

    const handleEditType = (id) => {
        setTypeId(id)
        setEdit(true)
        setShowModal(true)
    };

    const handleDeleteType = async (id) => {
        try {
            await deleteType(id)
            fetchTypes()
        } catch (error) {
            throw (error)
        }
    };

    return (
        <Container>
            <Button variant="primary" onClick={handleAddType} className='mt-5 mb-4'>Добавить тип</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Тип</th>
                        <th>Относиться</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {types.map((type) => (
                        <tr key={type.id}>
                            <td>{type.item}</td>
                            <td>{type.relateTo}</td>
                            <td variant="secondary">
                                <Button variant="secondary" onClick={() => handleEditType(type.id)}>Редактировать</Button>{' '}
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteType(type.id)}>Удалить</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateUpdateType show={showModal} onHide={() => setShowModal(false)} onAddOrPutType={fetchTypes} edit={edit} typeId={typeId} relateTo={type} />
        </Container>
    );
};

export default Types;