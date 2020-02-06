import React from 'react';
import { Form } from 'react-bootstrap';

export default function SimpleInput(props) {
    return (
        <>
            <Form.Group id={props.id}>
                <Form.Label>
                    {props.label}
                </Form.Label>
                <Form.Control
                    type={props.type}
                    name={props.name}
                    isInvalid={props.isInvalid}
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChange}
                    maxLength={props.maxLength} 
                    readOnly={props.readOnly}
                />
                <Form.Control.Feedback type="invalid">
                    { props.error }
                </Form.Control.Feedback>
            </Form.Group>
        </>
    );
}
