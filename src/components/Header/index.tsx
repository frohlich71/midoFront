import { ButtonsContainer, CriarPixButton, HeaderContainer, HeaderContent, LogoutButton, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { PixModal } from '../PixModal'
import { WithdralModal } from '../WithdrawModal'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CreatePixModal } from '../CreatePixModal'




export function Header() {
  const navigate = useNavigate()

  const [isTedOpen, setIsTedOpen] = useState<boolean>(false)
  const [isPixOpen, setIsPixOpen] = useState<boolean>(false)
  const [isSaqueOpen, setIsSaqueOpen] = useState<boolean>(false)
  const [isCreatePixOpen, setIsCreatePixOpen] = useState<boolean>(false)

  function logout() {
    localStorage.clear()
    navigate("/")
  }
  return (
    <HeaderContainer>
      <HeaderContent>
        {/* <img src={logoImg}></img> */}
        <ButtonsContainer >
          <Dialog.Root open={isTedOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton onClick={() => setIsTedOpen(!isTedOpen)}>TED</NewTransactionButton>
            </Dialog.Trigger>
            <NewTransactionModal setIsTedOpen={setIsTedOpen}/>
          </Dialog.Root>
          <Dialog.Root open={isPixOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton onClick={() => setIsPixOpen(!isPixOpen)}>PIX</NewTransactionButton>
            </Dialog.Trigger>
            <PixModal setIsPixOpen={setIsPixOpen}/>
          </Dialog.Root>
          <Dialog.Root open={isSaqueOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton onClick={() => setIsSaqueOpen(!isSaqueOpen)}>SAQUE</NewTransactionButton>
            </Dialog.Trigger>
            <WithdralModal setIsSaqueOpen={setIsSaqueOpen}/>
          </Dialog.Root>
          <Dialog.Root open={isCreatePixOpen}>
            <Dialog.Trigger asChild>
              <CriarPixButton onClick={() => setIsCreatePixOpen(true)}>CRIAR CHAVE PIX</CriarPixButton>
            </Dialog.Trigger>
            <CreatePixModal setIsCreatePixOpen={setIsCreatePixOpen}/>
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <LogoutButton onClick={logout}>LOGOUT</LogoutButton>
            </Dialog.Trigger>
          </Dialog.Root>
        </ButtonsContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
