import { Table } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'

export function PlayerCountTable() {
  const { t } = useTranslation()

  const playerCounts = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, '15+']
  const townsfolk = [3, 3, 5, 5, 5, 7, 7, 7, 9, 9, 9]
  const outsiders = [0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2]
  const minions = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3]
  const demons = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>{t('Players')}</Table.ColumnHeaderCell>
          {playerCounts.map((count) => (
            <Table.ColumnHeaderCell key={count} align="center">
              {count}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>{t('Townsfolk')}</Table.RowHeaderCell>
          {townsfolk.map((count, index) => (
            <Table.Cell key={index} align="center">
              {count}
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>{t('Outsiders')}</Table.RowHeaderCell>
          {outsiders.map((count, index) => (
            <Table.Cell key={index} align="center">
              {count}
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>{t('Minions')}</Table.RowHeaderCell>
          {minions.map((count, index) => (
            <Table.Cell key={index} align="center">
              {count}
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>{t('Demons')}</Table.RowHeaderCell>
          {demons.map((count, index) => (
            <Table.Cell key={index} align="center">
              {count}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
