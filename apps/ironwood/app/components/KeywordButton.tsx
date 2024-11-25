import { Button, ButtonProps, Dialog, Strong, Text } from '@radix-ui/themes'
import { forwardRef, PropsWithChildren } from 'react'

import { MagicDie } from '~/components/MagicDie'
import { ModalDialog } from '~/components/ModalDialog'
import type { Props as WarriorCountProps } from '~/components/WarriorCount'
import { WarriorCount } from '~/components/WarriorCount'
import { WWWarriorType } from '~/constants/woodenbot'
import { WagerCardPurpose as IronbotWagerCardPurpose } from '~/hooks/ironbot/useWagerCard'
import { WagerCardPurpose as WoodenbotWagerCardPurpose } from '~/hooks/woodenbot/useWagerCard'

import { Attack as IronbotAttack } from './ironbot/keywords/content/Attack'
import { Chase } from './ironbot/keywords/content/Chase'
import { Expand } from './ironbot/keywords/content/Expand'
import { MovingDrill } from './ironbot/keywords/content/MovingDrill'
import { Protect } from './ironbot/keywords/content/Protect'
import { Recruits as IronbotRecruits } from './ironbot/keywords/content/Recruits'
import { WarbandInFocus } from './ironbot/keywords/content/WarbandInFocus'
// import { WagerButton } from '~/components/woodenbot/WagerAttackCardButton'
import { Attack as WoodenbotAttack } from './woodenbot/keywords/content/Attack'
import { Discovers } from './woodenbot/keywords/content/Discovers'
import { Locate } from './woodenbot/keywords/content/Locate'
import { MovementInterfere } from './woodenbot/keywords/content/MovementInterfere'
import { MovementPlunder } from './woodenbot/keywords/content/MovementPlunder'
import { MovementSecure } from './woodenbot/keywords/content/MovementSecure'
import { Recruits as WoodenbotRecruits } from './woodenbot/keywords/content/Recruits'

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
  /**
   * Common keywords
   */
  Card: () => <KeywordInline>Card</KeywordInline>,
  Crystal: () => (
    <KeywordInline>
      Crystal
      {/* <KeywordImg alt="Crystal" src={assetCrystal} /> */}
    </KeywordInline>
  ),
  MagicDie: (props: ButtonProps) => (
    <MagicDie
      triggerButtonComponent={<KeywordButton color="green" {...props} />}
    />
  ),
  // Wager: () => <WagerButton buttonProps={{ size: '3', variant: 'ghost' }} />,

  /**
   * Ironwood specific keywords
   */
  Ironbot: () => <KeywordInline>Ironbot</KeywordInline>,
  Ferrum: () => <KeywordInline>Ferrum</KeywordInline>,
  Forge: () => <KeywordInline>Forge</KeywordInline>,
  Foundation: () => <KeywordInline>Foundation</KeywordInline>,
  Golem: () => <KeywordInline>Golem</KeywordInline>,
  IroncladWarband: () => <KeywordInline>Ironclad Warband</KeywordInline>,
  IroncladWarrior: ({
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
      {parseInt(count) === 1 ? `Ironclad Warrior` : `Ironclad Warriors`}
    </KeywordInline>
  ),
  Mountain: () => <KeywordInline>Mountain</KeywordInline>,
  IroncladDrill: () => <KeywordInline>Drill</KeywordInline>,
  Drill: () => (
    <ModalDialog
      title={<Text color="red">Moving Drill</Text>}
      trigger={<KeywordButton color="red">Drill</KeywordButton>}
    >
      <MovingDrill />
    </ModalDialog>
  ),
  Chase: () => (
    <ModalDialog
      title={<Text color="red">Chase</Text>}
      trigger={<KeywordButton color="red">Chase</KeywordButton>}
    >
      <Chase />
    </ModalDialog>
  ),
  Protect: () => (
    <ModalDialog
      title={<Text color="yellow">Protect</Text>}
      trigger={<KeywordButton color="yellow">Protect</KeywordButton>}
    >
      <Protect />
    </ModalDialog>
  ),
  Expand: () => (
    <ModalDialog
      title={<Text color="orange">Expand</Text>}
      trigger={<KeywordButton color="orange">Expand</KeywordButton>}
    >
      <Expand />
    </ModalDialog>
  ),
  WarbandInFocus: () => (
    <ModalDialog
      title={<Text color="red">Warband in focus</Text>}
      trigger={<KeywordButton color="red">Warband in focus</KeywordButton>}
    >
      <WarbandInFocus />
    </ModalDialog>
  ),
  IronbotAttacks: ({ purpose }: { purpose: IronbotWagerCardPurpose }) => (
    <ModalDialog
      title={<Text color="blue">Attack</Text>}
      trigger={
        <KeywordButton size="3" color="blue" variant="ghost">
          Attacks
        </KeywordButton>
      }
    >
      <IronbotAttack purpose={purpose} />
    </ModalDialog>
  ),
  IronbotRecruits: ({ count }: { count: string }) => (
    <ModalDialog
      title={<Text color="yellow">Recruits</Text>}
      trigger={<KeywordButton color="yellow">Recruits</KeywordButton>}
    >
      <IronbotRecruits count={count} />
    </ModalDialog>
  ),
  /**
   * Woodenbot specific keywords
   */
  Totem: () => <KeywordInline>Totem</KeywordInline>,
  VisionCard: () => <KeywordInline>Vision Card</KeywordInline>,
  Woodenbot: () => <KeywordInline>Woodenbot</KeywordInline>,
  WoodwalkerWarband: ({ count }: { count?: WarriorCountProps['count'] }) => (
    <KeywordInline>
      {count ? (
        <>
          <WarriorCount count={count} />
          &nbsp;
        </>
      ) : null}
      Woodwalker Warband
    </KeywordInline>
  ),
  SpiritCube: ({ count }: { count?: string }) => (
    <KeywordInline>
      {count ? <>{count}&nbsp;</> : null}
      {count && parseInt(count) === 1 ? `Spirit Cube` : `Spirit Cubes`}
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
      {parseInt(count) === 1
        ? `Woodwalker Warrior`
        : `Woodwalker Warriors`}{' '}
    </KeywordInline>
  ),
  Forest: () => <KeywordInline>Forest</KeywordInline>,
  WoodenbotAttacks: ({ purpose }: { purpose: WoodenbotWagerCardPurpose }) => (
    <ModalDialog
      title={<Text color="blue">Attack</Text>}
      trigger={
        <KeywordButton size="3" color="blue" variant="ghost">
          Attacks
        </KeywordButton>
      }
    >
      <WoodenbotAttack purpose={purpose} />
    </ModalDialog>
  ),
  Locate: () => {
    return (
      <ModalDialog
        title={<Text color="yellow">Locate</Text>}
        trigger={<KeywordButton color="yellow">Locate</KeywordButton>}
      >
        <Locate />
      </ModalDialog>
    )
  },
  Discovers: () => (
    <ModalDialog
      title={<Text color="yellow">Discovering a Totem</Text>}
      trigger={<KeywordButton color="yellow">Discovers</KeywordButton>}
    >
      <Discovers />
    </ModalDialog>
  ),
  Secure: ({ count }: { count: string }) => (
    <ModalDialog
      title={<Text color="yellow">Secure</Text>}
      trigger={<KeywordButton color="yellow">Secure</KeywordButton>}
    >
      <MovementSecure count={count} />
    </ModalDialog>
  ),
  Plunder: ({ count }: { count: string }) => (
    <ModalDialog
      title={<Text color="orange">Plunder</Text>}
      trigger={<KeywordButton color="orange">Plunder</KeywordButton>}
    >
      <MovementPlunder count={count} />
    </ModalDialog>
  ),
  Interfere: ({
    count,
    countType,
  }: KeywordButtonProps & {
    count: string
    countType?: WWWarriorType
  }) => (
    <ModalDialog
      title={<Text color="red">Interfere</Text>}
      trigger={<KeywordButton color="red">Interfere</KeywordButton>}
    >
      <MovementInterfere count={count} countType={countType} />
    </ModalDialog>
  ),
  WoodenbotRecruits: ({ count }: { count: string }) => (
    <ModalDialog
      title={<Text color="yellow">Recruits</Text>}
      trigger={<KeywordButton color="yellow">Recruits</KeywordButton>}
    >
      <WoodenbotRecruits count={count} />
    </ModalDialog>
  ),
}
