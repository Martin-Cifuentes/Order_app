const fs = require('fs')
export default function handler (req, res) {
    console.log("INSIDEEEEEE")
    
    const {body} = req

    fs.writeFile('public/result.txt', body, (err) => {
        if (err) throw err;
        console.log("Guardado!")
        res.status(200).send("Logrado!")
    })

    //res.status(500).send("No logrado!")

}