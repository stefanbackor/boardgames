import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronUpIcon,
  DoubleArrowDownIcon,
  DoubleArrowUpIcon,
} from '@radix-ui/react-icons'
import {
  Badge,
  Button,
  ButtonProps,
  ChevronDownIcon,
  Flex,
  Inset,
  Table,
} from '@radix-ui/themes'
import sample from 'lodash/sample'
import {
  cloneElement,
  FunctionComponentElement,
  MouseEventHandler,
  useCallback,
  useState,
} from 'react'

import { IS_STORYBOOK } from '~/constants/environment'

import { ModalDialog } from './ModalDialog'

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
    symbols: <ArrowUpIcon />,
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
    symbols: <ArrowDownIcon />,
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

  const rollAndCommit = useCallback(() => {
    setRolls((rolls) => [...rolls, doRoll()])
  }, [])

  const onAddRoll = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.preventDefault()
      rollAndCommit()
    },
    [rollAndCommit],
  )

  const onClear = useCallback<MouseEventHandler<HTMLButtonElement>>((event) => {
    event.preventDefault()
    setRolls([])
  }, [])

  const latestRoll = FACES[rolls[rolls.length - 1]]
  const triggerButtonLabel = (
    <Flex justify="center" align="center" gap="1">
      Magic Die {latestRoll?.symbols}
    </Flex>
  )
  const triggerButton = triggerButtonComponent ? (
    cloneElement<ButtonProps>(
      triggerButtonComponent as unknown as FunctionComponentElement<ButtonProps>,
      undefined,
      [triggerButtonLabel],
    )
  ) : (
    <Button>{triggerButtonLabel}</Button>
  )

  return (
    <ModalDialog
      title="Magic Die"
      trigger={triggerButton}
      action={
        <Flex direction="row" justify="center" gap="2">
          <Button variant="soft" onClick={onClear}>
            Clear
          </Button>
          <Button onClick={onAddRoll}>Add Roll</Button>
        </Flex>
      }
      description='Click "Roll" to get magic die&apos;s value.'
    >
      {rolls.length > 0 && (
        <Inset
          clip="padding-box"
          side="top"
          pb="current"
          pt="current"
          mt="current"
        >
          <Table.Root size="1" variant="ghost">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell align="right" width="50px">
                  #
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center" width="150px">
                  Symbol
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell width="auto">
                  Region
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {rolls.map((roll, index) => {
                const face = FACES[roll]
                return (
                  <Table.Row key={index}>
                    <Table.RowHeaderCell align="right" width="50px">
                      {index + 1}
                    </Table.RowHeaderCell>
                    <Table.Cell align="center" width="150px">
                      {face.symbols}
                    </Table.Cell>
                    <Table.Cell width="auto">
                      {face.text} {face.hint}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table.Root>
        </Inset>
      )}
    </ModalDialog>
  )
}
