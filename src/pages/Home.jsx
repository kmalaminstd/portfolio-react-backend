import { Link } from "react-router-dom"


function Home() {
  return (
    <div className="homeSection">
      <div className="header common_page_head">
        <h1>This is a simple Dashboard for <span style={{color: 'yellowgreen'}}>{`K.M. AL-AMIN's`}</span> Portfolio</h1>
      </div>
      <div className="homeLink">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/add-item">Add Item</Link></li>
          <li><Link to="/all-item">All Item</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Home