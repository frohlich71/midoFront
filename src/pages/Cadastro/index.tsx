import * as Dialog from '@radix-ui/react-dialog'

import { useContextSelector } from "use-context-selector"
import { Body, NewTransactionButton } from './styles';
import { CadastroModal } from '../../components/CadastroModal';
import { LoginModal } from '../../components/LoginModal';

export function Cadastro () {
  return (
  <Body>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>CADASTRO</NewTransactionButton>
            </Dialog.Trigger>
            <CadastroModal />
          </Dialog.Root>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton>LOGIN</NewTransactionButton>
            </Dialog.Trigger>
            <LoginModal />
          </Dialog.Root>
    </Body>

  )
}