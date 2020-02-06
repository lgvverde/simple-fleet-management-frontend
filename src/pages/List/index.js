import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { positions, useAlert } from 'react-alert';
import StandardList from '../../components/StandardList';
import * as api from '../../api';

// import { Container } from './styles';

export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState({});
  const alert = useAlert();

  const ShowAlert = (type, message) => {
    alert.show(message, {
      position: positions.BOTTOM_CENTER,
      timeout: 2500,
      type: type,
    })
  }

  useEffect(() => {
    
    async function GetVehicles() {
      setIsLoading(true);
      await api.GetAllVehicles()
        .then(response => {
          setVehicles(response.data)
          console.log(response.data);
        })    
        .catch(error => ShowAlert("error", error.message))
        .finally(() => setIsLoading(false))
    }
    GetVehicles();
    // eslint-disable-next-line 
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <SyncLoader
        size={15}
        color={"#123abc"}
        loading={isLoading}
      />
    } else if (vehicles && Object.values(vehicles).length > 0) {
      return <StandardList data={vehicles} />;
    } else {
      return (
        <Row>
          <Col md={12} className="text-center">
            <span>There are no vehicles found in your fleet.</span>
          </Col>
        </Row>
      );
    }
  }

  return (
    <Row className="content-fadein">
      <Col md={12} className="text-center">
        {
          renderContent()
        }
      </Col>
    </Row>
  );
}
