import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// first page which show when application loads
import MainPage from './Pages/MainPage'

// admin pages: database, create account, login
import AdminPortal from './Pages/admin/AdminPortal'


// doctor pages: dashboard, allpatient, assigned assistant, add new patient, remove healthy patient
import Dashboard from './Pages/dashboard/Dashboard'
import AllPatient from './Pages/dashboard/AllPatient'
import AssignedAssistant from './Pages/dashboard/Assistant'
import AddPatient from './Pages/dashboard/addPatient'
import RemovePatient from './Pages/dashboard/removePatient'

//patient profile pages: overview, medications, reports, notes
import PatientProfile from './Pages/patientProfile/PatientProfile' //patient portal
import PatientMedication from './Pages/patientProfile/patientMedication'
import PatientReport from './Pages/patientProfile/patientReport'
import PatientNotes from './Pages/patientProfile/patientNotes'

// home pages: home, medication, report, update, recommendations
import HomePage from './Pages/home/homePage'
import HomeMedication from './Pages/home/homeMedication'
import HomeRecommendations from './Pages/home/homeRecommendation'
import HomeUpdate from './Pages/home/homeUpdate'

//importing all the components


//importing all the form
import Account from './Form/Account'
import LoginUser from './Form/loginUser'
import DoctorInfo from './Form/doctorInfo'
import PatientInfo from './Form/patientInfo'
import CreateAccount from './Form/CreateAccount' //import page for creating doctor account

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginUser />}></Route>
          <Route path="/admin/portal" element={<AdminPortal />}></Route>
          <Route path="/admin/create/account" element={<Account />}></Route>   {/* creating account with different user domain */}

          {/*declaring the route for dashboard pages */}
          <Route path="/dashboard" element={< Dashboard/>}></Route>
          <Route path="/dashboard/allpatient" element={<AllPatient />}> </Route>
          <Route path="/dashboard/assistant" element={<AssignedAssistant />}> </Route>
          <Route path="/dashboard/add/patient" element={< AddPatient/>}> </Route>
          <Route path="/dashboard/remove/patient" element={<RemovePatient />}> </Route>


          {/* patient profile pages */}
          <Route path="/patientprofile/:PatientID" element={<PatientProfile />}> </Route>
          <Route path="/patientprofile/medication/:PatientID" element={<PatientMedication/>}> </Route>
          <Route path="/patientprofile/reports/:PatientID" element={<PatientReport/>}> </Route>
          <Route path="/patientprofile/notes/:PatientID" element={<PatientNotes/>}> </Route>
          {/* <Route path='/patientprofile/viewnotes/:PatientID' element={<DisplayNotesWithDate />}></Route> */}

          {/* home pages */}
          <Route path='/home' element={<HomePage />}></Route>
          <Route path='/home/medication' element={<HomeMedication />}></Route>
          <Route path='/home/recommendation' element={<HomeRecommendations />}></Route>
          <Route path='/home/update' element={<HomeUpdate />}></Route>
          

  
          <Route path="/account" element={<Account />}></Route>
          <Route path="/loginpage" element={<LoginUser />}></Route>          
          <Route path='/doctor/personal/information' element={<DoctorInfo />}></Route>
          <Route path='/patient/personal/information' element={<PatientInfo />}></Route>

          <Route path='*' element={<>Invalid url</>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
