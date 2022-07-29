import './App.css';
import 'react-calendar/dist/Calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Giorno from "./Component/Giorno";
import Calendario from "./Component/Calendario";
import {Route, Routes} from "react-router-dom";
import {createContext, useState} from "react";

function App() {
    const [insert,setInsert] = useState(false)
    const [info,setInfo] = useState({show: false,pren: {scopo: ''}})
    const [click,setClick] = useState({sala: '',ora: 0})
    const [prenotazioni,setPrenotazioni] = useState([{
        oraI: new Date(2022,1,14,8,30).toString(),
        oraF: new Date(2022,1,14,10,30).toString(),
        sala:"Sala 1",
        name:"Luca",
        surname:"Potenza",
        scopo:"Riunione"},
        {oraI:new Date(2022,1,14,8,0).toString(),
            oraF:new Date(2022,1,14,8,30).toString(),
            sala:"Sala 1",
            scopo:"Pulizie"},
        {oraI:new Date(2022,1,14,10,30).toString(),
            oraF:new Date(2022,1,14,11,0).toString(),
            sala:"Sala 1",
            scopo:"Pulizie"}])

    const handleNewPren = (pren) => {
        let pulizie = [new Date(),new Date()]
        let ora = new Date(pren.oraI)
        ora.setMinutes(ora.getMinutes()-30)
        pulizie[0] = {
            oraI: ora.toString(),
            oraF: pren.oraI,
            sala: pren.sala,
            scopo: "Pulizie" }
        ora = new Date(pren.oraF)
        ora.setMinutes(ora.getMinutes()+30)
        pulizie[1] = {
            oraI: pren.oraF,
            oraF: ora.toString(),
            sala: pren.sala,
            scopo: "Pulizie" }
        if(prenotazioni.includes(pulizie[0]))setPrenotazioni([...prenotazioni,pren,pulizie[1]])
        if(prenotazioni.includes(pulizie[1]))setPrenotazioni([...prenotazioni,pren,pulizie[0]])
        if(prenotazioni.includes(pulizie[0]) && prenotazioni.includes(pulizie[1]))setPrenotazioni([...prenotazioni,pren])
        setPrenotazioni([...prenotazioni,pren,pulizie[0],pulizie[1]])
    }

  return (
    <div className="App bg-light">
        <MyContext.Provider value={{insert, setInsert, info, setInfo, click, setClick, prenotazioni, handleNewPren}}>
            <Routes>
                <Route path="/Calendario" element={<Calendario />} />
                <Route path="/:day" element={<Giorno/>} />
            </Routes>
        </MyContext.Provider>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="true"></script>
    </div>
  );
}

export const MyContext = createContext();

export default App;
