import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'
import Search from './search'

class BooksApp extends React.Component {
  render() {

    var allBooks={"currentlyReading":this.props.currentlyReading,
             "wantToRead":this.props.wantToRead,
             "read":this.props.read}
    //console.log(allBooks)
    console.log(this.props.test)
    console.log(this.props.currentlyReading)
    //console.log(this.props.currentlyReading)
    let output = [];
     output.push(
               <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
           )
    for(var key in allBooks){
      //console.log(allBooks[key])
      output.push(<h2 className="bookshelf-title">{key}</h2>)
      let placeBook=key
      for(var i=0;i<(allBooks[key].length);i++){
      let book=allBooks[key][i]

      output.push(<div className="bookshelf"><div className="bookshelf-books">
                    <ol className="books-grid">
                    <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193,backgroundImage: 'url('+allBooks[key][i].imageLinks.thumbnail+ ')'}}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={this.props.handleSelectionChanged.bind(this,book,placeBook)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="None">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{allBooks[key][i].title}</div>
                          <div className="book-authors">{allBooks[key][i].authors}</div>
                        </div>
                      </li>
                   </ol>
                  </div>
                  </div>)
}
}
    return (
      <div className="app">
        <div>
          <div>
              {output}
           </div>
         </div>
      </div>
)
}
}


export default BooksApp
