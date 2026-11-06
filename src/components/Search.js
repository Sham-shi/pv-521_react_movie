import "./Search.css";
import React from "react";

class Search extends React.Component
{
    state = 
    {
        search: "",
        type: "all",
        page: 1,
        itemsPerPage: 10
    }

    // componentDidMount()
    // {
    //     let itemsPerPage = 10;
    //     this.setState({totalPages: Math.ceil(this.props.totalCount / itemsPerPage)});
    // }

    handleKey = (event) =>
    {
        if (event.key === "Enter")
        {
            this.props.searchMovie(this.state.search, this.state.type);
            this.setState({page: 1});
        }
    }

    handleFilter = (event) =>
    {
        this.setState
        (
            () => ({type: event.target.dataset.type}),
            () => ({search: this.props.searchMovie(this.state.search, this.state.type) })
        )
    }

    prevPage = () => 
    {
        this.setState
        (
            () => (this.state.page > 1 ? {page:this.state.page - 1} : {page:1}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
        )
    }

    nextPage = () =>
    {
        // const totalPages = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        this.setState
        (
            () => ({page: this.state.page + 1}),
            // () => (this.state.page < totalPages ? {page: this.state.page + 1} : {page: totalPages}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
        )
    }

    setPage = (pageNumder) =>
    {
        this.setState
        (
            () => ({page: pageNumder}),
            () => (this.props.searchMovie(this.state.search, this.state.type, this.state.page))
        )
    }

    render()
    {
        // let itemsPerPage = 10;
        const totalPages = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        let number = [];
        for (let i = 0; i < totalPages; i++)
            number.push(i+1);

        return (
            <>
                <div className="search">
                    <input type="search"
                            placeholder="Поиск"
                            value={this.state.search}
                            onChange={(e) => this.setState({search: e.target.value})}
                            onKeyUp={this.handleKey}
                            />
                    <button className="btn" 
                            onClick=
                            {
                                () => 
                                {
                                    this.props.searchMovie(this.state.search, this.state.type);
                                    this.setState({page:1});
                                }
                            }>
                        &#128269;
                    </button>
                </div>
                <div className="radio">
                    <input type="radio" 
                            name="type" 
                            id="radio-all"
                            data-type="all"
                            cheked={this.state.type === 'all'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-all">All</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-movie"
                            data-type="movie"
                            cheked={this.state.type === 'movie'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-movie">Movies</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-series"
                            data-type="series"
                            cheked={this.state.type === 'series'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-series">Series</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-game"
                            data-type="game"
                            cheked={this.state.type === 'game'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-game">Games</label>
                </div>

                <div className="pagination">
                    <button className="btn" 
                            onClick={this.prevPage} 
                            disabled={this.state.page <= 1}>
                        {"<< Prev"}
                    </button>
                    <div className="items">
                        {
                            number.slice(0, totalPages)
                            .map
                            (
                                (element, index) => 
                                (
                                    <button className={element == this.state.page ? "btn-current-page" : ""}
                                            onClick={() => (this.setPage(element))}>
                                        {element}
                                    </button>
                                )
                            )
                        }
                    </div>
                    <button className="btn" 
                            onClick={this.nextPage}
                            disabled={this.state.page >= totalPages}>
                        {"Next >>"}
                    </button>
                </div>
            </>
        )
    }
}
export default Search;