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
  chavePix: z.string(),
  value: z.number()
})

type CreatePixInput = z.infer<typeof newTransactionFormSchema>

export function PixModal({ setIsPixOpen }: { setIsPixOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const createPix = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createPix
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<CreatePixInput>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: CreatePixInput) {
    const { chavePix, value } = data

    const response = await createPix({
      chavePix,
      value,
      tpMov: 'Envio de PIX',
      inOutFlag: 'outcome'
    })

    if (response.response?.status === 400) {
      window.alert("A chave que está tentando enviar não existe.")
    } else if (response.response?.status === 200) {
      setIsPixOpen(false)
      window.alert("Transação efetuada com sucesso.")
    } else {
      window.alert(response.response?.data)
    }

    
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Novo PIX</Dialog.Title>

        <CloseButton onClick={() => setIsPixOpen(false)}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Chave PIX"
            required
            {...register('chavePix')}
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
