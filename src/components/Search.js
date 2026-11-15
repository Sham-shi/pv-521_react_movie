import "./Search.css";
import React from "react";
import JumpMenu from "./JumpMenu";

class Search extends React.Component
{
    state = 
    {
        search: "",
        type: "all",
        page: 1,
        itemsPerPage: 10,
        showJumpMenuIndex: null,
        jumpPageInput: ""
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
        let newType = event.target.dataset.type;

        this.setState
        (
            {type: newType, page: 1},
            () => {this.props.searchMovie(this.state.search, newType, 1) }
        )
    }

    handleJumpInputChange = (event) => 
    {
        this.setState({jumpPageInput: event.target.value});
    }

    handleJumpGo = () =>
    {
        let targetPage = parseInt(this.state.jumpPageInput, 10);
        let totalPages = Math.ceil(this.props.totalCount / this.state.itemsPerPage);

        if(!isNaN(targetPage) && targetPage >= 1 && targetPage <= totalPages)
            this.setPage(targetPage);
        else
            this.setPage(totalPages);

        this.setState({showJumpMenuIndex: null});
    }

    toggleJumpMenu = (index) =>
    {
        this.setState (prevState => 
        ({
            showJumpMenuIndex: prevState.showJumpMenuIndex === index ? null : index,
            jumpPageInput: prevState.page.toString()
        }));
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
                            checked={this.state.type === 'all'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-all">All</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-movie"
                            data-type="movie"
                            checked={this.state.type === 'movie'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-movie">Movies</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-series"
                            data-type="series"
                            checked={this.state.type === 'series'}
                            onChange={this.handleFilter}
                    />
                    <label htmlFor="radio-series">Series</label>

                    <input type="radio" 
                            name="type" 
                            id="radio-game"
                            data-type="game"
                            checked={this.state.type === 'game'}
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
                                            <div key={index} style={{position: 'relative', display: 'inline-block'}}>
                                                <button key={index} 
                                                        className="btn-pagination-ellipsis"
                                                        onClick={() => (this.toggleJumpMenu(index))}>
                                                    {element}
                                                </button>

                                                {this.state.showJumpMenuIndex === index && (
                                                    <JumpMenu 
                                                        totalPages={totalPages}
                                                        jumpPageInput={this.state.jumpPageInput}
                                                        onInputChange={this.handleJumpInputChange}
                                                        onIncrement={() => this.setState(prev => ({ 
                                                            jumpPageInput: (parseInt(prev.jumpPageInput) || 0) + 1 
                                                        }))}
                                                        onDecrement={() => this.setState(prev => ({ 
                                                            jumpPageInput: Math.max(1, (parseInt(prev.jumpPageInput) || 1) - 1) 
                                                        }))}
                                                        onGo={this.handleJumpGo}
                                                    />
                                                )} 
                                            </div>
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