import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import { useEffect } from 'react'

export function Transactions() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr
                  key={
                    transaction?.id !== undefined
                      ? transaction.id
                      : transactions.length + 1
                  }
                >
                  <td width="50%">{transaction?.tpMov}</td>
                  <td>
                    <PriceHighlight variant={transaction?.inOutFlag}>
                      {transaction?.inOutFlag === 'outcome' && '- '}
                      {priceFormatter.format(transaction?.vlMov)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction?.cliente.numeroConta}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction?.dtMov))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
