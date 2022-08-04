import Head from "next/head"
import { useRef } from 'react'

export default function File() {

    const fileRef = useRef()
    const separatorRef = useRef()
    let dataArr = []

    let mergeSort = array => {
        
        let l = 0
        let r = array.length
        let m = Math.round((r - l)/2)

        if (r === 1) {
            return   // returns recursively
        }
    
        let L = []   // left half of current array
        let R = []   // right half of current array
    
        for (let i = l; i < m; i++) {
            L.push(array[i])
        }
        for (let j = m; j < r; j++) {
            R.push(array[j])
        }
    
        mergeSort(L)
        mergeSort(R)
    
        let i = 0, j = 0, k = 0
    
        // Merging part
        while (i < L.length && j < R.length) {
            if (L[i].toLowerCase() < R[j].toLowerCase()) {
                array[k] = L[i]
                i++
            } else {
                array[k] = R[j]
                j++
            }
          
            k++
        }
    
        while (i < L.length) {
            array[k] = L[i]
            i++
            k++
        }
    
        while (j < R.length) {
            array[k] = R[j]
            j++
            k++
        }
    }

    let handleSubmit = async e => {
        e.preventDefault()

        let fileAddress = fileRef.current.value
        let fileSeparator = separatorRef.current.value

        const response = await fetch("http://localhost:3000/api/file/order", {
            method: 'POST',
            body: JSON.stringify(fileAddress),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let data = await response.json()
        console.log(data.data)

        // En lugar de \n debe ser por separador elegido.
        let array = data.data.split("\n")
        mergeSort(array)
        console.log(array)
        dataArr = array



    }

    let handleUpload = async e => {
        e.preventDefault();

        const response = await fetch('http://localhost:3000/api/file/upload')
            .then(response => response)
        // Convertir response a String
        fileRef.current.value = "Enviar string"
    }

    let handleDownload = async e => {
        e.preventDefault();

        let data = dataArr.join("\n")
        console.log("Download")
        console.log(data)

        const response = await fetch("http://localhost:3000/api/file/download",{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

    return (

        <div>

            <Head>
                <title>Next.js</title>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootswatch/4.4.1/flatly/bootstrap.min.css"
                />
            </Head>


            <h1>Load File</h1>
            <button onClick={handleUpload}>Upload</button>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "inline-block", margin: "0px 10px 0px 0px" }}>
                    <h5>Allowed files .csv .txt</h5>
                    <input type="text" placeholder='File.txt' ref={fileRef} />
                </div>
                <div style={{ display: "inline-block", margin: "0px 0px 0px 10px" }}>
                    <h5>Separator Character</h5>
                    <input type="text" ref={separatorRef} />
                </div>
                <div>
                    <input type="submit" value="Ordenar"></input>
                </div>
            </form>
            <button onClick={handleDownload}>Download File</button>

        </div>
    )
}