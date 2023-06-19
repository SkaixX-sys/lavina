import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { createPrice, updatePrice } from '../../http/servicePriceAPI'

const CreateUpdatePrice = ({ show, onHide, onAddServiceType, edit, idTraffic }) => {
    const { type } = useParams()
    const [period, setPeriod] = useState('')
    const [weekendNewPrice, setWeekendNewPrice] = useState(null)
    const [weekdayNewPrice, setWeekdayNewPrice] = useState(null)


    const addServiceType = async () => {

        const requestData = {
            period: period,
            weekendNewPrice: weekendNewPrice,
            weekdayNewPrice: weekdayNewPrice,
            type: type
        };
        const requestJson = JSON.stringify(requestData);
        if (!edit) {
            try {
                await createPrice(requestJson).then(data => {
                })
                onAddServiceType()
            } catch (e) {
                alert(e.response.data.message)
            }
        } else {
            try {
                await updatePrice(idTraffic, requestJson).then(data => {
                })
                onAddServiceType()
            } catch (e) {
                alert(e.response.data.message)
            }
        }
        setPeriod('')
        setWeekendNewPrice('')
        setWeekdayNewPrice('')
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
                    {!edit ? 'Добавить тарифф' : 'Редактировать тарифф'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите период'
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите цену в будний день'
                        value={weekdayNewPrice}
                        onChange={e => setWeekdayNewPrice(e.target.value)}
                        type='number'
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите цену в выходной день'
                        value={weekendNewPrice}
                        onChange={e => setWeekendNewPrice(e.target.value)}
                        type='number'
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

export default CreateUpdatePrice