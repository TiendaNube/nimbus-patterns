# `@nimbus-ds/productupdates`

[![@nimbus-ds/productupdates](https://img.shields.io/npm/v/@nimbus-ds/productupdates?label=%40nimbus-ds%2Fproductupdates)](https://www.npmjs.com/package/@nimbus-ds/productupdates)

ProductUpdates component allows the user to showcase new features or updates in a non-distractive way by displaying the information in a floating popover with a high-contrast setting that catches the eye of the user.

## Installation

```sh
$ yarn add @nimbus-ds/productupdates
# or
$ npm install @nimbus-ds/productupdates
```

## Paginator appearance

`ProductUpdates.Paginator` accepts an optional `appearance` input:

- `"primary"` (default): dots for the primary popover surface (`neutral-background` active dot, `primary-textLow` inactive dots).
- `"neutral"`: dots for a `neutral-background` surface (`primary-interactive` active dot, `neutral-interactiveHover` inactive dots).

The dots are decorative: the row is a single image named by `aria-label` (default `Step N of M`) and is not interactive.
