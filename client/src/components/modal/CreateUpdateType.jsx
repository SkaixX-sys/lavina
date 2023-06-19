import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { createType, updateType } from '../../http/typesAPI'

function CreateUpdateType({ show, onHide, onAddOrPutType, edit, typeId, relateTo }) {
    const [type, setType] = useState('')
    const [relate, setRelate] = useState('')

    const addServiceType = async () => {
        const data = {
            item: type,
            relateTo: relateTo
          };
          
          const jsonData = JSON.stringify(data);
        if (!edit) {
            try {
                await createType(jsonData)
                onAddOrPutType()
            } catch (e) {
                alert(e.response.data.message)
            }
        } else {
            try {
                await updateType(typeId, jsonData).then(data => {
                })
                onAddOrPutType()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
        setType('')
        setRelate('')
        onHide()
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
                    {!edit ? 'Добавить тип' : 'Редактировать тип'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите тип'
                        value={type}
                        onChange={e => setType(e.target.value)}
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

export default CreateUpdateType