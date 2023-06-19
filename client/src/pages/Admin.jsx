import React from 'react'
import { NavLink } from 'react-router-dom';
import { ADMIN_REVIEWS_ROUTER, TYPES_ROUTER } from '../utils/consts';
import { Container, Button } from 'react-bootstrap';

function Admin() {
  return (
    <Container className='d-flex justify-content-center mt-5'>
      
      <Button variant='outline-secondary' className='m-3'>
        <NavLink to={TYPES_ROUTER + '/serviceTypes'} className='color-black'>Типы услуг</NavLink>
      </Button>
      <Button variant='outline-secondary' className='m-3'>
        <NavLink to={TYPES_ROUTER + '/infoTypes'} className='color-black'>Типы информации</NavLink>

      </Button>


    </Container>
  )
}

export default Admin