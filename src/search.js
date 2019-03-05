import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'


var displaySearchBooks=[];
var displaySearch=[]


class Search extends React.Component {

 searchHandler(event){
  event.preventDefault()
  var entered_value = event.target.value
  //var arrbook=this.state.currentlyReading.concat(this.state.wantToRead)
  //arrbook=arrbook.concat(this.state.read)
  var arrbook=this.props.buks
  console.log(arrbook)

  this.setState({search: event.target.value});

  for(var i in arrbook){
     if(arrbook[i].title.toLowerCase().includes(event.target.value.toLowerCase())||
       arrbook[i].authors[0].toLowerCase().includes(event.target.value.toLowerCase())){
       var a=arrbook[i];
        displaySearch.push(a)
      }
   }


  if(entered_value.length==0){
    displaySearch=[]
  }
 }
render(){
  console.log(this.props.test)
  displaySearchBooks=[];
  for(var l in displaySearch){
    let bookSearch=displaySearch[l]

    displaySearchBooks.push(<div className="bookshelf"><div className="bookshelf-books">
                  <ol className="books-grid">
                  <li>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:'url('+ bookSearch.imageLinks.smallThumbnail + ')' }}></div>
                          <div className="book-shelf-changer">
                            <select value={bookSearch.shelf} onChange={this.props.handleSelectionSearch.bind(this,bookSearch)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="None">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{bookSearch.title}</div>
                        <div className="book-authors">{bookSearch.authors}</div>
                      </div>
                    </li>
                 </ol>
                </div>
                </div>)
}

  return(
    <div className="search-books">
      <div className="search-books-bar">
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={this.searchHandler.bind(this)}/>
        </div>
      </div>
      <div className="search-books-results">
      {displaySearchBooks}
      </div>
    </div>
  )
}
}

export default Search;
