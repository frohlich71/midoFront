import { SummaryContainer, SummaryCard } from './styles'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../utils/formatter'
import { useSummary } from '../../hooks/useSumary'
import { useContext } from 'react'
import { useContextSelector } from 'use-context-selector'
import { TransactionContext } from '../../contexts/TransactionContext'

export function Summary() {
  const summary = useSummary()

  const saldo = useContextSelector(
    TransactionContext,
    (context) => {
      return context.saldo
    },
  )
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span> Entradas </span>
          <ArrowCircleUp size={32} color="#80b37e" />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span> Saidas </span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>
        <strong>{priceFormatter.format(summary.outcome)} </strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span> Total </span>
          <CurrencyDollar size={32} color="#fff" />
        </header>
        <strong>{priceFormatter.format(saldo)} </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}
