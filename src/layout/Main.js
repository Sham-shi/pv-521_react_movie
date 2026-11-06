import "./Main.css";
import React from "react";
import MovieList from "../components/MovieList.js";
import Preloader from "../components/Preloader.js"; 
import Search from "../components/Search.js";

class Main extends React.Component
{
    state = 
    {
        movies: [],
        count: 0
    }

    componentDidMount()
    {
        this.searchMovie('Matrix');

        /*let search_string = `https://www.omdbapi.com/?s=Matrix&type=all&page=1&apikey=e81fa875`;
        // console.log(search_string);

        fetch(search_string)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, count:data.totalResults}));*/
        
            /*fetch('https://www.omdbapi.com/?s=Matrix&apikey=e81fa875')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));*/
    }

    searchMovie = (str, type = 'all', page) =>
    {
        let search_string = `https://www.omdbapi.com/?s=${str}${type !== 'all' ? `&type=${type}` : ''}&page=${page}&apikey=e81fa875`;
        // console.log(search_string);
        
        fetch(search_string)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search, count: data.totalResults}));
            // .then(data => this.setState({movies: data.Search}));
    }

    render()
    {
        return (
            <div className="main">
                <Search searchMovie={this.searchMovie} totalCount={this.state.count}/>
                {
                    this.state.movies == null ? <h1>Nothing</h1> : 
                        this.state.movies.length == 0 ? <Preloader /> :
                        <MovieList movies={this.state.movies} />
                }
            </div>
        )
    }
}

export default Main;