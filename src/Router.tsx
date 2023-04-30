import { Routes, Route } from 'react-router-dom'
import { Transactions } from './pages/Transactions'
import { GlobalStyle } from './styles/global'
export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Transactions />} />
      </Route>
    </Routes>
  )
}