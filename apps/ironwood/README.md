# Ironwood solo app

## About the game

Ironwood is a rules-light, highly asymmetric, card-driven tactical game for 1-2 players. Each round, you and your opponent alternate playing a total of 3 of your faction-specific cards for their action effects. These effects include positioning your warbands, initiating combat, extracting crystals, bestowing temporary passive effects, and many more. When combat occurs, you will use the same cards for their combat values instead, in a simultaneous bid to gain combat bonuses, inflict and fend off casualties, and augment the Dominance value of your warbands to win the combat.

- Designers: Maël Brunet, Julien Chaput
- Solo Designers: Xavi Bordes Aymerich, Dávid Turczi
- Publishers: Mindclash Games, Super Meeple

Source: [boardgamegeek.com](https://boardgamegeek.com/boardgame/407343/ironwood)

## Disclaimer

Author if this solo app is not affiliated with the publishers.

## Contribution

This app is part of [stefanbackor/boardgames](https://github.com/stefanbackor/boardgames) monorepo and is licensed under MIT license. Contributions to this project are welcome. Please fork the repository and follow contribution guidelines.

## Stack

- App is build on top of [Remix](https://remix.run/) framework as a single page application.
- App uses beautiful [Radix Themes](https://www.radix-ui.com/) UI components.
- App utilizes `history.state` for app state management which allows player to navigate back to previous page to correct any mistake. Some state gets transfered to next page.

### Local development

- Run `yarn install` to install all dependencies.
- Run `npx turbo build --filter="./packages/*"` to build all local dependencies.
- Run `npx turbo dev --filter=ironwood` to initiate local dev instance.
