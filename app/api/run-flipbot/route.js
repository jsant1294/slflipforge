
export async function POST(){

 const items=[
  {title:'Milwaukee Drill',buy:70,resale:200},
  {title:'DeWalt Impact',buy:60,resale:180},
  {title:'Makita Combo Kit',buy:120,resale:300}
 ]

 const scored = items.map(i=>{

  const profit = i.resale - i.buy
  const roi = Math.round((profit/i.buy)*100)

  return {...i,profit,roi}

 })

 return Response.json({items:scored})

}

