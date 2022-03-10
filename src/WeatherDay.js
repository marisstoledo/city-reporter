import React from 'react';
import { Card, Col } from 'react-bootstrap';

class WeatherDay extends React.Component {
    render() {
        return (
                <Col key={this.props.idx}>
                    <Card className="forecast">
                        <Card.Text>Date: {this.props.dayObj.day}</Card.Text>
                        <Card.Text>forecast Description: {this.props.dayObj.description}</Card.Text>
                    </Card>
                </Col>
        )
    }
}

export default WeatherDay;