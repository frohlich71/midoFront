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
  dtNascimento: String,
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

interface Authorities {
  authority: string
}

interface ResponseAuth {
  authenticated: boolean 
  authorities: Authorities[] 
  credentials: string 
  name: string
  principal: string
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
  cliente: Cliente
  auth: ResponseAuth
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
  const [cliente, setCliente] = useState<Cliente>({
    chavePix: "",
    cpf: "",
    dtNascimento: "",
    email: "",
    id: "",
    nome: "",
    numeroConta: NaN,
    password: "",
    rg: "",
    telefone: NaN

  })
  const [auth, setAuth] = useState<ResponseAuth>({
    authorities: [{
      authority: ""
    }],
    credentials: "",
    name: "",
    principal: "",
    authenticated: false
  })

  const fetchTransactions = useCallback(async (query?: string) => {  
    if (JSON.parse(localStorage.getItem("auth")!).authenticated) {
      let response = await api.get('transactions/findAll', {
        auth: {
          username: JSON.parse(localStorage.getItem("auth")!).name,
          password: JSON.parse(localStorage.getItem("auth")!).credentials
        }
      })
  
      if (query && JSON.parse(localStorage.getItem("auth")!).authenticated)
        response = await api.post('transactions/findAll', {
          query,
        }, {
          auth: {
            username: JSON.parse(localStorage.getItem("auth")!).name,
            password: JSON.parse(localStorage.getItem("auth")!).credentials
          }
        })
  
      setTransactions(response.data)
    }
    
  }, [])

  const fetchTransactionsAtLogin = async function() {

    let response = await api.get('transactions/findAll', {
      auth: {
        username: JSON.parse(localStorage.getItem("auth")!).name,
        password: JSON.parse(localStorage.getItem("auth")!).credentials
      }
    })
    

    
    setTransactions(response.data)

  }

  const getSaldoAtLogin = async function () {
    const response = await api.get('saldo/find', {
      auth: {
        username: JSON.parse(localStorage.getItem("auth")!).name,
        password: JSON.parse(localStorage.getItem("auth")!).credentials
      }
    })

    setSaldo(response.data)

  }

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
          username: JSON.parse(localStorage.getItem("auth")!).name,
          password: JSON.parse(localStorage.getItem("auth")!).credentials
        }
      })

      fetchTransactions()
      getSaldo()
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
          username: JSON.parse(localStorage.getItem("auth")!).name,
          password: JSON.parse(localStorage.getItem("auth")!).credentials
        }
      })

      fetchTransactions()
      getSaldo()
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
          username: JSON.parse(localStorage.getItem("auth")!).name,
          password: JSON.parse(localStorage.getItem("auth")!).credentials
        }
      })

      fetchTransactions()
      getSaldo()
    },
    [],
  )

  const getSaldo = useCallback(
    
    async () => {
      if (JSON.parse(localStorage.getItem("auth")!).authenticated) {
        const response = await api.get('saldo/find', {
          auth: {
            username: JSON.parse(localStorage.getItem("auth")!).name,
            password: JSON.parse(localStorage.getItem("auth")!).credentials
          }
    })
  
        setSaldo(response.data)
      }
      
    },
    [],
  )


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


        localStorage.setItem('auth', JSON.stringify(response?.data.authentication))
        localStorage.setItem('cliente', JSON.stringify(response?.data.authentication))


        setCliente({
            chavePix: response?.data.cliente.chavePix,
            cpf: response?.data.cliente.cpf,
            dtNascimento: response?.data.cliente.dtNascimento,
            email: response?.data.cliente.email,
            id: response?.data.cliente.id,
            nome: response?.data.cliente.nome,
            numeroConta: response?.data.cliente.numeroConta,
            password: response?.data.cliente.password,
            rg: response?.data.cliente.rg,
            telefone: response?.data.cliente.telefone
        
        })

        setAuth({
          authenticated: response?.data.authentication.authenticated,
          authorities: response?.data.authentication.authorities,
          credentials: response?.data.authentication.credentials,
          name: response?.data.authentication.name,
          principal: response?.data.authentication.principal
        })


        fetchTransactionsAtLogin()
        getSaldoAtLogin()
        
      
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
        login,
        auth,
        cliente
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
