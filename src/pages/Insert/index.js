import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { useAlert, positions } from 'react-alert';
import VehicleForm from '../../components/VehicleForm';
import * as api from '../../api';

// import { Container } from './styles';

export default function Insert() {
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  function ShowAlert(type, message) {
    alert.show(message, {
      position: positions.BOTTOM_CENTER,
      timeout: 2500,
      type: type,
    })
  }

  async function InsertVehicle(values) {

    async function InsertValuesAPI() {
      setIsLoading(true);
      await api.InsertChassis({
        series: values.series,
        number: values.number,
      })
        .then(async (response) => {
          await api.InsertVehicle({
            color: values.color,
            numberOfPassengers: values.numberOfPassengers,
            type: values.vehicleType,
            chassisId: response.data.id
          })
            .then((response) => {
              ShowAlert("success", "Success!");
            })
            .catch((error) => {
              ShowAlert("error", error.message);
            })
        })
        .catch((error) => {
          ShowAlert("error", error.message);
        })
        .finally(() => setIsLoading(false))
    }

    InsertValuesAPI();

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
      );
    } else {
      return <VehicleForm onSubmit={InsertVehicle} />;
    }
  }

  return (
    <Row className="content-fadein">
      <Col md={12}>
        <Row>
          <Col md={12}>
            {
              renderContent()
            }
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
