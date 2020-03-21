module.exports = function handleError(res, err) {
  console.log(err);
  res.status(418).send('an error occurred: ' + err);
}
