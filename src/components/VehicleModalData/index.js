import React from 'react';
import { Modal, Button, Col, Row, Card } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';

// import { Container } from './styles';

export default function VehicleModalData(props) {

    function renderIcon(vehicleType) {
        const Icon = props.icon;
        return <Icon size={90} />
    }

    function renderContent() {
        if (props.isLoading) {
            return (
                <Row>
                    <Col md={12} className="text-center">
                        <SyncLoader
                            size={15}
                            color={"#123abc"}
                            loading={props.isLoading}
                        />
                    </Col>
                </Row>
            )
        } else {
            return (
                <>
                    <Row className="mb-3">
                        <Col xs={12} className="text-center">
                            {
                                renderIcon()
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className="text-center">
                            <Card>
                                <Card.Header>
                                    <span><b>Type: </b>{props.data.type}</span>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="text-center">
                                        <Col md={6}>
                                            <p><b>Vehicle color: </b>{props.data.color}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><b>Number of passengers: </b>{props.data.numberOfPassengers}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col md={12} className="text-center">
                            <Card>
                                <Card.Header>
                                    <span><b>Chassis ID: </b>{props.data.chassisId}</span>
                                </Card.Header>
                                <Card.Body>
                                    <Row className="text-center">
                                        <Col md={6}>
                                            <p><b>Chassis Series: </b>{props.data.chassis.series}</p>
                                        </Col>
                                        <Col md={6}>
                                            <p><b>Chassis Number: </b>{props.data.chassis.number}</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            );
        }
    }

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                {
                    props.isDeleting ? <Modal.Title>Deleting... Are you sure?</Modal.Title> : <Modal.Title>Details</Modal.Title>
                }
            </Modal.Header>
            <Modal.Body>
                {renderContent()}
            </Modal.Body>
            <Modal.Footer>
                {props.isDeleting && !props.isLoading ? <Button variant="danger" onClick={props.confirmDelete}>Delete</Button> : ''}
                <Button variant="secondary" onClick={props.handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
