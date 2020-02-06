import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VehicleCard from '../VehicleCard';

// import { Container } from './styles';

export default function StandardList(props) {

    function RenderContent() {
        if(props.data && Object.values(props.data).length > 0){
            return props.data.map((element) => {
                return(
                    <Col xs={3} key={element.chassis.number}>
                        <VehicleCard vehicleData={element}/>
                    </Col>
                )
            })
        }
    }

    return (
        <Row>
            <Col xs={12} className="text-center">
                <Row className="mb-3">
                    {
                        RenderContent()
                    }
                </Row>
            </Col>
        </Row>
    );
}
