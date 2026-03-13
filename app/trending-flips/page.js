
export default function TrendingFlipsPage(){
 return(
  <main className="page">
   <div className="container">
    <h1>Trending Flips</h1>
    <p className="muted">Items currently producing the highest ROI.</p>

    <div className="grid grid-3">
     <div className="card">
      <h3>Milwaukee Drill</h3>
      <p>ROI: 72%</p>
     </div>

     <div className="card">
      <h3>DeWalt Combo Kit</h3>
      <p>ROI: 65%</p>
     </div>

     <div className="card">
      <h3>Makita Impact Driver</h3>
      <p>ROI: 61%</p>
     </div>
    </div>

   </div>
  </main>
 )
}
