import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import APIs from "./APIs";
import { setRegionId } from "../../containers/PersonalData/action";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import store from "store-js";

import fetchCatch from "../../utils/fetchCatch";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Selections() {
  const [cities, setCities] = useState([]);
  const [region, setRegion] = useState([]);
  const [area,setArea]=useState([]);
  const [selectedCity, setSlectedCity] = useState(null);
  const [selectedRegion,setSelectedRegion]=useState(null)
  const [getReginId,setGetReginId]=useState(null)
  const [msg,setMsg]=useState("")
  const [snackMsg, setSnackMsg] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
 

  const classes = useStyles();

  const dispatch = useDispatch();

  async function getcities() {
    // setLoader(true);
    try {
      const data = await APIs.cities();
      setCities(data.data.cities);
      // setLoader(false);
    } catch (ex) {
      console.log(ex);
      // setLoader(false);
    }
  }

  async function fetchSelectedCities() {
    if (selectedCity) {
      try {
        const { data, status } = await APIs.selectedCities(selectedCity);
        if (status === 200) {
          setRegion(data.regions);
        }

        // setState((prevState) => ({ ...prevState, regions: data.regions }));
      } catch (ex) {
        console.log(ex);
      }
    }
   
  }

  useEffect(() => {
    getcities();
  }, []);

  useEffect(() => {
    fetchSelectedCities();
  }, [selectedCity]);

  const [open, setOpen] = React.useState(false);

  const handleCity = (event) => {
    setSlectedCity( event.target.value)
 
 };

  const handRegion = (event) => {
  
    setSelectedRegion(event.target.value);
  };
const handleArea=(event)=>{
  setGetReginId(event.target.value)
 
}

const setError=()=>{
  if(!selectedCity){
    setOpenSnack(true);
    setSnackMsg('  ابتدا شهر خود را انتخاب کنید ')
  }
}
useEffect(()=>{
  region.filter(item=>{
    if(item.id===parseInt(selectedRegion)){
      setArea(item.areas)
    }
    
  })

})
const setSelectedReginId=()=>{
  if(getReginId){
    dispatch(setRegionId(getReginId?.region_id))
  }
}
useEffect(()=>{
  setSelectedReginId()
},[getReginId])

const handleCloseErrMessage = () => {
  setOpenSnack(false);
};

  return (
    <div style={{    width:" 100%"}}>
         <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openSnack}
        autoHideDuration={5000}
        onClose={handleCloseErrMessage}
        message={snackMsg}
        style={{ width: "200px", left: "50%", bottom: "5%", right: "24%" }}
      />
    <div style={{ width: "100%" }}>
    <p style={{    fontSize: "14px",
    marginRight: "20px"}}>انتخاب شهر </p>
    <FormControl style={{ width: "100%" }} className={classes.formControl}>
        {/* <InputLabel id="demo-simple-select-helper-label">شهرها</InputLabel> */}
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedCity}
          onChange={handleCity}
        >
          {
            cities.map(item=>{
             return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
            })
          }
        
        </Select>
      </FormControl>
    </div>
 
      <div style={{ width: "100%" }} >
      <p style={{    fontSize: "14px",
    marginRight: "20px"}}>انتخاب منطقه </p>
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          {/* <InputLabel id="demo-simple-select-helper-label2">منطقه</InputLabel> */}
          <Select
            labelId="demo-simple-select-helper-label2"
            id="demo-simple-select-helper2"
            value={selectedRegion}
            onChange={handRegion}
            onClick={setError}
            placeholder="منطقه"
          >
            {
              
          region.map(item=>{
            return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
          })
            
          }
    
          </Select>
        </FormControl>
      </div>

      <div style={{ width: "100%" }} onClick={setError}>
      <p style={{    fontSize: "14px",
    marginRight: "20px"}}>انتخاب محله </p>
        <FormControl style={{ width: "100%" }} className={classes.formControl}>
          {/* <InputLabel id="demo-simple-select-helper-label3">محله</InputLabel> */}
          <Select
            labelId="demo-simple-select-helper-label3"
            id="demo-simple-select-helper3"
            value={getReginId}
            onChange={handleArea}
          >
            {
              area.map(item=>{
                return <MenuItem value={item} key={item.id}>{item.name}</MenuItem>
              })
            }
 
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default Selections;
