import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SimpleInput from './SimpleInput';
import SelectInput from './SelectInput';
import vehicleList from '../../utils/vehicleType';

// import { Container } from './styles';

export default function VehicleForm(props) {

    const schema = Yup.object({
        vehicleType: Yup.string().required('Required'),
        numberOfPassengers: Yup.number().min('0', 'required'),
        color: Yup.string().required('Required'),
        series: Yup.string().required('Required'),
        number: Yup.number().min('-1','Too short!').max('255','Too long!').required('Required'),
    });

    const InitialValues = () => {
        if(props.vehicleData && Object.values(props.vehicleData).length > 0){
            return {
                vehicleType: props.vehicleData.type,
                color: props.vehicleData.color,
                numberOfPassengers: props.vehicleData.numberOfPassengers,
                number: props.vehicleData.chassis.number,
                series: props.vehicleData.chassis.series
            }
        }else{
            return {
                vehicleType: '',
                numberOfPassengers: '0'
            }
        }
    }

    function setVehicleType(e, setFieldValue){
        const numberOfPassengers = GetNumberOfPassengers(e.target.value);
        setFieldValue('vehicleType', e.target.value, false);
        setFieldValue('numberOfPassengers', numberOfPassengers, false);
    }

    const GetNumberOfPassengers = (vehicleSelected) => {
        const vehicle = vehicleList.find(x => x.name === vehicleSelected);
        return vehicle ? vehicle.numberOfPassengers : '0';
    }

    return (
        <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => props.onSubmit(values)}
            initialValues={ InitialValues() }
        >
            {({
                handleSubmit,
                handleChange,
                values,
                isValid,
                errors,
                setFieldValue
            }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={{ span: 8, offset: 2 }}>
                                <Row>
                                    <Col md={12}>
                                        <h2>Vehicle</h2>
                                        <Row>
                                            <Col md={4}>
                                                <SelectInput data={vehicleList} label="Vehicle type"
                                                    value={values.vehicleType || ''}
                                                    onChange={(e) => setVehicleType(e, setFieldValue)}
                                                    name="vehicleType"
                                                    isInvalid={!!errors.vehicleType}
                                                    error={errors.vehicleType}
                                                    disabled={props.isEditing ? 'disabled' : '' || false }                                                    
                                                />
                                            </Col>
                                            <Col md={8}>
                                                <SimpleInput placeholder="Vehicle color" label="Color" 
                                                    value={values.color || ''}
                                                    onChange={handleChange}
                                                    name="color"
                                                    isInvalid={!!errors.color}
                                                    error={errors.color}
                                                    id="validationCustom02"
                                                    type="text"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3}>
                                                <SimpleInput label="Number of passengers" 
                                                        value={ values.numberOfPassengers || '0'}
                                                        name="numberOfPassengers"
                                                        type="number"
                                                        plaintext
                                                        readOnly={true}
                                                />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col md={12}>
                                        <h2>Chassis</h2>
                                        <Row>
                                            <Col md={12}>
                                                <SimpleInput type="text" placeholder="Type the Chassis series" 
                                                    label="Series" 
                                                    onChange={handleChange}
                                                    value={values.series || ''}
                                                    name="series"
                                                    isInvalid={!!errors.series}
                                                    error={errors.series}
                                                    id="validationCustom03"
                                                    readOnly={props.isEditing || false }
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12}>
                                                <SimpleInput type="number" 
                                                    placeholder="Type the Chassis number" 
                                                    label="Number" 
                                                    value={values.number || ''}
                                                    onChange={handleChange}
                                                    maxLength={3}
                                                    isInvalid={!!errors.number}
                                                    error={errors.number}
                                                    id="validationCustom04"
                                                    readOnly={props.isEditing || false }
                                                    name="number"
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={12} className="text-center">
                                                <Button type="submit">Submit</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                )}
        </Formik>
    );
}
