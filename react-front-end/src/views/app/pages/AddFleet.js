import React, { useState,useEffect } from 'react';
import { 
  Row,FormGroup, Card, CardBody,
  Label,Input, Button,Alert
 } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import Select from 'react-select';
import { getCurrentUser } from '../../../helpers/Utils'
import {addFleetOperatorAPI,getUsersByRolesAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const AddFleet = () => {
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //multiSelect state
  const [selectedOptions, setSelectedOptions] = useState([]);
  //fleet users list 
  const [fleetOperatorUsers, setFleetOperatorUsers] = useState([]);
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);

  const history = useHistory();

  useEffect(()=>{
    getFleetOperatorUsersAPICall();
  },[])

  //API calls
  const getFleetOperatorUsersAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getUsersByRolesAPI,
      {user_role:"fleet operator"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        let users=[];
        if (responseData.status === 1) {
          responseData.data.map(item=>{
           users.push({label:item.name,value:item.id,key:item.id})
         })
         setFleetOperatorUsers(users);
        }else{
          fleetAddedAlert(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const addFleetOperatorAPICall = async(params) => {
    setButtonDisabled(true);
    const currentUser = getCurrentUser();
    await axios.post(addFleetOperatorAPI,
      params,
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        if (responseData.status === 1) {
          history.push({
            pathname:adminRoot+'/pages/fleetoperator',
            state:{
              responseStatus:responseData.status,
              responseMsg:responseData.msg
            }
          })
        }else{
          setButtonDisabled(false);
          fleetAddedAlert(responseData.msg);
        }
      }).catch(error=>{
        setButtonDisabled(false);
        console.log(error);
      })
  }

  //helper methods
  //Alert helper methods
  const fleetAddedAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //Form Validation Schema
  const FleetOperatorDetailsValidationSchema = yup.object().shape({
    name:yup.string()
        .required("Name is required"),
    address:yup.string()
        .required("Address is required"),
    contact_person:yup.string()
        .required("Contact Person is required"),
    contact_email:yup.string()
        .email("Invalid Email format")
        .required("Contact email is required"),
    contact_number:yup.string()
        .matches(/\+?\d[\d -]{8,12}\d/,"Invalid contact number")
        .length(10,"Invalid contact number length")
        .required("Contact number is required"),
  });

  const initialValues = {
    name:"",
    contact_person:"",
    contact_email:"",
    contact_number:"",
    address:"",
    remark_1:"",
    remark_2:""
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
            <span className="page_title">Add Fleet Operator</span>
            <a href="fleetoperator" className="mt-2 btn-primary default btn-sm float-right">
                <b><i className="glyph-icon simple-icon-list"></i> Fleet Operator List</b>
            </a>
          <Separator className="mb-5 mt-1" />
        </Colxx>
      </Row>
      <Formik
        initialValues={initialValues}
        validationSchema={FleetOperatorDetailsValidationSchema} 
        onSubmit={(values)=>{
          const usersSelected = [];
          selectedOptions.map(item=>{
            usersSelected.push(item.value)
          })
          const params = {
            name:values.name,
            users:usersSelected,
            contact_person:values.contact_person,
            contact_email:values.contact_email,
            contact_number:values.contact_number,
            address:values.address,
            remark_1:values.remark_1,
            remark_2:values.remark_2
          }
          addFleetOperatorAPICall(params);
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
                                  Name
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Name"
                                  name="name"
                                  value={values.name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.name && touched.name ? "input-error":null}
                                />
                                {errors.name && touched.name &&(
                                  <span className="error">{errors.name}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Users
                                </Label>
                                  <Select
                                    components={{ Input: CustomSelectInput }}
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    isMulti
                                    name="form-field-name"
                                    value={selectedOptions}
                                    onChange={setSelectedOptions}
                                    options={fleetOperatorUsers}
                                  />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Contact Person
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Person"
                                  name="contact_person"
                                  value={values.contact_person}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_person && touched.contact_person ? "input-error":null}
                                />
                                {errors.contact_person && touched.contact_person &&(
                                  <span className="error">{errors.contact_person}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Contact Email
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Email"
                                  name="contact_email"
                                  value={values.contact_email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_email && touched.contact_email ? "input-error":null}
                                />
                                {errors.contact_email && touched.contact_email &&(
                                  <span className="error">{errors.contact_email}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Contact Number
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Contact Number"
                                  name="contact_number"
                                  value={values.contact_number}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.contact_number && touched.contact_number ? "input-error":null}
                                />
                                {errors.contact_number && touched.contact_number &&(
                                  <span className="error">{errors.contact_number}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Address
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Address"
                                  name="address"
                                  value={values.address}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={errors.address && touched.address ? "input-error":null}
                                />
                                {errors.address && touched.address &&(
                                  <span className="error">{errors.address}</span>
                                )}
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                Remark1
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_1"
                                  placeholder="Remark1"
                                  value={values.remark_1}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                            <Colxx md={6}>
                              <FormGroup>
                                <Label>
                                  Remark2
                                </Label>
                                <Input
                                  type="text"
                                  name="remark_2"
                                  placeholder="Remark2"
                                  value={values.remark_2}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                />
                              </FormGroup>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx md="12" className="text-center">
                              <Button color="primary" className="default mr-2" onClick={handleSubmit} disabled={buttonDisabled}>
                                  <b>Add</b>
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

export default AddFleet;