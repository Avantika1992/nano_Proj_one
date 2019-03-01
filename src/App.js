import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'
import Search from './search'
import Parent from './parent'

class BooksApp extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
        currentlyReading:[],
        wantToRead:[],
        read:[],
        availableBooks:[],
        search:"",
        buks:[],
        value: ""
       };

       getAll().then((result) =>{
       this.setState({buks:result})
       var curr = [];
       var want = [];
       var toread= [];

         result.forEach(function(book){

         if(book.shelf==="currentlyReading")
         {
           curr.push(book)
         }
         if(book.shelf==="wantToRead")
         {
           want.push(book)
         }
         if(book.shelf==="read")
         {
           toread.push(book)
         }
       }

       );
       this.setState({currentlyReading:curr})
       this.setState({wantToRead:want})
       this.setState({read:toread})

     }
     )
     }


  handleSelectionChanged(book,placeBook,event) {

    event.preventDefault()
    if(event.target.value==="currentlyReading"){
        book.shelf="currentlyReading"
        var a = this.state.currentlyReading
      	a.push(book)
         this.setState({currentlyReading: a});
    }
    if(event.target.value==="wantToRead"){
        book.shelf="wantToRead"
        var e = this.state.wantToRead
      	e.push(book)
            this.setState({wantToRead: e});
    }
    if(event.target.value==="read"){
        book.shelf="read"
        var f = this.state.read
      	f.push(book)
        this.setState({read: f});
    }
     if(event.target.value==="None"){
         book.shelf="None"
         this.setState({availableBooks: this.state.availableBooks.push(book)});
    }
     if(placeBook==="currentlyReading"){
         for( var m = 0; m < this.state.currentlyReading.length; m++){
         if ( this.state.currentlyReading[m].title === book.title) {
           var g=this.state.currentlyReading
           g.splice(m, 1)
           this.setState({currentlyReading:g});
         console.log(g)
        }
      }
    }
      if(placeBook==="wantToRead"){
         for( var n = 0; n < this.state.wantToRead.length; n++){
         if ( this.state.wantToRead[n].title === book.title) {
         const h=this.state.wantToRead
         h.splice(n, 1)
         this.setState({wantToRead:h});
        }
      }
    }
      if(placeBook==="read"){
         for( var o = 0; o < this.state.read.length; o++){
         if ( this.state.read[o].title === book.title) {
         const z=this.state.read
         z.splice(o, 1)
         this.setState({read:z});
        }
      }
    }
     if(placeBook===this.state.availableBooks){
         for( var i = 0; i < this.state.availableBooks.length; i++){
         if ( this.state.availableBooks[i] === book.title) {
         this.state.availableBooks.splice(i, 1);
         console.log(book.title)
        }
      }
    }
  }
  render() {

    var allBooks={"currentlyReading":this.state.currentlyReading,
             "wantToRead":this.state.wantToRead,
             "read":this.state.read}
    //console.log(allBooks)
    console.log(this.props.test)
    console.log(this.props.val)
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
                              <select value={book.shelf} onChange={this.handleSelectionChanged.bind(this,book,placeBook)}>
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
