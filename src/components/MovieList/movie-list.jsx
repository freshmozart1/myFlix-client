import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { MovieCard } from '../MovieCard/movie-card';

export const MovieList = (props) => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(process.env.HEROKU + '/movies')
            .then((response) => response.json())
            .then((data) => {
                if (props.movies) {
                    data = data.filter((movie) => props.movies.includes(movie._id));
                }
                return setMovies(data);
            })
            .catch((error) => console.error(error));
    }, [props.movies]);

    return movies.length === 0 ? (
        <Container className="loading_container">
            <Spinner animation="border" role="status" aria-label='Loading movie' />
        </Container>
    ) : (
        <Row>
            {movies.map((movie) => (
                <Col key={movie._id} xs={12} md={6} lg={4} xl={3} className='g-md-4 d-flex align-items-stretch'>
                    <MovieCard movie={movie} onClick={() => navigate(`/movies/${movie.title}`)} />
                </Col>
            ))}
        </Row>
    );
};

MovieList.propTypes = {
    movies: PropTypes.array,
};