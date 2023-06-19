import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { createNews, updateNews } from '../../http/newsAPI';

const AddPutNewsModal = ({ show, onHide, onAddOrPutNews, edit, newsId }) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const { id } = useParams()


    const selectFile = (e) => {
        setFile(e.target.files[0]);
    };



    const addNews = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', title);
        formData.append('image', file);
        formData.append('description', description);
        formData.append('infoId', 6);
        formData.append('text', text);

        if (!edit) {
            try {
                await createNews(formData)
                onAddOrPutNews();
            } catch (e) {
                throw (e)
            }
        } else {
            try {
                await updateNews(newsId, formData)
                onAddOrPutNews();
            } catch (e) {
                throw (e)
            }
        }
        setTitle('');
        setDescription('');
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton className="color-black">
                <Modal.Title id="contained-modal-title-vcenter" className="color-black">
                    {!edit ? 'Добавить новость' : 'Редактировать новость'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите название новости"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Control
                        className="mt-2"
                        placeholder="Введите описание новости"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {id && (
                        <>
                            <Form.Control
                                className="mt-2"
                                placeholder="Введите содержание новости"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </>
                    )}
                    <Form.Control className="mt-2" placeholder="Изображение" onChange={selectFile} type="file" />
                </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="outline-danger" onClick={onHide} style={{}}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={addNews} style={{ cursor: 'pointer' }}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPutNewsModal;