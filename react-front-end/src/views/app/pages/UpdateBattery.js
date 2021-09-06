import React, { useState, useEffect } from 'react';
import { 
  Row,FormGroup, Card, CardSubtitle,Alert,
  Label,Input, Button,Collapse,Form,
 } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import { getCurrentUser } from '../../../helpers/Utils'
import {getOemAPI,updateBatteryAPI,getBatteryByIdAPI,adminRoot} from '../../../constants/defaultValues'
import axios from 'axios';
import { useHistory,useLocation } from "react-router-dom";
import {Formik} from 'formik';
import * as yup from 'yup';

const UpdateBattery = () => {
  //state to disable button on click
  const [buttonDisabled,setButtonDisabled] = useState(false);
  //alert states
  const [alertVisible,setAlertVisible] = useState(false);
  const [alertMsg,setAlertMsg] = useState("");
  const [alertColor,setAlertColor] = useState("");
  //collapse states
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [collapse5, setCollapse5] = useState(false);
  const [collapse6, setCollapse6] = useState(false);
  const [collapse7, setCollapse7] = useState(false);
  //dropdown states
  const [oem,setOem] = useState({});
  const [oemList,setOemList] = useState([]);
  const [month,setMonth] = useState();
  const [year,setYear] = useState();
  const [chemistry,setChemistry] = useState("");
  //image states
  const [imageSelected,setImageSelected] = useState();
  const [imageFilePath,setImageFilePath] = useState();
  const [imagePreview,setImagePreview] = useState();
  const [imageErrorFLag,setImageErrorFlag] = useState(false);
  const [imageKey,setImageKey] = useState(true); //boolean key to rerender input on removing image
  //form default values states
  const [modelName,setModelName] = useState("");
  const [connectorType,setConnectorType] = useState("");
  const [gcRemark1,setGcRemark1] = useState("");
  const [gcRemark2,setGcRemark2] = useState("");
  const [nominalCapacity,setNominalCapacity] = useState("");
  const [minimumCapacity,setMinimumCapacity] = useState("");
  const [seriesCell,setSeriesCell] = useState("");
  const [parallelCell,setParallelCell] = useState("");
  const [cellType,setCellType] = useState("");
  const [cellMake,setCellMake] = useState("");
  const [totalCells,setTotalCells] = useState("");
  const [nominalVoltage,setNominalVoltage] = useState("");
  const [minimumDelivered,setMinimumDelivered] = useState("");
  const [packConfiguration,setPackConfiguration] = useState("");
  const [bmsType,setBmsType] = useState("");
  const [weight,setWeight] = useState("");
  const [dimension,setDimension] = useState("");            
  const [operatingVoltageRange,setOperatingVoltageRange] = useState("");
  const [chargingMode,setChargingMode] = useState("");
  const [recommendedVoltage,setRecommendedVoltage] = useState("");
  const [dischargingCurrent,setDischargingCurrent] = useState("");           
  const [pulsedDischargeCurrent,setPulsedDischargeCurrent] = useState("");
  const [standardChargingCurrent,setStandardChargingCurrent] = useState("");
  const [cellLowProtectionLevel,setCellLowProtectionLevel] = useState("");            
  const [cellLowProtectionRecovery,setCellLowProtectionRecovery] = useState("");
  const [cellHighProtectionLevel,setCellHighProtectionLevel] = useState("");
  const [cellHighProtectionRecovery,setCellHighProtectionRecovery] = useState("");
  const [batteryCellsEfficiency,setBatteryCellsEfficiency] = useState("");
  const [batteryCellsFaliure,setBatteryCellsFaliure] = useState("");
  const [batteryPackEfficiency,setBatteryPackEfficiency] = useState("");
  const [batteryPackFaliure,setBatteryPackFaliure] = useState("");
  const [bleedingstartvoltage,setBleedingstartvoltage] = useState("");
  const [overTempProDis,setOverTempProDis] = useState("");
  const [overTempRecoveryDis,setOverTempRecoveryDis] = useState("");
  const [overTempProCharge,setOverTempProCharge] = useState("");
  const [overTempRecoveryCharge,setOverTempRecoveryCharge] = useState("");
  const [maxWorkingTemp,setMaxWorkingTemp] = useState("");
  const [storageTemp,setStorageTemp] = useState("");
  const [tempControlCell,setTempControlCell] = useState("");
  const [tempControlPack,setTempControlPack] = useState("");
  const [tempControlSwapping,setTempControlSwapping] = useState("");
  const [moduleDimension,setModuleDimension] = useState("");
  const [cabinetDesign,setCabinetDesign] = useState("");
  const [degradationSensors,setDegradationSensors] = useState("");
  const [powerConnector,setPowerConnector] = useState("");
  const [rsCan,setRsCan] = useState("");
  const [casing,setCasing] = useState("");
  const [cellOverVoltage,setCellOverVoltage] = useState("");
  const [cellUnderVoltage,setCellUnderVoltage] = useState("");
  const [chargingOverCurrent,setChargingOverCurrent] = useState("");
  const [dischargingOverCurrent,setDischargingOverCurrent] = useState("");
  const [outputShortCircuit,setOutputShortCircuit] = useState("");
  const [cellTempProtectionDischarging,setCellTempProtectionDischarging] = useState("");
  const [cycleLife,setCycleLife] = useState("");
  const [capacityRetention,setCapacityRetention] = useState("");
  const [depthDischarge,setDepthDischarge] = useState("");            
  const [communicationPrototcol,setcommunicationPrototcol] = useState("");            
  const [networkCommunication,setNetworkCommunication] = useState("");
  const [ecRemark1,setEcRemark1] = useState("");
  const [ecRemark2,setEcRemark2] = useState("");   
  const [tcRemark1,setTcRemark1] = useState("");
  const [tcRemark2,setTcRemark2] = useState("");          
  const [mcRemark1,setMcRemark1] = useState("");
  const [mcRemark2,setMcRemark2] = useState(""); 
  const [pRemark1,setPRemark1] = useState("");
  const [pRemark2,setPRemark2] = useState(""); 
  const [wRemark1,setWRemark1] = useState("");
  const [wRemark2,setWRemark2] = useState(""); 
  const [iRemark1,setIRemark1] = useState("");
  const [iRemark2,setIRemark2] = useState(""); 
 
  const history = useHistory();
  const location = useLocation();

  useEffect(()=>{
    getOemAPICall();
    getBatteryByIdAPICall();
},[])


  //API calls
  const getOemAPICall = async() => {
    const currentUser = getCurrentUser();
    await axios.post(getOemAPI,
      {type:"1"},
      {headers:{Authorization: `Bearer ${currentUser.token}`}})
      .then(response=>{
        const responseData = response.data;
        let tempData = [];
        if (responseData.status === 1) {          
          responseData.data.map(item=>{
            tempData.push({label: item.name, value: item.oem_id, id:item.oem_id});
          })
          setOemList(tempData);
        }else{
          updateBatteryAlert(responseData.msg);
        }
      }).catch(error=>{
        console.log(error);
      })
  }
  const getBatteryByIdAPICall = async() => {
        const currentUser = getCurrentUser();
        await axios.post(getBatteryByIdAPI,
        {
            battery_master_id:location.state.battery_master_id
        },
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            let allData = {};
            if (responseData.status === 1) {
                setImagePreview(responseData.data.file_img);
                setImageFilePath(responseData.data.file_name_path);
                setOem({label:responseData.data.oem_name,value:responseData.data.oem_id,id:responseData.data.oem_id});
                setModelName(responseData.data.model_name);
                setConnectorType(responseData.data.type_of_connector);
                setGcRemark1(responseData.data.remark_1);
                setGcRemark2(responseData.data.remark_2);
                allData = JSON.parse(responseData.data.all_data);
                setMonth(allData.make_year.month);
                setYear(allData.make_year.year);
                setChemistry(allData.chemistry);
                setNominalCapacity(allData.nominal_capacity);
                setMinimumCapacity(allData.minimum_capacity);
                setSeriesCell(allData.series_cell);
                setParallelCell(allData.parallel_cell);
                setCellType(allData.cell_type);
                setCellMake(allData.cell_make);
                setTotalCells(allData.total_cells);
                setNominalVoltage(allData.nominal_voltage);
                setMinimumDelivered(allData.minimum_delivered);
                setPackConfiguration(allData.pack_configuration);
                setBmsType(allData.bms_type);
                setWeight(allData.weight);
                setDimension(allData.dimension);
                setOperatingVoltageRange(allData.operating_voltage_range);
                setChargingMode(allData.chargingMode);
                setRecommendedVoltage(allData.recommended_voltage);
                setDischargingCurrent(allData.discharging_current);
                setPulsedDischargeCurrent(allData.pulsed_discharge_current);
                setStandardChargingCurrent(allData.standard_charging_current);
                setCellLowProtectionLevel(allData.cell_low_protection_level);
                setCellLowProtectionRecovery(allData.cell_low_protection_recovery);
                setCellHighProtectionLevel(allData.cell_high_protection_level);
                setCellHighProtectionRecovery(allData.cell_high_protection_recovery);
                setBatteryCellsEfficiency(allData.battery_cells_efficiency);
                setBatteryCellsFaliure(allData.battery_cells_faliure);
                setBatteryPackEfficiency(allData.battery_pack_efficiency);
                setBatteryPackFaliure(allData.battery_pack_faliure);
                setBleedingstartvoltage(allData.bleeding_start_voltage);
                setOverTempProDis(allData.over_temp_pro_dis);
                setOverTempRecoveryDis(allData.over_temp_recovery_dis);
                setOverTempProCharge(allData.over_temp_pro_charge);
                setOverTempRecoveryCharge(allData.over_temp_recovery_charge);
                setMaxWorkingTemp(allData.max_working_temp);
                setStorageTemp(allData.storage_temp);
                setTempControlCell(allData.temp_control_cell);
                setTempControlPack(allData.temp_control_pack);
                setTempControlSwapping(allData.temp_control_swapping);
                setModuleDimension(allData.module_dimension);
                setCabinetDesign(allData.cabinet_design);
                setDegradationSensors(allData.degradation_sensors);
                setPowerConnector(allData.power_connector);
                setRsCan(allData.rs_can);
                setCasing(allData.casing);
                setCellOverVoltage(allData.cell_over_voltage);
                setCellUnderVoltage(allData.cell_under_voltage);
                setChargingOverCurrent(allData.charging_over_current);
                setDischargingOverCurrent(allData.discharging_over_current);
                setOutputShortCircuit(allData.output_short_circuit);
                setCellTempProtectionDischarging(allData.cell_temp_protection_discharging);
                setCycleLife(allData.cycle_life);
                setCapacityRetention(allData.capacity_retention);
                setDepthDischarge(allData.depth_discharge);
                setcommunicationPrototcol(allData.communication_prototcol);
                setNetworkCommunication(allData.network_communication);
                setEcRemark1(allData.ec_remark_1);
                setEcRemark2(allData.ec_remark_2);
                setTcRemark1(allData.tc_remark_1);
                setTcRemark2(allData.tc_remark_2);
                setMcRemark1(allData.mc_remark_1);
                setMcRemark2(allData.mc_remark_2);
                setPRemark1(allData.p_remark_1);
                setPRemark2(allData.p_remark_2);
                setWRemark1(allData.w_remark_1);
                setWRemark2(allData.w_remark_2);
                setIRemark1(allData.i_remark_1);
                setIRemark2(allData.i_remark_2);
            }else{
              updateBatteryAlert(responseData.msg);
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    const updateBatteryAPICall = async(params) => {
        setButtonDisabled(true);
        const currentUser = getCurrentUser();
        await axios.post(updateBatteryAPI,
        params,
        {headers:{Authorization: `Bearer ${currentUser.token}`}})
        .then(response=>{
            const responseData = response.data;
            if (responseData.status === 1) {
            history.push({
                pathname:adminRoot+'/pages/battery',
                state:{
                responseStatus:responseData.status,
                responseMsg:responseData.msg
                }
            })
            }else{
              setButtonDisabled(false);
              updateBatteryAlert(responseData.msg);
            }
        }).catch(error=>{
            setButtonDisabled(false);
            console.log(error);
        })
    }

  //Form Validation Schema
  const BatteryDetailsValidationSchema = yup.object().shape({
    model_name:yup.string()
        .required("Model name is required"),
    type_of_connector:yup.string()
        .required("Type of connector is required"),
  });

  //helpers
  const getYear = () => {
    let yearList = [];
    for (let index = 0; index <= 20; index++) {
      const temp = {label:2010+index,value:index+1,id:index+1}
      yearList.push(temp);
    }
    return yearList
  };
  //Alert helper methods
  const updateBatteryAlert = (msg)=>{
    setAlertVisible(true);
    setAlertMsg(msg);
    setAlertColor("danger");
  }
  const onDismissAlert = ()=>{
    setAlertVisible(false);
  }
  //image selection methods
  const handleImageSelect = (imageFile) =>{
    const fileExtension = imageFile.name.split('.').pop();
    if (fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png") {
      setImageErrorFlag(false);
      setImageSelected(imageFile);
      setImageFilePath("");
      setImagePreview(URL.createObjectURL(imageFile));
    } else {
      setImageErrorFlag(true);
    }
  }
  const handleDeleteImage = () =>{
    setImageKey(!imageKey);
    setImagePreview();
    setImageFilePath("");
  }

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
            model_name:modelName,
            nominal_capacity:nominalCapacity,
            minimum_capacity:minimumCapacity,
            series_cell:seriesCell,
            parallel_cell:parallelCell,
            cell_type:cellType,
            cell_make:cellMake,
            total_cells:totalCells,
            nominal_voltage:nominalVoltage,
            minimum_delivered:minimumDelivered,
            pack_configuration:packConfiguration,
            bms_type:bmsType,
            weight:weight,
            dimension:dimension,
            type_of_connector:connectorType,
            gc_remark_1:gcRemark1,
            gc_remark_2:gcRemark2,
            operating_voltage_range:operatingVoltageRange,
            charging_mode:chargingMode,
            recommended_voltage:recommendedVoltage,
            discharging_current:dischargingCurrent,
            pulsed_discharge_current:pulsedDischargeCurrent,
            standard_charging_current:standardChargingCurrent,
            cell_low_protection_level:cellLowProtectionLevel,
            cell_low_protection_recovery:cellLowProtectionRecovery,
            cell_high_protection_level:cellHighProtectionLevel,
            cell_high_protection_recovery:cellHighProtectionRecovery,
            battery_cells_efficiency:batteryCellsEfficiency,
            battery_cells_faliure:batteryCellsFaliure,
            battery_pack_efficiency:batteryPackEfficiency,
            battery_pack_faliure:batteryPackFaliure,
            bleeding_start_voltage:bleedingstartvoltage,
            over_temp_pro_dis:overTempProDis,
            over_temp_recovery_dis:overTempRecoveryDis,
            over_temp_pro_charge:overTempProCharge,
            over_temp_recovery_charge:overTempRecoveryCharge,
            max_working_temp:maxWorkingTemp,
            storage_temp:storageTemp,
            temp_control_cell:tempControlCell,
            temp_control_pack:tempControlPack,
            temp_control_swapping:tempControlSwapping,
            module_dimension:moduleDimension,
            cabinet_design:cabinetDesign,
            degradation_sensors:degradationSensors,
            power_connector:powerConnector,
            rs_can:rsCan,
            casing:casing,
            cell_over_voltage:cellOverVoltage,
            cell_under_voltage:cellUnderVoltage,
            charging_over_current:chargingOverCurrent,
            discharging_over_current:dischargingOverCurrent,
            output_short_circuit:outputShortCircuit,
            cell_temp_protection_discharging:cellTempProtectionDischarging,
            cycle_life:cycleLife,
            capacity_retention:capacityRetention,
            depth_discharge:depthDischarge,
            communication_prototcol:communicationPrototcol,
            network_communication:networkCommunication,
            ec_remark_1:ecRemark1,
            ec_remark_2:ecRemark2,
            tc_remark_1:tcRemark1,
            tc_remark_2:tcRemark2,
            mc_remark_1:mcRemark1,
            mc_remark_2:mcRemark2,
            p_remark_1:pRemark1,
            p_remark_2:pRemark2,
            w_remark_1:wRemark1,
            w_remark_2:wRemark2,
            i_remark_1:iRemark1,
            i_remark_2:iRemark2,
        }}
        validationSchema={BatteryDetailsValidationSchema} 
        onSubmit={(values)=>{
          if (month == null || year == null) {
            updateBatteryAlert("Make Year is required");
            return;
          }
          let formData  = new FormData();
          const tempData={
              make_year:{month:month,year:year},
              chemistry:chemistry,
              nominal_capacity:values.nominal_capacity,
              minimum_capacity:values.minimum_capacity,
              series_cell:values.series_cell,
              parallel_cell:values.parallel_cell,
              cell_type:values.cell_type,
              cell_make:values.cell_make,
              total_cells:values.total_cells,
              nominal_voltage:values.nominal_voltage,
              minimum_delivered:values.minimum_delivered,
              pack_configuration:values.pack_configuration,
              bms_type:values.bms_type,
              weight:values.weight,
              dimension:values.dimension,
              operating_voltage_range:values.operating_voltage_range,
              charging_mode:values.charging_mode,
              recommended_voltage:values.recommended_voltage,
              discharging_current:values.discharging_current,
              pulsed_discharge_current:values.pulsed_discharge_current,
              standard_charging_current:values.standard_charging_current,
              cell_low_protection_level:values.cell_low_protection_level,
              cell_low_protection_recovery:values.cell_low_protection_recovery,
              cell_high_protection_level:values.cell_high_protection_level,
              cell_high_protection_recovery:values.cell_high_protection_recovery,
              battery_cells_efficiency:values.battery_cells_efficiency,
              battery_cells_faliure:values.battery_cells_faliure,
              battery_pack_efficiency:values.battery_pack_efficiency,
              battery_pack_faliure:values.battery_pack_faliure,
              bleeding_start_voltage:values.bleeding_start_voltage,
              over_temp_pro_dis:values.over_temp_pro_dis,
              over_temp_recovery_dis:values.over_temp_recovery_dis,
              over_temp_pro_charge:values.over_temp_pro_charge,
              over_temp_recovery_charge:values.over_temp_recovery_charge,
              max_working_temp:values.max_working_temp,
              storage_temp:values.storage_temp,
              temp_control_cell:values.temp_control_cell,
              temp_control_pack:values.temp_control_pack,
              temp_control_swapping:values.temp_control_swapping,
              module_dimension:values.module_dimension,
              cabinet_design:values.cabinet_design,
              degradation_sensors:values.degradation_sensors,
              power_connector:values.power_connector,
              rs_can:values.rs_can,
              casing:values.casing,
              cell_over_voltage:values.cell_over_voltage,
              cell_under_voltage:values.cell_under_voltage,
              charging_over_current:values.charging_over_current,
              discharging_over_current:values.discharging_over_current,
              output_short_circuit:values.output_short_circuit,
              cell_temp_protection_discharging:values.cell_temp_protection_discharging,
              cycle_life:values.cycle_life,
              capacity_retention:values.capacity_retention,
              depth_discharge:values.depth_discharge,
              communication_prototcol:values.communication_prototcol,
              network_communication:values.network_communication,
              ec_remark_1:values.ec_remark_1,
              ec_remark_2:values.ec_remark_2,
              tc_remark_1:values.tc_remark_1,
              tc_remark_2:values.tc_remark_2,
              mc_remark_1:values.mc_remark_1,
              mc_remark_2:values.mc_remark_2,
              p_remark_1:values.p_remark_1,
              p_remark_2:values.p_remark_2,
              w_remark_1:values.w_remark_1,
              w_remark_2:values.w_remark_2,
              i_remark_1:values.i_remark_1,
              i_remark_2:values.i_remark_2,
          }
          formData.append('battery_master_id',location.state.battery_master_id);
          formData.append('oem_id',oem.value);
          formData.append('model_name',values.model_name,);
          formData.append('type_of_connector',values.type_of_connector);
          formData.append('make_year',month.label+"-"+year.label);
          formData.append('file_name_path',imageFilePath);
          formData.append('remark_1',values.gc_remark_1);
          formData.append('remark_2',values.gc_remark_2);
          formData.append('all_data',JSON.stringify(tempData));
          if (imageSelected!=null){
            formData.append('img_file',imageSelected);
          }
          updateBatteryAPICall(formData);
        }} >
          {({handleChange,handleBlur,handleSubmit,values,touched,errors,isValid})=>(
            <>
              <Row>
                <Colxx xxs="12">
                    <span className="page_title">Update Battery</span>
                      <Button color="light" className="default float-right" onClick={()=>history.goBack()}>
                          <b>Cancel</b>
                      </Button>
                      <Button color="primary" className="default mr-2 float-right" onClick={handleSubmit} disabled={buttonDisabled}>
                        <i className="glyph-icon simple-icon-check font-weight-bold"></i> <b>Update</b>
                      </Button>              
                  <Separator className="mb-5" />
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="12" lg="12">
                  <ul className="list-unstyled mb-4">
                    <li>
                      <CardSubtitle className="mb-3">
                        <Alert color={alertColor} isOpen={alertVisible} toggle={onDismissAlert}>
                          {alertMsg}
                        </Alert>
                      </CardSubtitle>
                    </li>
                    <li>
                      <Card className={isValid?"question d-flex mb-4":"question d-flex mb-4 cardBorderError"}>
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">1</span>
                              General Characteristics
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse1 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse1(!collapse1)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse1}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                              <Row>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                        OEM
                                      </Label>
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Year"
                                        value={oem}
                                        onChange={(e) => setOem(e)}
                                        options={oemList}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Model Name
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Model Name"
                                        name="model_name"
                                        value={values.model_name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.model_name && touched.model_name ? "input-error":null}
                                      />
                                      {errors.model_name && touched.model_name &&(
                                        <span className="error">{errors.model_name}</span>
                                      )}
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Make Year
                                      </Label>
                                      <Row>
                                      <Colxx md="6">
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Month"
                                        value={month}
                                        onChange={(e) => setMonth(e)}
                                        options={[
                                          { label: 'Jan', value: '1', id: 1 },
                                          { label: 'Feb', value: '2', id: 2 },
                                          { label: 'Mar', value: '3', id: 3 },
                                          { label: 'Apr', value: '4', id: 4 },
                                          { label: 'May', value: '5', id: 6 },
                                          { label: 'Jun', value: '6', id: 7 },
                                          { label: 'Jul', value: '7', id: 8 },
                                          { label: 'Aug', value: '8', id: 9 },
                                          { label: 'Sep', value: '9', id: 10 },
                                          { label: 'Oct', value: '10', id: 11 },
                                          { label: 'Nov', value: '11', id: 12 },
                                          { label: 'Dec', value: '12', id: 13 },
                                        ]}
                                      />
                                      </Colxx>
                                      <Colxx md="6">
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        placeholder="Year"
                                        value={year}
                                        onChange={(e) => setYear(e)}
                                        options={getYear()}
                                      />
                                      </Colxx>
                                      </Row>
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Chemistry
                                      </Label>
                                      <Select
                                        components={{ Input: CustomSelectInput }}
                                        className="react-select"
                                        classNamePrefix="react-select"
                                        name="form-field-name"
                                        value={chemistry}
                                        onChange={(e) => setChemistry(e)}
                                        options={[
                                          { label: 'NMC', value: '1', id: 1 },
                                          { label: 'NCA', value: '2', id: 2 },
                                          { label: 'LFP', value: '3', id: 3 },
                                          { label: 'LTO', value: '4', id: 4 },
                                          { label: 'LMO', value: '5', id: 5 }
                                        ]}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Nominal Capacity (AH)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Nominal Capacity (AH)"
                                        name="nominal_capacity"
                                        value={values.nominal_capacity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Minimum Capacity (AH)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Minimum Capacity (AH)"
                                        name="minimum_capacity"
                                        value={values.minimum_capacity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      No. of cell in series
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="No. of cell in series"
                                        name="series_cell"
                                        value={values.series_cell}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      No. of cell in parallel
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="No. of cell in parallel"
                                        name="parallel_cell"
                                        value={values.parallel_cell}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell Type
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell Type"
                                        name="cell_type"
                                        value={values.cell_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell Make
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell Make"
                                        name="cell_make"
                                        value={values.cell_make}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Total number of cells
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Total number of cells"
                                        name="total_cells"
                                        value={values.total_cells}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Nominal voltage (V)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Nominal voltage (V)"
                                        name="nominal_voltage"
                                        value={values.nominal_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Minimum delivered KWH
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Minimum delivered KWH"
                                        name="minimum_delivered"
                                        value={values.minimum_delivered}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Pack Configuration
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Pack Configuration"
                                        name="pack_configuration"
                                        value={values.pack_configuration}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      BMS type
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="BMS type"
                                        name="bms_type"
                                        value={values.bms_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Weight
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Weight"
                                        name="weight"
                                        value={values.weight}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Dimension
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Module dimension"
                                        name="dimension"
                                        value={values.dimension}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Type of Connector
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Type of Connector"
                                        name="type_of_connector"
                                        value={values.type_of_connector}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                      {errors.type_of_connector && touched.type_of_connector &&(
                                        <span className="error">{errors.type_of_connector}</span>
                                      )}
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                        Image
                                      </Label>
                                      <Input
                                        key={imageKey}
                                        type="file"
                                        name="upload_image"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={e=>handleImageSelect(e.target.files[0])}
                                      />
                                      {imageErrorFLag && 
                                        <span className="error">Image must be either png,jpg or jpeg format</span>
                                      }
                                    </FormGroup>
                                  </Colxx>
                                  {(imagePreview!=null && imagePreview!="") &&
                                    <Colxx sm={3}>
                                      <div>
                                        <Button className="custom-badge default tbl_action_btn" onClick={()=>handleDeleteImage()}><i className="glyph-icon simple-icon-trash image-remove-icon"></i></Button>
                                        <img src={imagePreview} height="100px" width="150px" alt="Image Preview"/>
                                      </div>
                                    </Colxx>
                                  }                
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark 1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="gc_remark_1"
                                        value={values.gc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark 2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="gc_remark_2"
                                        value={values.gc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                    </li>
                    <li>
                      <Card className="question d-flex mb-4">
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">2</span>
                              Electrical Characteristics
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse2 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse2(!collapse2)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse2}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                              <Row>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Operating Voltage Range(V)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Operating voltage range(V)"
                                        name="operating_voltage_range"
                                        value={values.operating_voltage_range}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Charging Mode
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Charging mode"
                                        name="charging_mode"
                                        value={values.charging_mode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Recommended Voltage (V)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Recommended voltage (V)"
                                        name="recommended_voltage"
                                        value={values.recommended_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Std. DisCh. Current (A)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Std. DisCh. current"
                                        name="discharging_current"
                                        value={values.discharging_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Pulsed Discharge Current(A)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Pulsed Discharge Current(A)"
                                        name="pulsed_discharge_current"
                                        value={values.pulsed_discharge_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Std. Charging Current(A)
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Std. Charging Current(A)"
                                        name="standard_charging_current"
                                        value={values.standard_charging_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell low cut prot. level
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell low cut prot. level"
                                        name="cell_low_protection_level"
                                        value={values.cell_low_protection_level}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell low cut prot. recovery level
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell low cut prot. recovery level"
                                        name="cell_low_protection_recovery"
                                        value={values.cell_low_protection_recovery}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell high cut prot. level
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell high cut prot. level"
                                        name="cell_high_protection_level"
                                        value={values.cell_high_protection_level}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Cell high cut prot. recovery level
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell high cut prot. rec level"
                                        name="cell_high_protection_recovery"
                                        value={values.cell_high_protection_recovery}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery cells efficiency rate
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery cells efficiency rate"
                                        name="battery_cells_efficiency"
                                        value={values.battery_cells_efficiency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery cells failure rate
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery cells failure rate"
                                        name="battery_cells_faliure"
                                        value={values.battery_cells_faliure}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery pack efficiency rate
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery pack efficiency rate"
                                        name="battery_pack_efficiency"
                                        value={values.battery_pack_efficiency}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Battery pack failure rate
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Battery pack failure rate"
                                        name="battery_pack_faliure"
                                        value={values.battery_pack_faliure}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Bleeding start voltage level
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Bleeding start voltage level"
                                        name="bleeding_start_voltage"
                                        value={values.bleeding_start_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Over temp. prot. in DisCh.mode
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Over Temp. prot. DisCh.mode"
                                        name="over_temp_pro_dis"
                                        value={values.over_temp_pro_dis}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Over temp. prot. recovery in DisCh.mode
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Temp. prot. rec DisCh.mode"
                                        name="over_temp_recovery_dis"
                                        value={values.over_temp_recovery_dis}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Over temp. prot. in charge mode 
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Temp. prot. charge mode"
                                        name="over_temp_pro_charge"
                                        value={values.over_temp_pro_charge}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Over temp. prot. recovery in charge mode
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Temp. prot. rec charge mode"
                                        name="over_temp_recovery_charge"
                                        value={values.over_temp_recovery_charge}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="ec_remark_1"
                                        value={values.ec_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={3}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="ec_remark_2"
                                        value={values.ec_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">3</span>
                                Temprature Characteristics
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse3 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse3(!collapse3)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse3}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>                        
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Maximum Working Temp.
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Max. Working Temp."
                                          name="max_working_temp"
                                          value={values.max_working_temp}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Storage Temp.
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Storage Temp."
                                          name="storage_temp"
                                          value={values.storage_temp}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Temp. control at cell level
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Temp. control at cell level"
                                          name="temp_control_cell"
                                          value={values.temp_control_cell}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Temp. control at pack level
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Temp. control at pack level"
                                          name="temp_control_pack"
                                          value={values.temp_control_pack}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Temp. control at swapping panel level
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Temp. control at swapping panel level"
                                          name="temp_control_swapping"
                                          value={values.temp_control_swapping}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="tc_remark_1"
                                        value={values.tc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="tc_remark_2"
                                        value={values.tc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>                        
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">4</span>
                                Mechanical Characteristics
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse4 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse4(!collapse4)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse4}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Module dimension
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Module dimension"
                                          name="module_dimension"
                                          value={values.module_dimension}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Cabinet design
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Cabinet design"
                                          name="cabinet_design"
                                          value={values.cabinet_design}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Degradation of sensors/connectors
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Degradation of sensors"
                                          name="degradation_sensors"
                                          value={values.degradation_sensors}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Power connector
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Power connector"
                                          name="power_connector"
                                          value={values.power_connector}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        RS485/CAN
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="RS485/CAN"
                                          name="rs_can"
                                          value={values.rs_can}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Casing
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Casing"
                                          name="casing"
                                          value={values.casing}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="mc_remark_1"
                                        value={values.mc_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="mc_remark_2"
                                        value={values.mc_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                      <Card className="question d-flex mb-4">
                        <div className="d-flex flex-grow-1 min-width-zero">
                          <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                            <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                              <span className="heading-number d-inline-block">5</span>
                              Protections
                            </div>
                          </div>
                          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                            <Button
                              outline
                              color="theme-3"
                              className={`icon-button ml-1 rotate-icon-click ${
                                collapse5 ? 'rotate' : ''
                              }`}
                              onClick={() => setCollapse5(!collapse5)}
                            >
                              <i className="simple-icon-arrow-down" />
                            </Button>
                          </div>
                        </div>
                        <Collapse isOpen={collapse5}>
                          <div className="card-body pt-0">
                            <div className="edit-mode">
                              <Form>
                              <Row>
                                <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Cell over voltage prot.
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell over voltage prot."
                                        name="cell_over_voltage"
                                        value={values.cell_over_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Cell under voltage prot.
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell under voltage prot."
                                        name="cell_under_voltage"
                                        value={values.cell_under_voltage}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Charging over current prot.
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Charging over current prot."
                                        name="charging_over_current"
                                        value={values.charging_over_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      DisCh. over current prot.
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="DisCh. over current prot."
                                        name="discharging_over_current"
                                        value={values.discharging_over_current}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Output short circuit prot.
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Output short circuit prot."
                                        name="output_short_circuit"
                                        value={values.output_short_circuit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Cell temp prot. in DisCh. mode
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Cell temp prot. in DisCh. mode"
                                        name="cell_temp_protection_discharging"
                                        value={values.cell_temp_protection_discharging}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="p_remark_1"
                                        value={values.p_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="p_remark_2"
                                        value={values.p_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                </Row>
                              </Form>
                            </div>
                          </div>
                        </Collapse>
                      </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">6</span>
                                Warranty
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse6 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse6(!collapse6)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse6}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Cycle life @ 80 DoD% / No. of Years
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Cycle life @ 80 DoD% / No. of Years"
                                          name="cycle_life"
                                          value={values.cycle_life}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Capacity retention of 70%
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Capacity retention of 70%"
                                          name="capacity_retention"
                                          value={values.capacity_retention}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                      <FormGroup>
                                        <Label>
                                        Depth of Discharge (DoD) upon return
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Depth of Discharge (DoD) upon return"
                                          name="depth_discharge"
                                          value={values.depth_discharge}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="w_remark_1"
                                        value={values.w_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={4}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="w_remark_2"
                                        value={values.w_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                      <li>
                        <Card className="question d-flex mb-4">
                          <div className="d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-md-row justify-content-between min-width-zero align-items-md-center">
                              <div className="list-item-heading mb-0 truncate w-80 mb-1 mt-1">
                                <span className="heading-number d-inline-block">7</span>
                                Interface
                              </div>
                            </div>
                            <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                              <Button
                                outline
                                color="theme-3"
                                className={`icon-button ml-1 rotate-icon-click ${
                                  collapse7 ? 'rotate' : ''
                                }`}
                                onClick={() => setCollapse7(!collapse7)}
                              >
                                <i className="simple-icon-arrow-down" />
                              </Button>
                            </div>
                          </div>
                          <Collapse isOpen={collapse7}>
                            <div className="card-body pt-0">
                              <div className="edit-mode">
                                <Form>
                                <Row>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Communication Protocol
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Communication Protocol"
                                          name="communication_prototcol"
                                          value={values.communication_prototcol}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                      <FormGroup>
                                        <Label>
                                        Netwrok Communication
                                        </Label>
                                        <Input
                                          type="text"
                                          placeholder="Netwrok Communication"
                                          name="network_communication"
                                          value={values.network_communication}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Colxx>
                                    <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark1
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark1"
                                        name="i_remark_1"
                                        value={values.i_remark_1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  <Colxx sm={6}>
                                    <FormGroup>
                                      <Label>
                                      Remark2
                                      </Label>
                                      <Input
                                        type="text"
                                        placeholder="Remark2"
                                        name="i_remark_2"
                                        value={values.i_remark_2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                      />
                                    </FormGroup>
                                  </Colxx>
                                  </Row>
                                </Form>
                              </div>
                            </div>
                          </Collapse>
                        </Card>
                      </li>
                  </ul>
                </Colxx>
              </Row>
            </>
          )}
      </Formik>
    </>
  );
};

export default UpdateBattery;   
