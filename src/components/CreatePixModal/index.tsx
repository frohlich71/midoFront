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
  chavePix: z.string()
})

type CreatePixKeyInput = z.infer<typeof newTransactionFormSchema>

export function CreatePixModal({ setIsCreatePixOpen }: { setIsCreatePixOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const createPixKey = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createPixKey
    },
  )
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<CreatePixKeyInput>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewPix(data: CreatePixKeyInput) {
    const { chavePix } = data
    
    const response = await createPixKey({
      chavePix
    })

    if (response.response?.status === 400) {
      window.alert(response.response?.data)
    } else {
      setIsCreatePixOpen(false)
      window.alert("Pix criado com sucesso.")
    }

    
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova chave pix</Dialog.Title>

        <CloseButton onClick={() => setIsCreatePixOpen(false)}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewPix)}>
          <input
            type="text"
            placeholder="Chave pix"
            required
            {...register('chavePix')}
          />

          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
