
export async function POST(req){

 const body = await req.json()

 const buy = Number(body.buy || 0)
 const resale = Number(body.resale || 0)

 const fees = resale * 0.08
 const shipping = resale * 0.05

 const profit = resale - buy - fees - shipping
 const roi = buy > 0 ? (profit/buy)*100 : 0

 return Response.json({
  profit,
  roi
 })

}
