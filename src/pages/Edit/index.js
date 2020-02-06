import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { SyncLoader } from "react-spinners";
import { useAlert, positions } from 'react-alert';
import SearchVehicle from '../../components/SearchVehicle';
import VehicleForm from '../../components/VehicleForm';
import * as api from '../../api';

// import { Container } from './styles';

export default function Edit() {
  const [vehicleData, setVehicleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();
  
  function ShowAlert(type, message){
    alert.show(message, {
      position: positions.BOTTOM_CENTER,
      timeout: 2500,
      type: type,
    })
  }

  async function EditVehicle(values) {
      setIsLoading(true);
      await api.UpdateVehicle({
        ...vehicleData, color: values.color
      })
        .then((response) => {
          ShowAlert("success", "Success!");
          setVehicleData({ ...vehicleData, color: values.color });
        })
        .catch((error) => {
          ShowAlert("error", error.message);
        })
        .finally(() => setIsLoading(false))
  }

  function SetVehicleState(data) {
    if (data && Object.values(data).length > 0)
      setVehicleData(data);
  }

  function SetLoading(isLoading) {
    setIsLoading(isLoading);
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <Row>
          <Col md={12} className="text-center">
            <SyncLoader
              size={15}
              color={"#123abc"}
              loading={isLoading}
            />
          </Col>
        </Row>
      )
    } else {
      return vehicleData && Object.values(vehicleData).length > 0 ? <VehicleForm onSubmit={ EditVehicle } isEditing={true} vehicleData={vehicleData} /> 
      : <Row><Col md={12} className="text-center">No results found.</Col></Row>;
    }
  }

  return (
    <Row className="content-fadein">
      <Col md={12}>
        <Row>
          <Col md={12} className="text-center mb-4">
            Type the <b>chassis id</b> and click on the search button.
            </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="text-center">
            <SearchVehicle setStateData={SetVehicleState} setLoadingData={SetLoading} />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            {renderContent()}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
