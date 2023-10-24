import * as Dialog from '@radix-ui/react-dialog'

import { useContextSelector } from "use-context-selector"
import { Body, NewTransactionButton } from './styles';
import { CadastroModal } from '../../components/CadastroModal';
import { LoginModal } from '../../components/LoginModal';
import { boolean } from 'zod';
import { useState } from 'react';

export function Cadastro () {
  const [isCadastroOpen, setIsCadastroOpen] = useState<boolean>(false)

  return (
  <Body>
          <Dialog.Root open={isCadastroOpen}>
            <Dialog.Trigger asChild>
              <NewTransactionButton onClick={() => setIsCadastroOpen(!isCadastroOpen)}>CADASTRO</NewTransactionButton>
            </Dialog.Trigger>
            <CadastroModal setIsCadastroOpen={setIsCadastroOpen}/>
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