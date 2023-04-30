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
  value: z.number()
})

type WithdrawInput = z.infer<typeof newTransactionFormSchema>

export function WithdralModal() {
  const withdraw = useContextSelector(
    TransactionContext,
    (context) => {
      return context.withdraw
    },
  )
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<WithdrawInput>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: WithdrawInput) {
    const { value } = data

    await withdraw({
      value
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo Saque</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="number"
            placeholder="Valor"
            required
            {...register('value', { valueAsNumber: true })}
          />

          <button type="submit" disabled={isSubmitting}>
            Sacar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
