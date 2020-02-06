import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import SearchVehicle from '../../components/SearchVehicle';
import StandardList from '../../components/StandardList';
import { SyncLoader } from 'react-spinners';

// import { Container } from './styles';

export default function Find() {
  const [vehicleData, setVehicleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function SetVehicleState(data){
    if(data && Object.values(data).length > 0)
      setVehicleData(data);
  }

  function SetLoading(isLoading) {
    setIsLoading(isLoading);
  }

  function renderContent() {
    if (isLoading) {
      return <SyncLoader
        size={15}
        color={"#123abc"}
        loading={isLoading}
      />
    } else if(Object.values(vehicleData).length > 0){
      return <StandardList data={[vehicleData]} />;
    }else{
      return <span>No results found.</span>
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
            <Col md={{ span: 6, offset: 3}} className="text-center">
              <SearchVehicle setStateData={SetVehicleState} setLoadingData={SetLoading} />
            </Col>
          </Row>

          <Row>
            <Col md={12} className="text-center">
              { renderContent() }
            </Col>
          </Row>
        </Col>
    </Row>
  );
}
