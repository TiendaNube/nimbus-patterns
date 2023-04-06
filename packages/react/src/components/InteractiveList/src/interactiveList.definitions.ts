const uniqueId = () => `${Math.floor(Math.random() * Date.now() + 1)}`;

export const generateID = (name: string) =>
  `${name.toLowerCase().replace(/ /g, "-")}_${uniqueId()}`;
