import { Routes, Route } from 'react-router-dom'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { Login } from './pages/Login'
export function Router() {
  return (
    <Routes>
      <Route>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route>
        <Route path="/" element={<Transactions />} />
      </Route>
    </Routes>
  )
}