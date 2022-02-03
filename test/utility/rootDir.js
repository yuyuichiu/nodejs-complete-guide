const path = require('path')

// Return root file path
// Purpose: saves you time typing '../' into path.join(), just get root path from this instead.
module.exports = path.dirname(process.main.filename)