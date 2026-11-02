import "./Movie.css";
import { useState } from "react";

function Movie(props)
{
    // Состояние для отслеживания ошибки загрузки картинки
    const [imgError, setImgError] = useState(false);

    // Проверяем, есть ли постер и не является ли он строкой "N/A"
    const hasPoster = props.Poster && props.Poster !== "N/A";

    // Функция, которая сработает, если картинка не загрузится
    const handleImageError = () => 
    {
        setImgError(true);
    }

    return (
        <div className="card">
            {
                hasPoster || !imgError ? 
                    (
                        <img src={props.Poster} 
                            alt={props.Title} 
                            onError={handleImageError}/>
                    ) :
                    (
                        <div className="card-image-placeholder">
                            <span>N/A</span>
                        </div>
                    )
            }
                
            <div className="card-content">
                <h3 className="movie-title">{props.Title}</h3>
                <p className="movie-year">{props.Year} <span>{props.Type}</span></p>
            </div>

            {/* <img src={props.Poster} alt={props.imdbID}/>
            <div>
                <h3>{props.Title}</h3>
                <div>{props.Year} <span>{props.Type}</span></div>
            </div> */}
        </div>
    );
}
export default Movie;