const convertToTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  seconds = seconds < 10 ? '0' + seconds : seconds; // displays seconds as two digits
  return `${minutes}:${seconds}`;
};

module.exports = {
  convertToTime
}
