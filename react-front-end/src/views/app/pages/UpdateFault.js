import React, { useState,useEffect } from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {adminRoot,getOemAPI,updateFaultAPI,getFaultByIdAPI} from '../../../constants/defaultValues'
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import { useHistory,useLocation } from "react-router-dom";

const UpdateFault = () => {
  const history = useHistory();
  const location = useLocation();
  //state
  const [oemId,setOemId] = useState("");
  const [oemList,setOemList] = useState([]);
  const [type,setType] = useState(0);
  const [faultTitle,setFaultTitle] = useState("");
  const [position,setPosition] = useState("");
  //error flags
  const [errorTypeFlag,setErrorTypeFlag] = useState(false);
  const [errorOemFlag,setErrorOemFlag] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);

  useEffect(()=>{
      getFaultByIdAPICall();
    },[])


  //API calls
  const getOemAPICall = async(typeId) => {
    setAlertVisible(false);
    const currentUser = getCurrentUser();
    await axios.post(getOemAPI,
      {type:typeId},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {          
          setOemList(responseData.data);
        }else{
          setOemList([]);
          faultUpdatedAlert("OEM data for selectd type not found");
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getFaultByIdAPICall = async() => {
        const currentUser = getCurrentUser();
        await axios.post(getFaultByIdAPI,
        {
            fault_master_id:location.state.fault_master_id
        },
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            if (responseData.status === 1) {
                setType(responseData.data.type);
                responseData.data.type==4?getOemAPICall(3):getOemAPICall(responseData.data.type);
                setOemId(responseData.data.oem_id);
                setFaultTitle(responseData.data.title);
                setPosition(responseData.data.bit_position);
            }else{                
              faultUpdatedAlert(responseData.msg);
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    const updateFaultAPICall = async(params) => {
        setButtonDisabled(true);
        const currentUser = getCurrentUser();
        await axios.post(updateFaultAPI,
        params,
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            if (responseData.status === 1) {
              history.push({
                pathname:adminRoot+'/pages/fault',
                state:{
                  responseStatus:responseData.status,
                  responseMsg:responseData.msg
                }
              })
            }else{
              setButtonDisabled(false);
              faultUpdatedAlert(responseData.msg);
            }
        }).catch(error=>{
            setButtonDisabled(false);
            console.log(error);
        })
    }

  //helper methods
  //Alert helper methods
  const faultUpdatedAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //type select method
  const handleTypeSelect = (typeValue) => {
    setOemId("");
    setType(typeValue);
    if (typeValue == 4) {
      getOemAPICall(3);
    } else {
      getOemAPICall(typeValue); 
    }
  }
  //type blur
  const handleTypeBlur = (typeValue) => {
    setErrorTypeFlag(false);
    if (typeValue == 0) {
      setErrorTypeFlag(true);
    }
  }
  //OEM select method
  const handleOemSelect = (oemValue) => {
    if (oemValue == 0) {
      setOemId(" ");
    } else {
      setOemId(oemValue); 
    }
  }
  //oem blur
  const handleOemBlur = (oemValue) => {
    setErrorOemFlag(false);
    if (oemValue == 0) {
      setErrorOemFlag(true);
    }
  }
  //Form Validation Schema
  const FaultDetailsValidationSchema = yup.object().shape({
    title:yup.string()
        .required("Fault title is required"),
    bit_position:yup.string()
        .required("Position is required"),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Update Fault</span>
            <a href="fault" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Fault List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={{
            title:faultTitle,
            bit_position:position,
        }}
        validationSchema={FaultDetailsValidationSchema} 
        onSubmit={(values)=>{
          const params = {
              fault_master_id:location.state.fault_master_id,
              type:type,
              title:values.title,
              oem_id:oemId,
              bit_position:values.bit_position
            }
          updateFaultAPICall(params);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors})=>(
            <>
              <Row>
                <Colxx xxs="12" className="mb-4">
                  <Card className="mb-4">
                      <CardBody> 
                        <Row>
                          <Colxx md="12">
                              <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                                {alertMsg}
                              </Alert>
                          </Colxx>
                          <Colxx md={6}>
                            <FormGroup>
                              <Label>
                                Type
                              </Label>
                              <Input type="select" 
                              name="type"
                              value={type}
                              onChange={(e)=>handleTypeSelect(e.target.value)}
                              onBlur={(e)=>handleTypeBlur(e.target.value)}>
                                  <option key={0} value={0}>Select</option>
                                  <option key={1} value={1}>Battery</option>
                                  <option key={2} value={2}>EV</option>
                                  <option key={3} value={3}>Charger</option>
                                  <option key={4} value={4}>Connector</option>
                              </Input>
                              {errorTypeFlag &&(
                                  <span className="error">Type is required</span>
                                )}  
                              </FormGroup>
                            </Colxx>
                            <Colxx sm={6}>
                              <FormGroup>
                                <Label>
                                  OEM
                                </Label>
                                <Input type="select" 
                                name="oem_id"
                                value={oemId}
                                onChange={(e)=>handleOemSelect(e.target.value)}
                                onBlur={(e)=>handleOemBlur(e.target.value)}>
                                    <option key={0} value={0}>Select</option>
                                    {oemList.map((item,index)=>
                                      <option key={index} value={item.oem_id}>{item.name}</option>
                                    )}
                                </Input>
                                {errorOemFlag &&(
                                    <span className="error">OEM is required</span>
                                  )}   
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Fault Title
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Fault title "
                                  name="title"
                                  value={values.title}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.title && touched.title ? "input-error":null}
                                />
                                {errors.title && touched.title &&(
                                  <span className="error">{errors.title}</span>
                                )}  
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Position
                                </Label>
                                <Input
                                  type="number"
                                  placeholder="Position "
                                  name="bit_position"
                                  value={values.bit_position}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.bit_position && touched.bit_position ? "input-error":null}
                                />
                                {errors.bit_position && touched.bit_position &&(
                                  <span className="error">{errors.bit_position}</span>
                                )}  
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx md="12" className="text-center">
                              <Button color="primary" className="default mr-2" onClick={handleSubmit} disabled={buttonDisabled}>
                                  <b>Update</b>
                              </Button>
                              <Button color="light" className="default" onClick={()=>{history.goBack()}}>
                                  <b>Cancel</b>
                              </Button>
                            </Colxx>
                          </Row>
                      </CardBody>
                      </Card>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>  
    </>
  );
};

export default UpdateFault;
