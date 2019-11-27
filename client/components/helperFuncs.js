export const randomNumber = num => {
  return Math.floor(Math.random() * num);
};

export const article = char => {
  const vowels = 'aeiou';
  if (vowels.indexOf(char) !== -1) {
    return 'an';
  }
  return 'a';
};
