module.exports = function handleError(res, err) {
  console.log(err);
  res.status(400).send('an error occurred: ' + err);
}
