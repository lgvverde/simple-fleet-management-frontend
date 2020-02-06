import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
//import { FaCarSide, FaTruck, FaBus } from 'react-icons/fa';
import VehicleModalData from '../VehicleModalData';
import vehicleList from '../../utils/vehicleType';

import './styles.css';
// import { Container } from './styles';

export default function VehicleCard(props) {
    const [showModalData, setShowModalData] = useState(false);

    const toggleModal = () => {
        setShowModalData(!showModalData);
    }

    const Icon = vehicleList.find(x => x.name === props.vehicleData.type).icon;

    return (
        <div>
            <Card className="vehicle-card" onClick={toggleModal}>
                <Card.Header className="text-center">
                    <b>{props.vehicleData.type}</b>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col xs={12} className="text-center">
                            {
                                <Icon size={50} />
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} className="text-center mt-2">
                            <span><b>Chassis ID: </b>{ props.vehicleData.chassisId }</span>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <VehicleModalData data={props.vehicleData} icon={ Icon } show={showModalData} handleClose={toggleModal} />
        </div>
    );
}
