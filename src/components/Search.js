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
            () => ({type: event.target.dataset.type, page: 1}),
            () => ({search: this.props.searchMovie(this.state.search, this.state.type) })
        )
    }

    prevPage = () => 
    {
        this.setState
        (
            (prevState) => 
            {
                if(prevState.page <= 1) return null;

                return {page: prevState.page - 1}
            },
            // () => (this.state.page > 1 ? {page:this.state.page - 1} : {page:1}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
        )
    }

    nextPage = () =>
    {
        const totalPages = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        this.setState
        (
            (prevState) => 
            {
                if(prevState.page >= totalPages) return null;

                return {page: prevState.page + 1}
            },
            // () => ({page: this.state.page + 1}),
            () => {this.props.searchMovie(this.state.search, this.state.type, this.state.page)}
        )
    }

    setPage = (pageNumber) =>
    {
        this.setState
        (
            () => ({page: pageNumber}),
            () => (this.props.searchMovie(this.state.search, this.state.type, this.state.page))
        )
    }

    render()
    {
        let totalPages = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        // let start = Math.max(0, this.state.page - 6);
        // let end = Math.min(start + 10, totalPages);
        // start = Math.max(0, end - 10);

        let number = [];

        if(totalPages < 10)
        {
            for (let i = 0; i < totalPages; i++)
                number.push(i+1);
        }
        else
        {
            number.push(1);

            let start = Math.max(2, this.state.page - 2);
            let end = Math.min(totalPages - 1, this.state.page + 2);

            if(this.state.page - 1 > 3) number.push('...');

            for(let i = start; i <= end; i++)
                number.push(i);

            if(totalPages - this.state.page > 3) number.push('...');

            number.push(totalPages);
        }

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
                            number.map //.slice(start, end)
                            (
                                (element, index) => 
                                {
                                    if(element === '...')
                                    {
                                        return (
                                            <span key={index} className="pagination-ellipsis">
                                                {element}
                                            </span>
                                        );
                                    }
                                    
                                    return (
                                        <button key={index}
                                                className={element == this.state.page ? "btn-current-page" : ""}
                                                onClick={() => (this.setPage(element))}>
                                            {element}
                                        </button>
                                    );
                                }
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