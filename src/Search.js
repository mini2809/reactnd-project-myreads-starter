import React ,{ Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'

class Search extends Component{

	handleClick=(e,id,prevShelf)=>{
		//console.log("handlechange called")
		console.log("fom handleclick prevShelf=",prevShelf)
		e.preventDefault()
		let targetShelf = e.target.value
		BooksAPI.get(id)
		.then((b)=>{
			// console.log("handleClick called -- , prevShelf = ",prevShelf, "targetShelf =", targetShelf)
			BooksAPI.update(b,targetShelf)
			this.props.updateUi(id,prevShelf,targetShelf,b)
		})
	}
	
	render(){
		let AllBooks = this.props.Allbooks
		console.log(AllBooks.length)
		return(
			<div>
				<ol className="books-grid">
				
					{AllBooks.map((b)=>(
					<li key = {b.id}>
					    <div className="book"> 
					      <div className="book-top">
								<div className="book-cover" style={{ backgroundImage: b.hasOwnProperty('imageLinks') === false ? "":  'url(\"'+ b.imageLinks.thumbnail+'\")', width: 128 , height: 188 }}>
					       </div> 
					        <div className="book-shelf-changer">
					          <select onClick={(e)=>this.handleClick(e,b.id,b.shelf)}>
					            <option value="move" disabled>Move to...</option>
					            <option value="currentlyReading">Currently Reading</option>
					            <option value="wantToRead">Want to Read</option>
					            <option value="read">Read</option>
					            <option value="none">None</option>
					          </select>
					        </div>
					      </div>
					      <div className="book-title">{b.title}</div>
					      <div className="book-authors">{b.authors}</div>
					    </div>
					</li>
				))}
			
			</ol>
			</div>
		)
	}
}
export default Search