import { Button, ButtonProps, Dialog, Strong, Text } from '@radix-ui/themes'
import { forwardRef, PropsWithChildren } from 'react'

import { MagicDie } from '~/components/MagicDie'
import { ModalDialog } from '~/components/ModalDialog'
import type { Props as WarriorCountProps } from '~/components/WarriorCount'
import { WarriorCount } from '~/components/WarriorCount'
import { WWWarriorType } from '~/constants/woodenbot'

// import { WagerButton } from '~/components/woodenbot/WagerAttackCardButton'
import { Attack } from './content/Attack'
import { Discovers } from './content/Discovers'
import { Locate } from './content/Locate'
import { MovementInterfere } from './content/MovementInterfere'
import { MovementPlunder } from './content/MovementPlunder'
import { MovementSecure } from './content/MovementSecure'
import { Recruits } from './content/Recruits'

// import assetTotem from "~/assets/totem.png";
// import assetCrystal from "~/assets/crystal.png";
// import assetWoodwalkerWarrior from "~/assets/woodwalker-warrior.png";
// import assetIroncladWarrior from "~/assets/ironclad-warrior.png";

type KeywordButtonProps = {
  dialogProps?: Dialog.RootProps
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const KeywordImg = (_props: React.ImgHTMLAttributes<HTMLImageElement>) =>
  // <img
  //   alt="Keyword without alt text"
  //   {...props}
  //   style={{
  //     height: "var(--line-height, 1em)",
  //     verticalAlign: "bottom",
  //   }}
  // />
  null

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
  Card: () => <KeywordInline>Card</KeywordInline>,
  VisionCard: () => <KeywordInline>Vision Card</KeywordInline>,
  Crystal: () => (
    <KeywordInline>
      Crystal
      {/* <KeywordImg alt="Crystal" src={assetCrystal} /> */}
    </KeywordInline>
  ),
  Ferrum: () => <KeywordInline>Ferrum</KeywordInline>,
  Forge: () => <KeywordInline>Forge</KeywordInline>,
  Foundation: () => <KeywordInline>Foundation</KeywordInline>,
  Totem: () => (
    <KeywordInline>
      Totem
      {/*  <KeywordImg alt="Totem" src={assetTotem} /> */}
    </KeywordInline>
  ),
  Ironbot: () => <KeywordInline>Ironbot</KeywordInline>,
  Woodenbot: () => <KeywordInline>Woodenbot</KeywordInline>,
  WoodwalkerWarband: ({ count }: { count?: WarriorCountProps['count'] }) => (
    <KeywordInline>
      {count ? (
        <>
          <WarriorCount count={count} />
          &nbsp;
        </>
      ) : null}{' '}
      Woodwalker Warband
    </KeywordInline>
  ),
  SpiritCube: ({ count }: { count?: string }) => (
    <KeywordInline>
      {count ? <>{count}&nbsp;</> : null}
      {count && parseInt(count) > 1 ? `Spirit Cubes` : `Spirit Cube`}
    </KeywordInline>
  ),
  WoodwalkerWarrior: ({
    count,
    hideCount,
  }: WarriorCountProps & { hideCount?: boolean }) => (
    <KeywordInline>
      {!hideCount && Boolean(parseInt(count)) && (
        <>
          <WarriorCount count={count} />
          &nbsp;
        </>
      )}
      {parseInt(count) > 1 ? `Woodwalker Warriors` : `Woodwalker Warrior`}{' '}
      {/* <KeywordImg alt="Woodwalker Warrior" src={assetWoodwalkerWarrior} /> */}
    </KeywordInline>
  ),
  IroncladWarband: () => <KeywordInline>Ironclad Warband</KeywordInline>,
  IroncladFighter: () => (
    <KeywordInline>
      Ironclad Fighter{' '}
      {/* <KeywordImg alt="Ironclad Warrior" src={assetIroncladWarrior} /> */}
    </KeywordInline>
  ),
  Mountain: () => <KeywordInline>Mountain</KeywordInline>,
  Forrest: () => <KeywordInline>Forrest</KeywordInline>,
  IroncladDrill: () => <KeywordInline>Drill</KeywordInline>,
  //
  Attacks: ({ dialogProps }: KeywordButtonProps) => (
    <ModalDialog
      title={<Text color="blue">Attack</Text>}
      trigger={
        <KeywordButton size="3" color="blue" variant="ghost">
          Attacks
        </KeywordButton>
      }
      dialogProps={dialogProps}
    >
      <Attack />
    </ModalDialog>
  ),
  Expend: () => <KeywordInline>Expend</KeywordInline>,
  // Wager: () => <WagerButton buttonProps={{ size: '3', variant: 'ghost' }} />,
  MagicDie: (props: ButtonProps) => (
    <MagicDie
      triggerButtonComponent={<KeywordButton color="green" {...props} />}
    />
  ),
  Locate: ({ dialogProps }: KeywordButtonProps) => {
    return (
      <ModalDialog
        title={<Text color="yellow">Locate</Text>}
        trigger={<KeywordButton color="yellow">Locate</KeywordButton>}
        dialogProps={dialogProps}
      >
        <Locate />
      </ModalDialog>
    )
  },
  Discovers: ({ dialogProps }: KeywordButtonProps) => (
    <ModalDialog
      title={<Text color="yellow">Discovering a Totem</Text>}
      trigger={<KeywordButton color="yellow">Discovers</KeywordButton>}
      dialogProps={dialogProps}
    >
      <Discovers />
    </ModalDialog>
  ),
  Secure: ({ dialogProps, count }: KeywordButtonProps & { count: string }) => {
    return (
      <ModalDialog
        title={<Text color="yellow">Secure</Text>}
        trigger={<KeywordButton color="yellow">Secure</KeywordButton>}
        dialogProps={dialogProps}
      >
        <MovementSecure count={count} />
      </ModalDialog>
    )
  },
  Plunder: ({ dialogProps, count }: KeywordButtonProps & { count: string }) => {
    return (
      <ModalDialog
        title={<Text color="orange">Plunder</Text>}
        trigger={<KeywordButton color="orange">Plunder</KeywordButton>}
        dialogProps={dialogProps}
      >
        <MovementPlunder count={count} />
      </ModalDialog>
    )
  },
  Interfere: ({
    dialogProps,
    count,
    countType,
  }: KeywordButtonProps & {
    count: string
    countType?: WWWarriorType
  }) => {
    return (
      <ModalDialog
        title={<Text color="red">Interfere</Text>}
        trigger={<KeywordButton color="red">Interfere</KeywordButton>}
        dialogProps={dialogProps}
      >
        <MovementInterfere count={count} countType={countType} />
      </ModalDialog>
    )
  },
  Recruits: ({
    dialogProps,
    count,
  }: KeywordButtonProps & { count: string }) => {
    return (
      <ModalDialog
        title={<Text color="yellow">Recruits</Text>}
        trigger={<KeywordButton color="yellow">Recruits</KeywordButton>}
        dialogProps={dialogProps}
      >
        <Recruits count={count} />
      </ModalDialog>
    )
  },
}
