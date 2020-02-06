import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useAlert, positions } from 'react-alert';
import DeleteVehicle from '../../components/DeleteVehicle';
import VehicleModalData from '../../components/VehicleModalData';
import { SyncLoader } from 'react-spinners';
import vehicleList from '../../utils/vehicleType';
import * as api from '../../api';


// import { Container } from './styles';

export default function Delete() {
  const [vehicleData, setVehicleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModalData, setShowModalData] = useState(false);  
  const alert = useAlert();
  
  function ShowAlert(type, message){
    alert.show(message, {
      position: positions.BOTTOM_CENTER,
      timeout: 2500,
      type: type,
    })
  }
  function GetIcon(){
    if(vehicleData && Object.values(vehicleData).length > 0)
      return vehicleList.find(x => x.name === vehicleData.type).icon;
    else
      return ''
  }

  async function DeleteVehicleAPI() {
    setIsLoading(true);
    await api.DeleteVehicle(vehicleData.id)
      .then(async (response) => {
        await api.DeleteChassis(vehicleData.chassisId)
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
      .finally(() => { setIsLoading(false); toggleModal(); setVehicleData({}); })

}

  function SetVehicleState(data){
    if(data && Object.values(data).length > 0)
      setVehicleData(data);
      toggleModal();
  }

  function SetLoading(isLoading) {
    setIsLoading(isLoading);
  }

  const toggleModal = () => {
    setShowModalData(!showModalData);
  }

  function renderContent() {
    if (isLoading) {
      return <SyncLoader
        size={15}
        color={"#123abc"}
        loading={isLoading}
      />
    } else if(Object.values(vehicleData).length > 0){
      return <VehicleModalData data={vehicleData} icon={ GetIcon() } isLoading={isLoading} show={showModalData} handleClose={toggleModal} isDeleting={true} confirmDelete={ DeleteVehicleAPI }/>;
    }else{
      return <span>No results found.</span>
    }
  }

  return (
    <Row className="content-fadein">
        <Col md={12}>
          <Row>
            <Col md={12} className="text-center mb-4">
              Type the <b>chassis id</b> and click on the delete button.
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3}} className="text-center">
              <DeleteVehicle setStateData={SetVehicleState} setLoadingData={SetLoading} />
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
