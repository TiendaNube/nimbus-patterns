export const generateID = (name: string) =>
  `${name.toLowerCase().replace(/ /g, "-")}_${Math.random()}`;
