import React from 'react';
import {Router,Route} from 'react-router';
import './App.css';
import {getAll,get,update,search} from './BooksAPI'
import Parent from './parent'

var displaySearchBooks=[];
var displaySearch=[]


class Search extends React.Component {
  constructor(props) {
        super(props);

        this.state = {

        currentlyReading:[],
        wantToRead:[],
        read:[],
        availableBooks:[],
        search:"",
        buks:[],
        value: "",
        displaySearch:[]

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

     handleSelectionSearch(bookSearch,event) {
        if(this.state.currentlyReading){
          for( var i = 0; i < this.state.currentlyReading.length; i++){
          if ( this.state.currentlyReading[i].title === bookSearch.title) {
            var a=this.state.currentlyReading
            a.splice(i, 1)
            this.setState({currentlyReading:a});

         }
       }
     }
       if(this.state.wantToRead){
          for( var j = 0; j < this.state.wantToRead.length; j++){
          if ( this.state.wantToRead[j].title === bookSearch.title) {
          const b=this.state.wantToRead
          b.splice(j, 1)
          this.setState({wantToRead:b});
         }
       }
     }
       if(this.state.read){
          for( var k = 0; k < this.state.read.length; k++){
          if ( this.state.read[k].title === bookSearch.title) {
          const c=this.state.read
          c.splice(k, 1)
          this.setState({read:c});
         }
       }
     }

     if(event.target.value==="currentlyReading"){
         bookSearch.shelf="currentlyReading"
         var d = this.state.currentlyReading
       	d.push(bookSearch)
          this.setState({currentlyReading: d});
     }
     if(event.target.value==="wantToRead"){
         bookSearch.shelf="wantToRead"
         var e = this.state.wantToRead
       	e.push(bookSearch)
             this.setState({wantToRead: e});
     }
     if(event.target.value==="read"){
         bookSearch.shelf="read"
         var f = this.state.read
       	f.push(bookSearch)
             this.setState({read: f});
     }
     if(event.target.value==="None"){
       bookSearch.shelf="None"
       for( var i = 0; i <= this.state.buks.length; i++){
       if ( this.state.buks[i] === bookSearch.title) {
       this.state.buks.splice(i, 1);
     }
     }
 }
 }
 searchHandler(event){
  event.preventDefault()
  var entered_value = event.target.value
  //var arrbook=this.state.currentlyReading.concat(this.state.wantToRead)
  //arrbook=arrbook.concat(this.state.read)
  var arrbook=this.state.buks
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
                            <select value={bookSearch.shelf} onChange={this.handleSelectionSearch.bind(this,bookSearch)}>
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
