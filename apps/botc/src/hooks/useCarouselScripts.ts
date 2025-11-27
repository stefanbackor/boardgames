import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { CarouselScript } from '@/types'

// Re-export for backward compatibility
export type { CarouselScript }

/**
 * Hook that provides carousel scripts with translated names
 * @returns Array of carousel scripts with translated names
 */
export function useCarouselScripts(): CarouselScript[] {
  const { t } = useTranslation('content')

  return useMemo(() => {
    const CAROUSEL_SCRIPTS_DATA = [
      {
        name: 'Anonymous Dishonesty',
        url: 'https://www.botcscripts.com/api/scripts/6391/json/',
        flavor: t(
          "The Ojo must choose their kills carefully to avoid setting off a Banshee or creating a chain of Farmers... if there's an evil team, which there might not be in Anonymous Dishonesty.",
        ),
      },
      {
        name: 'Contempt',
        url: 'https://www.botcscripts.com/api/scripts/11420/json/',
        flavor: t(
          'Built around the Vizier and the Bounty Hunter, Contempt has lots of interesting opportunities for evil-turned Townsfolk to find their teammates.',
        ),
      },
      {
        name: 'Devout Theists',
        url: 'https://www.botcscripts.com/api/scripts/5729/json/',
        flavor: t(
          "The forces of evil may be more widespread than you expect in Devout Theists. Can the powerful Townsfolk take down the Demon(s) before they're taken out by a Psychopath or overwhelmed by Legion?",
        ),
      },
      {
        name: "Harold Holt's Revenge ",
        url: 'https://www.botcscripts.com/api/scripts/5078/json/',
        flavor: t(
          "It's Laissez Un Faire, all grown up! Harold Holt's Revenge gives the town 5 days to defeat the Leviathan, but they'll have to do so while covering for the Damsel and avoiding the pitfalls of a Pit-Hag, Politician, and more.",
        ),
      },
      {
        name: 'Insanity and Intuition',
        url: 'https://www.botcscripts.com/api/scripts/3695/json/',
        flavor: t(
          'Originally built around the Harpy & High Priestess, Insanity & Intuition is overflowing with madness and muddled information. Get out your gut reads to get on the right track!',
        ),
      },
      {
        name: 'Irrational Behaviour',
        url: 'https://www.botcscripts.com/api/scripts/13443/json/',
        flavor: t(
          "With a Hermit, Wizard, and Wraith, you can be certain shenanigans are afoot. What's not to love about Irrational Behaviour?",
        ),
      },
      {
        name: 'The Midnight Oasis',
        url: 'https://www.botcscripts.com/api/scripts/148/json/',
        flavor: t(
          "An Al-Hadikhia, a Vigormortis, or a dastardly Storyteller is at bay, and it's the town's job to figure out which. The Midnight Oasis is chock full of characters that can mess with the townsfolk, but who's doing the messing?",
        ),
      },
      {
        name: 'Monkey Do Math',
        url: 'https://www.botcscripts.com/api/scripts/13552/json/',
        flavor: t(
          "Originally built to test the updates to the Acrobat, Alchemist, Lycanthrope, and Organ Grinder, Monkey Do Math is a puzzle full of misregistration and mystery. Even if good can figure out who's evil, they'll have to work together to execute correctly!",
        ),
      },
      {
        name: 'The Ones You Least Expect',
        url: 'https://www.botcscripts.com/api/scripts/5085/json/',
        flavor: t(
          "Town has a lot of strong information available, but needs to be careful about relying on it all game, as trusted good players may not stay trustworthy for long. It's always The Ones You Least Expect.",
        ),
      },
      {
        name: 'Punchy',
        url: 'https://www.botcscripts.com/api/scripts/13007/json/',
        flavor: t(
          "Look out, evil: there's a Princess in town, and she's feeling rather Punchy. The evil team is loud and devastating, but good can work together to overcome the dangers of the Psychopath, Vizier, and Harpy.",
        ),
      },
      {
        name: 'Quick Maths',
        url: 'https://www.botcscripts.com/api/scripts/12516/json/',
        flavor: t(
          'Built around new Riot, good players will have to do some Quick Maths in order to nominate correctly on the final day. But look out - the Marionette and Boffin mean that even seemingly good players might not be good!',
        ),
      },
      {
        name: 'Revenge of the Martian Vampires',
        url: 'https://www.botcscripts.com/api/scripts/881/json/',
        flavor: t(
          "The winner of the Heretic script competition, Revenge of the Martian Vampires is a tried-and-tested tale of two teams trying to figure out what it takes to win. The General can lead good to victory, but only if they're careful to share their information to the right players!",
        ),
      },
      {
        name: 'Whose Cult Is It Anyway?',
        url: 'https://www.botcscripts.com/api/scripts/10209/json/',
        flavor: t(
          "Welcome to Whose Cult Is It Anyway?, the game show where the Cult Leader is Storm Caught and anything can happen! Evil's on the lookout for alternate win conditions as far as the eye can see, but good is stacked with power to combat the extra Minion coming from the Lord of Typhon and Lil' Monsta.",
        ),
      },
    ]

    return CAROUSEL_SCRIPTS_DATA.map(
      (script) =>
        ({
          key: script.name,
          name: script.name,
          url: script.url,
          flavor: script.flavor,
        }) satisfies CarouselScript,
    )
  }, [t])
}
