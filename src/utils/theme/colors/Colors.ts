export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  coralRed: '#FF3C38',
  coralRedLight: '#FF3C3840',
  darkGunMetal: '#151C30',
  antiFlashWhite: '#F2F2F2',
  mistyRose: '#FDE2E2',
  dimGrey: '#67696E',
  raisinBlack: '#201F1F',
  charcoal: '#374151',
  chineseSilver: '#C4C4C4',
  brightGrey: '#E5E5E5',
  red30: '#FFE5E5',
  red10: '#FF0000',
  jet: '#343434',
  outerSpace: '#4A4A4A',
  romanSilver: '#7C8290',
  lightSilver: '#D8D8D8',
  silverChalice: '#ACACAC',
  brightGray:'#EBEEF6',
  argent:'#C0C0C0'
};

export const getColorVariant = (color: string, shade: string) => color + shade;

export const getRandomColor = () => {
  const colors = Object.values(Colors);
  return colors[Math.floor(Math.random() * colors.length)];
};
