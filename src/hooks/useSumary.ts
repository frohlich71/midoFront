import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../contexts/TransactionContext'

export function useSummary() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })

  //TODO: TRAZER O SALDO DO BANCO 

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.inOutFlag === 'income') {
          acc.income += transaction.vlMov
          acc.total += transaction.vlMov
        } else {
          acc.outcome += transaction.vlMov
          acc.total -= transaction.vlMov
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactions])

  return summary
}
