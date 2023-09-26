import { Routes, Route } from 'react-router-dom'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
import { Login } from './pages/Login'
import { Cadastro } from './pages/Cadastro'
export function Router() {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Cadastro />} />
      </Route>
      <Route>
        <Route path="/home" element={<Transactions />} />
      </Route>
    </Routes>
  )
}