import { Table, Text } from '@radix-ui/themes'
import { useTranslation } from 'react-i18next'
import { PLAYER_DISTRIBUTION } from '@/constants/playerDistribution'

export function PlayerCountTable() {
  const { t } = useTranslation()

  const { playerCounts, townsfolk, outsiders, minions, demons } =
    PLAYER_DISTRIBUTION

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
