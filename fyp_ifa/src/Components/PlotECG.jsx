import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";
import { usefirebase } from "../context/firebase";
import { Timestamp } from 'firebase/firestore';
import { useParams, useNavigate } from "react-router-dom";


import { getDatabase, ref, set, push, child, serverTimestamp } from "firebase/database";



const Cardiogram = (props) => {
  console.log("Props receive by cardiogram component", props)
  const navigate = useNavigate();
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }
  const firebase = usefirebase();
  const database = getDatabase();

  const params = useParams();

  const [data, updateData] = useState([]);
  const [fetchingData, setFetching] = useState(false)
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isSounding, setIsSounding] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false)
  const [alarm, setAlarm] = useState(false)
  const [electrodeVal, setelectrodeVal] = useState(false)

  // let electrodeMessage
  // if (electrodeVal) {
  //   // electrode connected
  //   electrodeMessage = <p className="d-inline text-success"> Connected! </p>
  // } else if (electrodeVal === false) {
  //   electrodeMessage = <p className="d-inline text-danger"> Disconnected </p>
  // } else {
  //   electrodeMessage = <p>abc</p>
  // }



  useEffect(() => {
    const context = new AudioContext();  // Creating an audio context object 'context' which handle audio processing in the browser
    const oscillator = context.createOscillator();  // Creating an instance to generate periodic waveform
    const gainNode = context.createGain();  // control the volume of the sound
    oscillator.connect(gainNode); // connect oscillator to gain node
    gainNode.connect(context.destination);  // connect gainNode to audiocontext destination
    oscillator.type = 'triangle';     // set the waveform type to triangle
    oscillator.frequency.setValueAtTime(440, context.currentTime);   // set the frequency of the oscillator to 440Hz
    gainNode.gain.setValueAtTime(0, context.currentTime); // set initial volume to 0
    oscillator.start(0);
    setAudioContext(context);
    setOscillator(oscillator);
    setGainNode(gainNode);

    return () => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
      context.close();
    };
  }, []);

  let checkarray = []

  // function updateElectrodeStatusToActive() {
  //   setelectrodeVal(true)
  // }

  // function updateElectrodeStatusToDisable() {
  //   setelectrodeVal(false)
  // }

  useEffect(() => {

    axios.get(props.method, {
      headers: {
        'Authorization': props.deviceToken
      }
    }).then(response => {
      console.log(response.data)
      setDeviceStatus(true) // show the device is activated/connected

      let array = [...data, response.data];
      checkarray = [...data, response.data];
      updateData(data => [...data, response.data])

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)
        let checkHeart = checkarray.filter(e => e > 400 && e < 800)
        setelectrodeVal(true)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Abnormality Detect")
          setAlarm(true)
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // set volume to 0.5
          setIsSounding(true)

        } else {
          checkHeart = []
          gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
          setIsSounding(false);
          setAlarm(false)
        }
      }


      // if (checkarray.length > 0) {
      //   let duplicateVal = checkarray.filter(e => e < 300 || e > 1000)
      //   console.log(duplicateVal)

      //   // let dynamicCondition = null
      //   // let dynamicCondition = duplicateVal.every(val => val < 300 || val > 1000)  //store the boolean value - true or false

      //   // if dynamic condition return true that mean electrode is discconnected, else false that mean electrodes are connected 

      //   let dynamicCondition = duplicateVal.length === checkarray.length
      //   // console.log("boolean", dynamicCondition)


      //   if (dynamicCondition) {
      //     setelectrodeVal(false)
      //   } else {
      //     setelectrodeVal(true)
      //   }

      //   if (duplicateVal.length > 0) {
      //     setelectrodeVal(false)
      //     duplicateVal = []
      //   } else {
      //     setelectrodeVal(true)
      //   }
      // }

      if (response.data < 300 || response.data > 1000) {
        setelectrodeVal(false)
      } else {
        setelectrodeVal(true)
      }





      if (data.length > 15) {
        array.shift()
        let newArray = data.shift()
        console.log(newArray)
      }
    }).catch(err => {
      console.log(err)
      setDeviceStatus(false)
    })

  }, [data])



  const stopAlarm = () => {
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
    setIsSounding(false);
  };

  const putDatanew = () => {
    firebase.putdatafire(params.PatientID, data);
  };

  console.log("Passing the data as", data)

  return (
    <>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-md-6">
            <p className="px-3 mb-0 fw-bold">Patient Name: {props.fullname}</p>

            <p className="px-3 mt-0 fw-bold d-inline">Device Status:
              {
                deviceStatus ?
                  <p className="d-inline text-success"> Connected </p>
                  : <p className="d-inline text-danger"> Not Connected </p>
              }
            </p>

            <p className="px-3 mt-0 mb-0 fw-bold d-block">Electrodes Status:
              {
                electrodeVal ?
                  (<p className="d-inline text-success"> Connected</p>)
                  :
                  (<p className="d-inline text-danger"> Not Connected </p>)
              }
            </p>

            <p className="px-3 pt-0 mt-0 fw-bold d-block">Patient Condition:
              {
                alarm ?
                  (
                    <p className="d-inline text-danger"> Abnormality Detect </p>
                  )

                  : (
                    <p className="d-inline text-success"> Normal </p>
                  )
              }
            </p>


          </div>





        </div>




        <div className="row">
          <div className="col-md-6">
            <ApexChart data={data} title="Patient ECG" />
            <div className="btn-group">
              <button className="btn text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
              <button className="btn text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
            </div>

          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 mx-auto">
            <button type="button" className="btn btn-success btn-width mb-2 d-block" onClick={(e) => navigate(`/patientprofile/${props.id}`)}>View Patient</button>
            {isSounding ? <button onClick={stopAlarm} className="btn btn-danger btn-width pt-0 mt-0">Stop Alarm</button> : null}
          </div>
        </div>
      </div>

    </>


  );
}

export default Cardiogram;