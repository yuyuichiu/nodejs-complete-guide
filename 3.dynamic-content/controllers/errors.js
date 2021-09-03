
// Variable names can include number as long as we don't start one with it.
exports.error404 = (req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir , 'views', '404.html'))
  res.render('404', { pageTitle: 'Error' })
}