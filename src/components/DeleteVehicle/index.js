import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import * as api from '../../api';


// import { Container } from './styles';

export default function DeleteVehicle(props) {
  const [searchValue, setSearchValue] = useState('');

  async function FindVehicle(chassisId) {
    props.setLoadingData(true);
    await api.GetVehicleByChassis(chassisId)
      .then((response) => {
        console.log('Found!');
        props.setStateData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => props.setLoadingData(false))
  }

  return (
    <InputGroup className="mb-3">
    <FormControl
      placeholder="Chassis ID"
      aria-label="Chassis ID"
      onChange={(e) => setSearchValue(e.target.value)}
    />
    <InputGroup.Append>
      <Button onClick= { () => FindVehicle(searchValue) }><FaTrashAlt /></Button>
    </InputGroup.Append>
  </InputGroup>
  );
}
