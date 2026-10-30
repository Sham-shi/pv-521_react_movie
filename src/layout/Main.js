import "./Main.css";
import React from "react";
import MovieList from "../components/MovieList.js";
import Preloader from "../components/Preloader.js"; 
import Search from "../components/Search.js";

class Main extends React.Component
{
    state = 
    {
        movies:[]
    }

    componentDidMount()
    {
        fetch('https://www.omdbapi.com/?s=Matrix&apikey=e81fa875')
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));
    }

    searchMovie = (str) =>
    {
        fetch(`https://www.omdbapi.com/?s=${str}&apikey=e81fa875`)
            .then(response => response.json())
            .then(data => this.setState({movies: data.Search}));
    }

    render()
    {
        return (
            <div className="main">
                <Search searchMovie={this.searchMovie}/>
                {
                    this.state.movies.length == 0 ? <Preloader /> :
                        <MovieList movies={this.state.movies} />
                }
            </div>
        )
    }
}

export default Main;