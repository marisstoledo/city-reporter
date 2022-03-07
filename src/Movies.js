import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Movies extends React.Component {
    render() {
        return (
            <div>
                <h3>Movies</h3>
                <Row xs={2} md={3} className="g-4">
                {this.props.moviesArr.map((movie, idx) => (
                    <Col>
            <Card style={{width: '18rem' }}>
                <Card.Img varient="top" scr={movie.image_url} />
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text> {movie.overview} </Card.Text>
                    <Card.Text>Release on: {movie.release_on}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
            ))}
            </Row>
            </div>
        );
    }
}

export default Movies;