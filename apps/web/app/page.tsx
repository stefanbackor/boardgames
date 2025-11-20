'use client'

import {
  Avatar,
  Card,
  Flex,
  Heading,
  Link,
  Separator,
  Strong,
  Text,
} from '@radix-ui/themes'
import Obfuscate from 'react-obfuscate'

export default function Home(): React.JSX.Element {
  return (
    <Flex direction="column" gap="3" p="6">
      <Heading size="9" my="3">
        Board&shy;games <br />
        with Stefan
      </Heading>
      <Text size="3">
        Hello there! 👋 I’m Stefan 🦦, a full-stack software engineer 🎪 based
        in Slo&shy;vakia 🇸🇰. I’m passionate about board games 🍄 and enjoy
        playing them with friends 🎳 or solo 🎲.
      </Text>
      <Text size="3">
        This space is my creative playground 🪀 where I explore UI/UX concepts
        🔮 ex&shy;pe&shy;riment with new technologies ⚔️, and share my projects
        and passions with the world 🪐.
      </Text>
      <Text size="3">
        Feel free to reach out to me via{' '}
        <Link asChild target="_blank" wrap="nowrap" underline="always">
          <Obfuscate
            href="mailto:stevo@backor.sk"
            linkText="email"
            obfuscateChildren={false}
          >
            email
          </Obfuscate>
        </Link>
        . Enjoy your visit!&nbsp;🪇
      </Text>
      <Separator size="4" my="2" />
      <Flex direction="column" justify="center" gap="3">
        <Link href="https://ironwood.backor.sk" target="_blank" color="green">
          <Card>
            <Flex gap="3" align="center">
              <Avatar
                size="6"
                src="https://cf.geekdo-images.com/bHjyk23An87Hl0ZuA91sTg__imagepage/img/aOKMmDugCEytHTkaNqlCC-H978U=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7885912.jpg"
                fallback="IW"
                radius="full"
              />
              <Flex direction="column">
                <Text as="div" size="5" weight="bold">
                  Ironwood Solo App
                </Text>
                <Text as="div" size="2" color="gray">
                  Asymmetric card-driven tactical duel.
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Link>

        <Card style={{ opacity: '0.5', filter: 'grayscale(1)' }}>
          <Flex gap="3" align="center">
            <Avatar
              size="6"
              src="https://cf.geekdo-images.com/ar_YhktX6VcXBLcEfnu_dw__imagepage/img/cg3Ou2SXJwzxfITKF0uTA-rTt_I=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7464921.png"
              fallback="IW"
              radius="full"
            />
            <Flex direction="column">
              <Text as="div" size="5" weight="bold">
                Kutna Hora (Coming soon)
              </Text>
              <Text as="div" size="2" color="gray">
                Develop a medieval city, but mind the ever-changing economy! A
                fan made Capek solo variant coming soon.
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Flex>

      <Separator size="4" my="2" />

      <Flex gap="2" justify="center" align="center" wrap="wrap">
        <Link asChild target="_blank" wrap="nowrap" underline="always">
          <Obfuscate
            href="https://www.linkedin.com/in/stefanbackor/"
            linkText="Linkedin"
            obfuscateChildren={false}
          >
            <Strong>Linkedin</Strong>
          </Obfuscate>
        </Link>

        <Separator orientation="vertical" size="1" />

        <Link asChild target="_blank" wrap="nowrap" underline="always">
          <Obfuscate
            href="mailto:stevo@backor.sk"
            linkText="Email"
            obfuscateChildren={false}
          >
            <Strong>Email</Strong>
          </Obfuscate>
        </Link>
      </Flex>

      <Separator size="4" my="2" />

      <Text size="1" color="gray">
        All content released under{' '}
        <Link href="https://mit-license.org/" target="_blank">
          MIT license
        </Link>
        . Source code available on{' '}
        <Link href="https://github.com/stefanbackor/boardgames" target="_blank">
          GitHub
        </Link>
        . Contributions are welcome. Author is not affiliated with any
        boardgames publisher.
      </Text>
    </Flex>
  )
}
