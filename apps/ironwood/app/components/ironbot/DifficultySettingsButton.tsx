import {
  Badge,
  Box,
  Button,
  Card,
  CheckboxCards,
  Flex,
  RadioGroup,
} from '@radix-ui/themes'
import { useCallback, useState } from 'react'

import { ModalDialog } from '~/components/ModalDialog'
import { IBDifficulty, useDifficulty } from '~/hooks/ironbot/useDifficulty'

export const DifficultySettingsButton = () => {
  const { hasDifficulty, setDifficulty, resetDifficulty, getDifficultyLevel } =
    useDifficulty()

  const [valuesMain, setValuesMain] = useState<string[]>(() =>
    Object.values(IBDifficulty)
      .filter(
        (value) =>
          value in
          [
            IBDifficulty.RESOLVE_RED_ACTIONS,
            IBDifficulty.ADD_EXTRA_GOLEM_TO_FERRUM,
            IBDifficulty.ADD_EXTRA_SPECIAL_CARDS,
            IBDifficulty.ADD_FOUNDATIONS,
          ],
      )
      .map((value) => (hasDifficulty(value) ? value : '')),
  )
  const [valuesExtraFighters, setValuesExtraFighters] = useState<string>(() =>
    hasDifficulty(IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ONE)
      ? IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ONE
      : hasDifficulty(IBDifficulty.ADD_EXTRA_IRONCLAD_TO_TWO)
        ? IBDifficulty.ADD_EXTRA_IRONCLAD_TO_TWO
        : hasDifficulty(IBDifficulty.ADD_EXTRA_IRONCLAD_TO_THREE)
          ? IBDifficulty.ADD_EXTRA_IRONCLAD_TO_THREE
          : hasDifficulty(IBDifficulty.ADD_EXTRA_IRONCLAD_TO_FOUR)
            ? IBDifficulty.ADD_EXTRA_IRONCLAD_TO_FOUR
            : hasDifficulty(IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ALL)
              ? IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ALL
              : '',
  )

  const onReset = useCallback(() => {
    resetDifficulty()
    setValuesMain([])
    setValuesExtraFighters('')
  }, [resetDifficulty])

  const onConfirm = useCallback(() => {
    const values = [...valuesMain, valuesExtraFighters].filter(Boolean)

    resetDifficulty()
    values.forEach((value) => setDifficulty(value as IBDifficulty))
  }, [resetDifficulty, setDifficulty, valuesExtraFighters, valuesMain])

  return (
    <ModalDialog
      title="Difficulty settings"
      trigger={
        <Button variant="ghost">
          Difficulty Level:{' '}
          <Badge highContrast size="3">
            {getDifficultyLevel() || '0'}
          </Badge>
        </Button>
      }
      action={
        <Flex direction="row" justify="center" gap="2">
          <Button onClick={onReset} variant="soft">
            Reset
          </Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </Flex>
      }
    >
      <Flex direction="column" gap="3">
        <Box>
          Once you can beat the bot using the described rules, consider the
          following options to increase the difficulty on a scale of 1-15
          levels:
        </Box>
        <Box>
          <CheckboxCards.Root
            columns="1"
            defaultValue={valuesMain}
            gap="2"
            onValueChange={(values) => {
              setValuesMain(values.filter(Boolean))
            }}
          >
            <CheckboxCards.Item value={IBDifficulty.RESOLVE_RED_ACTIONS}>
              Do not ignore, but resolve the action icons in red when instructed
              (2&nbsp;levels).
            </CheckboxCards.Item>
            <CheckboxCards.Item value={IBDifficulty.ADD_EXTRA_GOLEM_TO_FERRUM}>
              During setup, place a Golem into Ferrum (3&nbsp;levels).
            </CheckboxCards.Item>
            <CheckboxCards.Item value={IBDifficulty.ADD_EXTRA_SPECIAL_CARDS}>
              During setup, shuffle 4 special cards (instead of 2) into the
              bot’s hand. (2&nbsp;levels).
            </CheckboxCards.Item>
            <CheckboxCards.Item value={IBDifficulty.ADD_FOUNDATIONS}>
              During setup, select two random outer mountains (using the vision
              cards) and place a Foundation on each of them (3&nbsp;levels).
            </CheckboxCards.Item>
            <Card>
              <Flex direction="column" gap="3">
                <Box>
                  During setup, select one of the following options and add
                  additional Ironclad Fighters to the Ironclad Warbands:
                </Box>
                <RadioGroup.Root
                  defaultValue={valuesExtraFighters}
                  onValueChange={(value) => setValuesExtraFighters(value)}
                >
                  <RadioGroup.Item
                    value={IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ONE}
                  >
                    1 Ironclad Fighter to a random inner mountain
                    (1&nbsp;level).
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={IBDifficulty.ADD_EXTRA_IRONCLAD_TO_TWO}
                  >
                    1 Ironclad Fighter to two different random inner mountains
                    (2&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={IBDifficulty.ADD_EXTRA_IRONCLAD_TO_THREE}
                  >
                    1 Ironclad Fighter to three different random inner mountains
                    (3&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={IBDifficulty.ADD_EXTRA_IRONCLAD_TO_FOUR}
                  >
                    1 Ironclad Fighter to each inner mountain (4&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={IBDifficulty.ADD_EXTRA_IRONCLAD_TO_ALL}
                  >
                    1 Ironclad Fighter to each inner mountain and 1 Ironclad
                    Fighter to Ferrum (5&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item value="">None.</RadioGroup.Item>
                </RadioGroup.Root>
              </Flex>
            </Card>
          </CheckboxCards.Root>
        </Box>
      </Flex>
    </ModalDialog>
  )
}
