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
import { Dispatch, SetStateAction } from 'react'

const newClienteFormSchema = z.object({
  nome: z.string(),
  cpf: z.string(),
  agencia: z.string(),
  email: z.string(),
  dtNascimento: z.date(),
  telefone: z.string(),
  password: z.string(),
  rg: z.string()
})

type NewClienteFormInputs = z.infer<typeof newClienteFormSchema>

export function CadastroModal({ setIsCadastroOpen }: { setIsCadastroOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const createUser = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createUser
    },
  )
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewClienteFormInputs>({
    resolver: zodResolver(newClienteFormSchema),
    defaultValues: {
      agencia: '001',
    },
  })

  async function handleCreateNewCliente(data: NewClienteFormInputs) {
    const { nome, cpf, email, dtNascimento, telefone, password, rg } = data

   const user = await createUser({
      nome,
      cpf,
      email,
      dtNascimento,
      agencia: '001',
      telefone,
      password,
      rg
    })
   
    setIsCadastroOpen(false)
    window.alert("O numero da sua conta é: " + user?.numeroConta)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Cadastro</Dialog.Title>

        <CloseButton onClick={() => setIsCadastroOpen(false)}>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewCliente)}>
          <input
            type="text"
            placeholder="Nome completo"
            required
            {...register('nome')}
          />
           <input
            type="text"
            placeholder="CPF"
            {...register('cpf')}
          />
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
          />
          <input
            type="date"
            placeholder="Data de nascimento"
            {...register('dtNascimento', {valueAsDate: true})}
          />
          <input
            type="text"
            placeholder="Telefone"
            {...register('telefone')}
          />

          <input
            type="text"
            placeholder="RG"
            {...register('rg')}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            {...register('password')}
          />
          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
