import React, { useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard/MovieCard.js";
import { sagaActions } from "../../Store/Sagas/sagaActions.js";

import "./MovieList.scss";

export default function MovieList() {
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        let path = history.location.pathname.split('/')[1]
        if(path !== 'films') {
            dispatch({ type: sagaActions.SEARCH_MOVIES, payload: id });
        }
    }, [id])

    const renderMovies = useCallback((movies) => movies.map(renderMovie), [movies]);
    const renderMovie = movie => <MovieCard key={movie.id} movie={movie} />;

    return (
        <>
            <div className="total">
                <span className="total__number">{movies.length}</span>
                <span className="total__text"> movies found</span>
            </div>
            <div className="movielist">
                { renderMovies(movies) }
            </div>
        </>
    );
}
