import { ChevronUpIcon } from '@radix-ui/react-icons'
import { Button, ChevronDownIcon, Separator } from '@radix-ui/themes'

type Props = {
  full: boolean
  onClick: () => void
}

export const FullInstructionsButton = ({ full, onClick }: Props) => {
  return (
    <>
      <Separator size="4" />
      <Button
        color="gray"
        variant="soft"
        onClick={onClick}
        data-testid="full-instructions"
      >
        Full instructions {full ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
    </>
  )
}
