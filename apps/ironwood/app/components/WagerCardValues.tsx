import { Badge, DataList, Flex, Separator } from '@radix-ui/themes'

import { IWCard } from '~/utils/state/types'

import { CardBadge } from './CardBadge'

type Props = {
  combatCard: IWCard
  damage: number
  damageModifier: number
  defense: number
  defenseModifier: number
  dominance: number
  dominanceModifier: number
}

export const WagerCardValues = ({
  combatCard,
  damage,
  damageModifier,
  defense,
  defenseModifier,
  dominance,
  dominanceModifier,
}: Props) => {
  return (
    <Flex justify="center" mt="2">
      <Flex direction="row" align="stretch" justify="start" gap="3">
        <Flex>
          <CardBadge card={combatCard} />
        </Flex>
        <Flex>
          <Separator orientation="vertical" size="4" />
        </Flex>
        <Flex direction="column">
          <DataList.Root orientation="horizontal">
            <DataList.Item align="center">
              <DataList.Label>Damage</DataList.Label>
              <DataList.Value>
                <Badge size="3" highContrast>
                  {damage}
                  {damageModifier > 0 ? ` + ${damageModifier}` : null}
                </Badge>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label>Defense</DataList.Label>
              <DataList.Value>
                <Badge size="3" highContrast>
                  {defense}
                  {defenseModifier > 0 ? ` + ${defenseModifier}` : null}
                </Badge>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label>Dominance</DataList.Label>
              <DataList.Value>
                <Badge size="3" highContrast>
                  {dominance}
                  {dominanceModifier > 0 ? ` + ${dominanceModifier}` : null}
                </Badge>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Flex>
      </Flex>
    </Flex>
  )
}
