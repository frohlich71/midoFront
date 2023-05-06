import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  value: number
  category: string
  createdAt: string
  chavePix?: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface CreatePixInput {
  chavePix: string
  value: number
}
interface WithdralInput {
  value:number
}

interface TransactionContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  createPix: (data: CreatePixInput) => Promise<void>
  withdraw: (data: WithdralInput) => Promise<void>
}

interface TransactionProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    let response = await api.get('transactions/findAll')

    if (query)
      response = await api.post('/findAll', {
        query,
      })

    setTransactions(response.data)
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('/create', {
        description,
        price,
        category,
        type,
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const withdraw = useCallback(
    async (data: WithdralInput) => {
      const { value } = data
      const dtMov = Date.now();
      const tpMov = "Envio de PIX"

      const response = await api.post('/create', {
        value,
        dtMov,
        tpMov
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  const createPix = useCallback(
    async (data: CreatePixInput) => {
      const { chavePix, value } = data
      const dtMov = Date.now();
      const tpMov = "Envio de PIX"

      const response = await api.post('/create', {
        chavePix,
        value,
        dtMov,
        tpMov
      })

      setTransactions((state) => [...state, response.data])
    },
    [],
  )

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        createPix,
        withdraw
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
