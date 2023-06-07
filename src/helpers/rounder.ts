export function rounder(inputValue: number, delta: number): number {
  const roundedDown = Math.floor(inputValue / delta) * delta;
  const roundedUp = Math.ceil(inputValue / delta) * delta;

  const differenceDown = inputValue - roundedDown;
  const differenceUp = roundedUp - inputValue;

  if (differenceDown < differenceUp) {
    return roundedDown;
  } else {
    return roundedUp;
  }
}