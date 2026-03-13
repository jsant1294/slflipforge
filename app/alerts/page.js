
'use client'

import {useEffect,useState} from 'react'
import {supabase} from '../../lib/supabaseClient'

export default function Alerts(){

const [items,setItems] = useState([])

useEffect(()=>{
load()
},[])

async function load(){

const {data} = await supabase
.from('items')
.select('*')

setItems(data||[])

}

return(

<main className="page">
<div className="container">

<h1>Deal Alerts</h1>

{items.map(item=>{

const profit =
(item.expected_sale_price||0) -
(item.purchase_price||0) -
(item.fees||0) -
(item.shipping_cost||0)

const roi =
item.purchase_price
? (profit/item.purchase_price)*100
:0

if(profit < item.alert_profit) return null
if(roi < item.alert_roi) return null

return(
<div key={item.id} className="card">
<strong>{item.item_name}</strong>
<p>Profit: ${profit.toFixed(2)}</p>
<p>ROI: {roi.toFixed(1)}%</p>
</div>
)

})}

</div>
</main>

)

}
