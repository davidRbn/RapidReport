import SignOut from "../SignOut/SignOut"
import './Header.scss'

const Header= () => {



  return (<>
  
  <div style={{position:'relative'}}>
        <h1 className="title-home-rapports">Mes Rapports</h1>
        <div className="s-signOut"><SignOut/></div>
      </div>
  </>)
}

export default Header 