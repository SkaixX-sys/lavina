import { Routes, Route, Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import { adminRoutes, notAuthRoutes, publicRoutes } from './../routes';
import { ADMIN_ROUTER, MAIN_ROUTER } from '../utils/consts';
import { Context } from '../main';
import { observer } from 'mobx-react-lite';

const AppRouter = observer(() => {
  const { user } = useContext(Context) ?? {}
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) =>
        <Route path={path} element={<Component />} exact key={path} />
      )}

      {!user.isAuth
        &&
        notAuthRoutes.map(({ path, Component }) =>
          <Route path={path} element={<Component />} exact key={path} />
        )}

      {user.user.role === 'admin'
        &&
        adminRoutes.map(({ path, Component }) =>
          <Route path={path} element={<Component />} exact key={path} />
        )}


      <Route path="*" element={<Navigate to={MAIN_ROUTER} />} />
    </Routes>
  )
})

export default AppRouter