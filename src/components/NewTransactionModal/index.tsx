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

export function NewTransactionModal({ setIsTedOpen }: { setIsTedOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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

    const response = await createTransaction({
      numeroConta,
      inOutFlag: 'outcome',
      tpMov: 'Envio de TED',
      value,
      agencia: '001'
    })

    if (response.response?.status === 400) {
      window.alert(response.response?.data)
    } else {
      setIsTedOpen(false)
      window.alert("Transação efetuada com sucesso.")
    }

  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo TED</Dialog.Title>

        <CloseButton onClick={() => setIsTedOpen(false)}>
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
            type="number"
            placeholder="Valor"
            required
            {...register('value', { valueAsNumber: true })}
          />
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
