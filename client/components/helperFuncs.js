export const randomNumber = num => {
  return Math.floor(Math.random() * num);
};

export const addArticle = string => {
  const vowels = 'aeiou';
  if (vowels.indexOf(string[0]) !== -1) {
    return `an ${string}`;
  }
  return `a ${string}`;
};
