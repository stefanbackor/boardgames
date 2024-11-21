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

import { Difficulty } from '~/constants/difficulty'
import { useDifficulty } from '~/hooks/useDifficulty'

import { ModalDialog } from '../ModalDialog'

export const DifficultySettingsButton = () => {
  const { hasDifficulty, setDifficulty, resetDifficulty, getDifficultyLevel } =
    useDifficulty()

  const [valuesMain, setValuesMain] = useState<string[]>(() =>
    Object.values(Difficulty)
      .filter(
        (value) =>
          value in
          [
            Difficulty.RESOLVE_RED_ACTIONS,
            Difficulty.ADD_EXTRA_SPECIAL_ELEMENT,
            Difficulty.ADD_EXTRA_SPECIAL_CARDS,
            Difficulty.FOUNDATIONS,
          ],
      )
      .map((value) => (hasDifficulty(value) ? value : '')),
  )
  const [valuesExtraFighters, setValuesExtraFighters] = useState<string>(() =>
    hasDifficulty(Difficulty.ADD_EXTRA_WARRIOR_TO_ONE)
      ? Difficulty.ADD_EXTRA_WARRIOR_TO_ONE
      : hasDifficulty(Difficulty.ADD_EXTRA_WARRIOR_TO_TWO)
        ? Difficulty.ADD_EXTRA_WARRIOR_TO_TWO
        : hasDifficulty(Difficulty.ADD_EXTRA_WARRIOR_TO_THREE)
          ? Difficulty.ADD_EXTRA_WARRIOR_TO_THREE
          : hasDifficulty(Difficulty.ADD_EXTRA_WARRIOR_TO_FOUR)
            ? Difficulty.ADD_EXTRA_WARRIOR_TO_FOUR
            : hasDifficulty(Difficulty.ADD_EXTRA_WARRIOR_TO_ALL)
              ? Difficulty.ADD_EXTRA_WARRIOR_TO_ALL
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
    values.forEach((value) => setDifficulty(value as Difficulty))
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
            <CheckboxCards.Item value={Difficulty.RESOLVE_RED_ACTIONS}>
              Do not ignore, but resolve the action icons in red when instructed
              (2&nbsp;levels).
            </CheckboxCards.Item>
            <CheckboxCards.Item value={Difficulty.ADD_EXTRA_SPECIAL_ELEMENT}>
              During setup, place 2 markers next to the Spirits of the Forest
              card (3&nbsp;levels). (Do not remove a marker in the first
              preparation phase.)
            </CheckboxCards.Item>
            <CheckboxCards.Item value={Difficulty.ADD_EXTRA_SPECIAL_CARDS}>
              During setup, shuffle 4 special cards (instead of 2) into the
              bot’s hand. (2&nbsp;levels).
            </CheckboxCards.Item>
            <CheckboxCards.Item value={Difficulty.FOUNDATIONS}>
              During setup, remove 2 foundations from your player mat and put
              them back in the gamebox (3&nbsp;levels).
            </CheckboxCards.Item>
            <Card>
              <Flex direction="column" gap="3">
                <Box>
                  During setup, select one of the following options and add
                  additional Woodwalker Fighters to the Woodwalker Warbands:
                </Box>
                <RadioGroup.Root
                  defaultValue={valuesExtraFighters}
                  onValueChange={(value) => setValuesExtraFighters(value)}
                >
                  <RadioGroup.Item value={Difficulty.ADD_EXTRA_WARRIOR_TO_ONE}>
                    1 Woodwalker Fighter to a random outer forest
                    (1&nbsp;level).
                  </RadioGroup.Item>
                  <RadioGroup.Item value={Difficulty.ADD_EXTRA_WARRIOR_TO_TWO}>
                    1 Woodwalker Fighter to two different random outer forests
                    (2&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item
                    value={Difficulty.ADD_EXTRA_WARRIOR_TO_THREE}
                  >
                    1 Woodwalker Fighter to three different random outer forests
                    (3&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item value={Difficulty.ADD_EXTRA_WARRIOR_TO_FOUR}>
                    1 Woodwalker Fighter to four different random outer forests
                    (4&nbsp;levels).
                  </RadioGroup.Item>
                  <RadioGroup.Item value={Difficulty.ADD_EXTRA_WARRIOR_TO_ALL}>
                    1 Woodwalker Fighter to each outer forest (5&nbsp;levels).
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
