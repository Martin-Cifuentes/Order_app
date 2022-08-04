const fs = require('fs')
export default function handler (req, res) {
    const {body} = req
    console.log("LA PUTA MADREEEE")
        
    console.log(body)
    fs.readFile(body, 'utf8', (err, data) => {
        console.log("Ando dentro") 
        if (err) {
            res.status(500).send({err})
        }
        console.log(data)
        res.status(200).send({data})
    })
}