import React from 'react';
import { Form } from 'react-bootstrap';

export default function SelectInput(props) {
    return (
        <Form.Group>
            <Form.Label>{ props.label }</Form.Label>
            <Form.Control type={ props.type } as="select" 
                onChange={props.onChange} 
                value={props.value} 
                name={props.name}
                isInvalid={props.isInvalid}
                disabled={props.disabled}
            >
                <option value="">Chosse a type</option>
                {
                    props.data.map(element => <option key={element.name} value={element.name}>{element.name}</option>)
                }
            </Form.Control>
            <Form.Control.Feedback type="invalid">
                    { props.error }
            </Form.Control.Feedback>
        </Form.Group>
    );
}