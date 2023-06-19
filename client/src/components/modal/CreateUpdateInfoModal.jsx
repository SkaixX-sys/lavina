import React, { useEffect, useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { createInfo, updateInfo } from '../../http/infoAPI'
import { getTypes } from '../../http/typesAPI'

function CreateUpdateInfoModal({ show, onHide, onAddServiceType, edit, id }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [selectedType, setSelectedType] = useState('');
    const [typesData, setTypesData] = useState([]);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const types = await getTypes('infoTypes');
                setTypesData(types);
            } catch (e) {
                throw e;
            }
        };
        fetchTypes();
    }, []);

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addServiceType = async () => {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('image', file)
        formData.append('type', selectedType)
        formData.append('dataTypeId', typesData[0].id);
        if (!edit) {
            try {
                await createInfo(formData).then(data => {
                })
                onAddServiceType()
            } catch (e) {
                alert(e.response.data.message)
            }
        } else {
            try {
                await updateInfo(id, formData).then(data => {
                })
                onAddServiceType()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
        setTitle('')
        setDescription('')
        onHide()
        setFile(null)
        setSelectedType('')
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton className='color-black'>
                <Modal.Title id="contained-modal-title-vcenter" className='color-black'>
                    {!edit ? 'Добавить информацию' : 'Редактировать информацию'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите название информации'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите описание информации'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Form.Control className="mt-2" as="select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                        <option value="" style={{ color: 'black' }}>Выберите тип</option>
                        {typesData.map((type) => (
                            <option key={type.id} style={{ color: 'black' }} value={type.item}>
                                {type.item}
                            </option>
                        ))}
                    </Form.Control>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите изображение для информации'
                        onChange={selectFile}
                        type='file'
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant='outline-danger' onClick={onHide} style={{}}>Закрыть</Button>
                <Button variant='outline-success' onClick={addServiceType} style={{ cursor: "pointer" }}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateUpdateInfoModal