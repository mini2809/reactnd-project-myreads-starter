import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import  CurrentlyReading  from './CurrentlyReading.js'
import  Read  from './Read.js'
import  WantToRead  from './WantToRead.js'

class BooksApp extends React.Component {

  state = {
      map : new Map([["0","currentlyReading"],["1","read"],["2","wantToRead"],
          ["wantToRead","2"],["read","1"],["currentlyReading","0"]]),
      array:[[],[],[]],
      query:"",
      showSearchPage: false
  }

  filterBookstoShelf=(books)=>{
      this.setState((prevstate)=>{
        books.map((b)=>{
          let index = this.state.map.get(b.shelf)
          prevstate.array[index].push(b)
        })
        return prevstate;
      })
    }

  
  updateUi=(id,prevShelf,targetShelf,book)=>{
    //console.log("updateui called -- , prevShelf = ",prevShelf, "targetShelf =", targetShelf )
    if(prevShelf !== targetShelf){
      let prevIndex = this.state.map.get(prevShelf)
      let targetIndex = this.state.map.get(targetShelf)
      
      this.setState((x)=>{
        book.shelf=targetShelf
        if(targetShelf !== "none")
          x.array[targetIndex].push(book)
        x.array[prevIndex] = x.array[prevIndex].filter((a)=>(
          a.id !== id
        )) 
        return x;
      })
    }

  }   

   componentDidMount(){
   // console.log("componentDidMount called")
    BooksAPI.getAll()
    .then(res=>{
    this.filterBookstoShelf(res)
    })
  }
 
  render(){
    //console.log("render called, state = ",this.state)
      return(
        <div className = "app">
          {this.state.showSearchPage ? (
            <div className="search-books">
              <div className="search-books-bar">
                <button className="close-search" 
                  onClick={() => this.setState({ showSearchPage: false }) }>Close
                </button>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid"></ol>
              </div>
            </div>
          ) : ( 
          <div className= "list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className= "list-books-content">
              <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <div>
                          <CurrentlyReading currentlyReading ={this.state.array[0]}
                         updateUi = {(id,prevshelf,targetShelf,b)=>this.updateUi(id,prevshelf,targetShelf,b)}
                          />
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div className= "list-books-content">
              <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <div>
                          <Read read ={this.state.array[1]}
                          updateUi = {(id,prevshelf,targetShelf,b)=>this.updateUi(id,prevshelf,targetShelf,b)}
                          />
                      </div>
                    </div>
                  </div>
              </div>
            </div>
             <div className= "list-books-content">
              <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want To Read</h2>
                    <div className="bookshelf-books">
                      <div>
                          <WantToRead wantToRead ={this.state.array[2]}
                          updateUi = {(id,prevshelf,targetShelf,b)=>this.updateUi(id,prevshelf,targetShelf,b)}
                          />
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
          )}
        </div>
      )
  }
}

export default BooksApp
