
export async function POST(){

 const items=[
  {title:'Milwaukee M18 Drill',price:80,resale:220,profit:100},
  {title:'DeWalt XR Combo Kit',price:120,resale:260,profit:90},
  {title:'Makita Impact Driver',price:70,resale:180,profit:80}
 ]

 return Response.json({items})
}
