import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { TransactionContext } from '../../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'
import { useNavigate } from 'react-router-dom'

const loginFormSchema = z.object({
  numeroConta: z.number(),
  agencia: z.string(),
  password: z.string(),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function LoginModal() {


  const doLogin = useContextSelector(
    TransactionContext,
    (context) => {
      return context.login
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      agencia: '001',
    },
  })

  async function login(data: LoginFormInputs) {
    const { numeroConta, password } = data
    
    await doLogin({
      numeroConta,
      password,
      agencia: '001'
    })
    
    
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Login</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(login)}>
          <input
            type="number"
            placeholder="Numero da conta"
            required
            {...register('numeroConta', {valueAsNumber: true})}
          />
           <input
            type="text"
            placeholder="Agência"
            disabled
            {...register('agencia')}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            {...register('password', { valueAsNumber: false })}
          />
          <button type="submit" disabled={isSubmitting}>
            Entrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
