import { ButtonsContainer, HeaderContainer, HeaderContent, NewTransactionButton } from './styles'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { PixModal } from '../PixModal'
import { WithdralModal } from '../WithdrawModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg}></img>
        <ButtonsContainer >
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>TED</NewTransactionButton>
            </Dialog.Trigger>
            <NewTransactionModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>PIX</NewTransactionButton>
            </Dialog.Trigger>
            <PixModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>SAQUE</NewTransactionButton>
            </Dialog.Trigger>
            <WithdralModal />
          </Dialog.Root>
        </ButtonsContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
