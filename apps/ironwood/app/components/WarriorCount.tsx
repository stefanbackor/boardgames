import { Strong } from '@radix-ui/themes'

export type Props = {
  count: string
}

export const WarriorCount = ({ count }: Props) => {
  return <Strong>{count}</Strong>
}
