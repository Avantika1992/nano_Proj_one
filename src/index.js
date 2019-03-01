import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route} from 'react-router';
import {BrowserRouter,Link} from 'react-router-dom'
import App from './App'
import Search from './search'
import Parent from './parent'
import './index.css'



class Index extends React.Component{
  render(){
    return (
      <div>
      <BrowserRouter>
      <div>
        <Link to="/search"><h2>GO TO SEARCH PAGE</h2></Link>
        <Route path={"/"} exact component={App}/>
        <Route path={"/parent"} exact component={Parent}/>
        <Route path={"/search"} exact component={Search}/>
        <Link to="/"><h2>GO TO HOME PAGE</h2></Link>

      </div>
      </BrowserRouter>
      </div>
    )
  }
}


ReactDOM.render(<Index />, document.getElementById('root'))
