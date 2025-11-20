import { Flex, Text } from '@radix-ui/themes'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LoadingIndicator() {
  const { t } = useTranslation()

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="4"
      style={{ minHeight: '300px' }}
    >
      <Flex align="center" gap="3">
        <Loader2
          size={24}
          style={{ animation: 'spin 1s linear infinite' }}
        />
        <Text size="5" color="gray">
          {t('Loading script')}
        </Text>
      </Flex>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Flex>
  )
}
