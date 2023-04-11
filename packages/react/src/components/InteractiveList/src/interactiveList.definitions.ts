export const generateID = (name: string) =>
  `${name.toLowerCase().replace(/ /g, "-")}_${Math.floor(
    Math.random() * Date.now() + 1
  )}`;
