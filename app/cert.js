const fs = require('fs')

const content = 'Some content!'

fs.writeFile('./req', content, err => {
    if (err) {
        console.error(err)
        return
    }
})