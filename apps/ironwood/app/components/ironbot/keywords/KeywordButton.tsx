import { Button, ButtonProps, Strong, Text } from '@radix-ui/themes'
import { forwardRef, PropsWithChildren } from 'react'

import { MagicDie } from '~/components/MagicDie'
// import { ModalDialog } from '~/components/ModalDialog'

// type KeywordButtonProps = {
//   dialogProps?: Dialog.RootProps
// }

const KeywordInline = ({ children }: PropsWithChildren) => (
  <Strong>{children}</Strong>
)

const KeywordButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => (
    <Button size="3" variant="ghost" {...rest} ref={ref}>
      <Text weight="bold">{children}</Text>
    </Button>
  ),
)

KeywordButton.displayName = 'KeywordButton'

export const Keyword = {
  Ironbot: () => <KeywordInline>Ironbot</KeywordInline>,
  IroncladWarband: () => <KeywordInline>Ironclad Warband</KeywordInline>,
  IroncladFighter: () => (
    <KeywordInline>
      Ironclad Fighter{' '}
      {/* <KeywordImg alt="Ironclad Warrior" src={assetIroncladWarrior} /> */}
    </KeywordInline>
  ),
  IroncladDrill: () => <KeywordInline>Drill</KeywordInline>,
  WoodwalkerWarband: () => <KeywordInline>Woodwalker Warband</KeywordInline>,
  Foundation: () => <KeywordInline>Foundation</KeywordInline>,
  Crystal: () => <KeywordInline>Crystal</KeywordInline>,
  Forrest: () => <KeywordInline>Forrest</KeywordInline>,
  Totem: () => <KeywordInline>Totem</KeywordInline>,
  Expend: () => <KeywordInline>Expend</KeywordInline>,
  // Wager: () => <WagerButton buttonProps={{ size: '3', variant: 'ghost' }} />,
  MagicDie: (props: ButtonProps) => (
    <MagicDie
      triggerButtonComponent={<KeywordButton color="green" {...props} />}
    />
  ),
}
