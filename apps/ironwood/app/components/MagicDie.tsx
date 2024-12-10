import {
  ChevronDownIcon,
  ChevronUpIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
} from '@radix-ui/react-icons'
import { Badge, Button, ButtonProps, Flex } from '@radix-ui/themes'
import sample from 'lodash/sample'
import {
  cloneElement,
  FunctionComponentElement,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react'

import { IS_STORYBOOK } from '~/constants/environment'

const FACES = [
  {
    symbols: <DoubleArrowUpIcon />,
    badge: (
      <Badge size="1" highContrast color="blue">
        <DoubleArrowUpIcon />
      </Badge>
    ),
    text: 'Highest Even',
    hint: '(16,14,12)',
  },
  {
    symbols: <ChevronUpIcon />,
    badge: (
      <Badge size="1" highContrast color="blue">
        <ChevronUpIcon />
      </Badge>
    ),
    text: 'Highest Odd',
    hint: '(15,13,11)',
  },
  {
    symbols: <DoubleArrowDownIcon />,
    badge: (
      <Badge size="1" highContrast color="red">
        <DoubleArrowDownIcon />
      </Badge>
    ),
    text: 'Lowest Even',
    hint: '(2,4,6)',
  },
  {
    symbols: <ChevronDownIcon />,
    badge: (
      <Badge size="1" highContrast color="red">
        <ChevronDownIcon />
      </Badge>
    ),
    text: 'Lowest Odd',
    hint: '(1,3,5)',
  },
]

type MagicDieProps = {
  triggerButtonComponent?: React.ReactNode
}

const doRoll = () => sample(IS_STORYBOOK ? [0] : [0, 1, 2, 3])

export const MagicDie = ({ triggerButtonComponent }: MagicDieProps) => {
  const [rolls, setRolls] = useState<number[]>([doRoll()])
  const [isRolling, setIsRolling] = useState(false)

  const rollAndCommit = useCallback(() => {
    setRolls((rolls) => [...rolls, doRoll()])
  }, [])

  const onAddRoll = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      setIsRolling(true)
      const timeout = setTimeout(() => {
        event.preventDefault()
        rollAndCommit()
        setIsRolling(false)
      }, 500)
      return () => clearTimeout(timeout)
    },
    [rollAndCommit],
  )

  const latestRoll = FACES[rolls[rolls.length - 1]]
  const triggerButtonLabel = (
    <Flex direction="row" align="center">
      Magic Die ({latestRoll?.symbols})
    </Flex>
  )
  const triggerButtonTitle = `${latestRoll?.text} ${latestRoll?.hint}`

  return (
    <>
      {triggerButtonComponent ? (
        cloneElement<ButtonProps>(
          triggerButtonComponent as unknown as FunctionComponentElement<ButtonProps>,
          { onClick: onAddRoll, loading: isRolling, title: triggerButtonTitle },
          [triggerButtonLabel],
        )
      ) : (
        <Button
          onClick={onAddRoll}
          loading={isRolling}
          title={triggerButtonTitle}
        >
          {triggerButtonLabel}
        </Button>
      )}
    </>
  )
}
