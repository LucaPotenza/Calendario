import {Button, CloseButton, Modal} from "react-bootstrap";
import {useContext} from "react";
import {MyContext} from "../App";

export default function Info(){
    const contesto = useContext(MyContext)
    let oraI = new Date(contesto.info.pren.oraI);
    let oraF = new Date(contesto.info.pren.oraF);
    let hide = ''
    if(contesto.info.pren.scopo==='Pulizie'){
        hide = 'd-none'
    }
    let sala = contesto.info.pren.sala
    if(sala !== undefined){
        sala = sala.slice(5,6)
    }

    return(
        <Modal show={contesto.info.show} onHide={()=>contesto.setInfo({...contesto.info,show: false})}>
            <Modal.Header>
                <Modal.Title>Scopo : {contesto.info.pren.scopo}</Modal.Title>
                <CloseButton onClick={()=>contesto.setInfo({...contesto.info,show: false})}/>
            </Modal.Header>
            <Modal.Body>
                <div className={hide}>Nome: {contesto.info.pren.name}</div>
                <div className={hide}>Cognome: {contesto.info.pren.surname}</div>
                <div>Sala: {sala}</div>
                <div>Ora Inizio: {oraI.toLocaleTimeString().slice(0,5)}</div>
                <div>Ora Fine: {oraF.toLocaleTimeString().slice(0,5)}</div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>contesto.setInfo({...contesto.info,show: false})}>OK</Button>
            </Modal.Footer>
        </Modal>
    )
}