function normalizeDate(datePath) {
  if (datePath < 10) {
    return '0' + datePath;
  }
  return datePath;
}

let newDate = () => {
  let date = new Date();
  return (
    date.getFullYear() +
    '-' +
    normalizeDate(date.getMonth() + 1) +
    '-' +
    normalizeDate(date.getDate())
  );
};

export default newDate;
