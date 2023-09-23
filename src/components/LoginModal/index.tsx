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

const newTransactionFormSchema = z.object({
  numeroConta: z.number(),
  agencia: z.string(),
  value: z.number(),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function LoginModal() {
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      agencia: '001',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { numeroConta, value } = data

    await createTransaction({
      numeroConta,
      inOutFlag: 'outcome',
      tpMov: 'Envio de TED',
      value,
      agencia: '001'
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Login</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
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
            {...register('value', { valueAsNumber: false })}
          />
          <button type="submit" disabled={isSubmitting}>
            Entrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
