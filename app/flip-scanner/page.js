
'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function FlipScanner(){

const [image,setImage] = useState(null)
const [message,setMessage] = useState("")

async function uploadImage(file){

const fileName = Date.now()+"_"+file.name

const {data,error} = await supabase
.storage
.from('item-images')
.upload(fileName,file)

if(error){
setMessage(error.message)
return null
}

return data.path
}

async function handleUpload(e){

const file = e.target.files[0]

if(!file) return

setImage(file)

const path = await uploadImage(file)

if(path){
setMessage("Image uploaded: "+path)
}

}

return (

<main className="page">
<div className="container">

<h1>Flip Scanner V4.5</h1>

<input type="file" onChange={handleUpload} />

{message && <p>{message}</p>}

</div>
</main>

)

}
