const regex = /^[0-9]*$/;
export const replaceToNumber = (event: any) => {
  const input = event.target.value;
  // console.log('replaceToNumber ', input);

  if (!regex.test(input)) {
    return input.replace(/[^0-9]/g, '');
  }
  return input;
};

export const acceptOnlyNumber = (event: any) => {
  // console.log(event, event.keyCode, event.key);
  if (
    [46, 8, 9, 27, 13, 110, 190].indexOf(event.keyCode) !== -1 ||
    // Allow: Ctrl+A
    (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+C
    (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+V
    (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
    // Allow: Ctrl+X
    (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
    // Allow: home, end, left, right
    (event.keyCode >= 35 && event.keyCode <= 39)
  ) {
    // let it happen, don't do anything
    return;
  }
  // Ensure that it is a number and stop the keypress
  if (
    (event.shiftKey || event.keyCode < 48 || event.keyCode > 57) &&
    (event.keyCode < 96 || event.keyCode > 105)
  ) {
    event.preventDefault();
  }
};
