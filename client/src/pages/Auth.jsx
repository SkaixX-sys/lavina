import React, { useContext, useEffect, useState } from 'react'
import { Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LOGIN_ROUTER, MAIN_ROUTER, REGISTRATION_ROUTER } from '../utils/consts'
import { registration, signIn } from '../http/userAPI'
import { Context } from '../main'
import { observer } from 'mobx-react-lite';
const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTER

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data
      if (isLogin) {
        data = await signIn(login, password)
      } else {
        data = await registration(login, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(MAIN_ROUTER)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 54 }}
    >

      <Card style={{ width: 600 }} className='p-5'>
        <h2 className='m-auto color-black pb-2'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className='d-flex flex-column'>
          <Form.Control
            className='mt-3 '
            placeholder='Введите логин'
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder='Введите пароль'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='d-flex justify-content-between align-items-center mt-3'>
            {isLogin ?
              <div className='color-black'>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTER}>Зарегестрируйтесь!</NavLink>
              </div>
              :
              <div className='color-black'>
                Есть аккаунт? <NavLink to={LOGIN_ROUTER}>Авторизируйтесь!</NavLink>
              </div>
            }
            <div
              onClick={click}
              className='btn btn-outline-warning'
            >
              {isLogin ? 'Войти' : 'Регистрация'}
            </div>

          </div>

        </Form>
      </Card>
    </Container>
  )
})

export default Auth