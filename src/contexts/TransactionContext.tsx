import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Cliente {
  id: string
  nome: string
  cpf: string,
  email: string,
  numeroConta: number,
  dtNascimento: Date,
  telefone: number,
  chavePix: string,
  password: string,
  rg: string
}


interface Saldo {
  id: string
  cliente: Cliente
  saldo: number
}

interface Transaction {
  id: string
  cliente : Cliente
  vlMov: number
  tpMov: string
  dtMov: Date
  inOutFlag: 'income' | 'outcome'
}

interface CreateTransactionInput {
  tpMov: string
  value: number
  numeroConta: number
  agencia: string
  inOutFlag: 'income' | 'outcome'
}

interface LoginInput {

  numeroConta: number
  password: string
  agencia: string
}

interface CreatePixInput {
  chavePix: string
  value: number
  inOutFlag: 'income' | 'outcome'
  tpMov: string
}
interface WithdralInput {
  value:number
}

interface CreateUserInput {
  nome: string,
  cpf: string,
  agencia: string,
  email: string,
  dtNascimento: Date,
  telefone: string,
  password: string,
  rg: string
}

interface TransactionContextType {
  transactions: Transaction[]
  saldo: number
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  createPix: (data: CreatePixInput) => Promise<void>
  withdraw: (data: WithdralInput) => Promise<void>
  getSaldo: () => Promise<void>
  createUser: (data: CreateUserInput) => Promise<void>
  login: (data: LoginInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [saldo, setSaldo] = useState<number>(0)
  const navigate = useNavigate()

  const fetchTransactions = useCallback(async (query?: string) => {    

    let response = await api.get('transactions/findAll', {
      auth: {
        username: '502.939.249-60',
        password: '123'
      }
    })

    if (query)
      response = await api.post('transactions/findAll', {
        query,
      })

    setTransactions(response.data)
  }, [])

  

  const login = useCallback(
    async (data: LoginInput) => {
      const { numeroConta, password, agencia } = data

      const response = await api.post('/login', {
        numeroConta,
        password,
        agencia
    
      }).catch(function (error) {
        console.log(error.response)
        alert("Algo deu errado")
      })

      if (response !== undefined) {
        localStorage.clear()

        localStorage.setItem('user', JSON.stringify(response))

        navigate("/home")
      }
      
    },
    []

  )



  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { tpMov, value, numeroConta, inOutFlag, agencia } = data
      
      const response = await api.post('transactions/ted', {
        numeroConta,
        inOutFlag,
        tpMov,
        value,
        agencia
      }, {
        auth: {
          username: '502.939.249-60',
          password: '123'
        }
      })

      // setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const createUser = useCallback(
    async (data: CreateUserInput) => {
      const { nome, cpf, email, dtNascimento, telefone, password, rg, agencia  } = data
      
      const response = await api.post('cliente/create', {
        nome,
        cpf,
        email,
        dtNascimento,
        telefone,
        password,
        agencia,
        rg
      })

    },
    [],

  )

  const withdraw = useCallback(
    async (data: WithdralInput) => {
      const { value } = data
      const tpMov = "Saque"

      const response = await api.post('transactions/withdraw', {
        value,
        tpMov
      }, {
        auth: {
          username: '502.939.249-60',
          password: '123'
        }
      })

      // setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const createPix = useCallback(
    async (data: CreatePixInput) => {
      const { chavePix, value,tpMov, inOutFlag } = data

      const response = await api.post('transactions/pix', {
        chavePix,
        value,
        tpMov,
        inOutFlag
    
      }, {
        auth: {
          username: '502.939.249-60',
          password: '123'
        }
      })

      // setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const getSaldo = useCallback(
    async () => {

      const response = await api.get('saldo/', {
        auth: {
          username: '502.939.249-60',
          password: '123'
        }
      })

      setSaldo(response.data)
    },
    [],
  )

  useEffect(() => {
    fetchTransactions(),
    getSaldo()
  }, [fetchTransactions, getSaldo])

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        createUser,
        createPix,
        withdraw,
        saldo,
        getSaldo,
        login
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
