const fixNumbers = (num) => {
  num = num
    .replace("۱", 1)
    .replace("٢", 2)
    .replace("٣", 3)
    .replace("٤", 4)
    .replace("٥", 5)
    .replace("٦", 6)
    .replace("٧", 7)
    .replace("٨", 8)
    .replace("٩", 9)
    .replace("٠", 0);

  return num ;
};
export default fixNumbers;
