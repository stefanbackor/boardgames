import { Badge, Box, Heading, Strong } from '@radix-ui/themes'
import { useCallback } from 'react'

import { useLocationState } from '~/utils/state/useLocationState'

import { ExecuteButton } from '../ExecuteButton'
import { Keyword } from '../KeywordButton'

export const RoundEnd = () => {
  const [crystals, setCrystals] = useLocationState('crystals')
  const [recruitmentDone, setRecruitmentDone] = useLocationState(
    'round_end_recruitment_done',
  )
  const [recruitmentCrystals, setRecruitmentCrystals] = useLocationState(
    'round_end_recruitment_crystals',
  )

  const recruitNumbers = Math.floor((recruitmentCrystals || crystals) / 2)

  const onRecruitment = useCallback(() => {
    const crystalsUsed = recruitNumbers * 2
    setCrystals((crystals) => crystals - crystalsUsed)
    setRecruitmentDone(true)
    setRecruitmentCrystals(crystalsUsed)
  }, [recruitNumbers, setCrystals, setRecruitmentCrystals, setRecruitmentDone])

  return (
    <>
      <Heading as="h3">Recover/discard action cards</Heading>
      <Box>
        Take all your base cards back into your hand. Ongoing cards with
        marker(s) are moved above the player board. Discard all other played
        cards. Check your hand limit of special cards (8 including base cards).
      </Box>
      <Heading as="h3">Fade Totem</Heading>
      <Box>
        Discovered Totems on the board are flipped to their fading side, or if
        they were already on their fading side, they are removed.
      </Box>
      <Heading as="h3">Recruitment</Heading>

      {recruitNumbers === 0 ? (
        <Box>
          Not enough crystals. No{' '}
          <Keyword.WoodwalkerWarrior count="0" hideCount /> recruited.
        </Box>
      ) : (
        <>
          <Box>
            Recruit{' '}
            {recruitNumbers > 0 ? <Badge size="3">{recruitNumbers}</Badge> : 0}{' '}
            <Keyword.WoodwalkerWarrior
              hideCount={true}
              count={recruitNumbers.toString()}
            />{' '}
            according to instructions bellow and click execute for crystal
            deduction.
          </Box>
          <Box>
            <ExecuteButton
              done={!recruitNumbers || recruitmentDone}
              onClick={onRecruitment}
            />
          </Box>

          <Box>
            Place Woodwalker Fighter in the indicated outer Forest with the
            smallest number (including zero) of Woodwalker Fighters:
            <ul>
              <li>
                Adjacent to a <Strong>Totem</Strong>.
              </li>
              <li>
                Adjacent to a <Strong>controlled Foundation</Strong>.
              </li>
              <li>
                Adjacent to a (preferably uncontrolled){' '}
                <Strong>possible outer mountain</Strong>, preferring one without
                a Forge.
              </li>
              <li>
                Closest to the <Strong>Drill</Strong>.
              </li>
              <li>
                Use the <Keyword.MagicDie /> if tied.
              </li>
            </ul>
            Repeat this (evaluating where to recruit at again) until the bot
            stops recruiting.
          </Box>
        </>
      )}
    </>
  )
}
