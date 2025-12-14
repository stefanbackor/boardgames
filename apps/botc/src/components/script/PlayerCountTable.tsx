import { Table, Text } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'

export function PlayerCountTable() {
  const { t } = useTranslation()

  const playerCounts = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, '15+']
  const townsfolk = [3, 3, 5, 5, 5, 7, 7, 7, 9, 9, 9]
  const outsiders = [0, 1, 0, 1, 2, 0, 1, 2, 0, 1, 2]
  const minions = [1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3]
  const demons = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  return (
    <Table.Root size="1" style={{ fontFamily: 'var(--heading-font-family)' }}>
      <Table.Header>
        <Table.Row align="baseline">
          <Table.ColumnHeaderCell justify="end">
            <Text size="6">{t('Players')}</Text>
          </Table.ColumnHeaderCell>
          {playerCounts.map((count) => (
            <Table.ColumnHeaderCell key={count} align="center">
              <Text size="6">{count}</Text>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row align="baseline">
          <Table.RowHeaderCell align="right">
            <Text size="6">{t('Townsfolk')}</Text>
          </Table.RowHeaderCell>
          {townsfolk.map((count, index) => (
            <Table.Cell key={index} align="center">
              <Text size="6"> {count}</Text>
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row align="baseline">
          <Table.RowHeaderCell align="right">
            <Text size="6">{t('Outsiders')}</Text>
          </Table.RowHeaderCell>
          {outsiders.map((count, index) => (
            <Table.Cell key={index} align="center">
              <Text size="6">{count}</Text>
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row align="baseline">
          <Table.RowHeaderCell align="right">
            <Text size="6">{t('Minions')}</Text>
          </Table.RowHeaderCell>
          {minions.map((count, index) => (
            <Table.Cell key={index} align="center">
              <Text size="6">{count}</Text>
            </Table.Cell>
          ))}
        </Table.Row>

        <Table.Row align="baseline">
          <Table.RowHeaderCell align="right">
            <Text size="6">{t('Demons')}</Text>
          </Table.RowHeaderCell>
          {demons.map((count, index) => (
            <Table.Cell key={index} align="center">
              <Text size="6">{count}</Text>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}
