import "./Main.css";
import React from "react";
import MovieList from "../components/MovieList.js";
import Preloader from "../components/Preloader.js"; 

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

    render()
    {
        return (
            <div className="main">
                {
                    this.state.movies.length == 0 ? <Preloader /> :
                        <MovieList movies={this.state.movies} />
                }
            </div>
        )
    }
}

export default Main;