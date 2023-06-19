import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Image, Badge, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../main';
import { getNew } from '../http/newsAPI';
import AddPutNewsModal from '../components/modal/AddPutNewsModal';

const NewsPage = observer(() => {
  const { user } = useContext(Context)
  const { id } = useParams()
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [oneNew, setOneNew] = useState('')

  const fetchOneNew = async () => {
    try {
      const news = await getNew(id)
      setOneNew(news)
    } catch (e) {
      throw (e)
    }
  }

  useEffect(() => {
    fetchOneNew()
  }, [])
  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <Image src={import.meta.env.VITE_APP_API_URL + '/' + oneNew.image} fluid />
        </Col>
        <Col>
          <h2>{oneNew.title}</h2>
          <p>{oneNew.description}</p>
          <hr />
          <h4>Новость:</h4>
          <p>{oneNew.text}</p>
          {user.isAuth && <Button variant="primary" onClick={() => {
            setShowModal(true)
            setEdit(true)
          }}>Редактировать данные</Button>}
        </Col>
      </Row>
      <AddPutNewsModal show={showModal} onHide={() => setShowModal(false)} onAddOrPutNews={fetchOneNew} edit={edit} newsId={oneNew.id} />
    </Container>
  );
})

export default NewsPage