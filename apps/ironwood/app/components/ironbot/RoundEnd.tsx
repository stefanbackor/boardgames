import { Badge, Box, Heading } from '@radix-ui/themes'
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

  // 3 crystals are necessary to save after recruiting is done.
  const crystalsAvailable = Math.max(crystals - 3, 0)
  const recruitNumbers = Math.floor(
    (recruitmentCrystals || crystalsAvailable) / 2,
  )

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
        cards. Check your hand limit of action cards (8 including base cards).
      </Box>
      <Heading as="h3">Fade Totem</Heading>
      <Box>
        Discovered Totems on the board are flipped to their fading side, or if
        they were already on their fading side, they are removed.
      </Box>
      <Heading as="h3">Recruitment</Heading>

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
        Use the following priority list when recruiting for the Ironbot, placing
        an Ironclad Fighter at the indicated location:
        <ul>
          <li>Ferrum, if there are less than 3 Fighters in Ferrum</li>
          <li>
            The Forge with the smallest Ironclad Warband (including Ferrum)
          </li>
          <li>
            In case of a tie, use the <Keyword.MagicDie />
          </li>
        </ul>
        Repeat this (evaluating where to recruit at again) until the bot stops
        recruiting.
      </Box>
    </>
  )
}
