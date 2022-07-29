import {Button, CloseButton, Col, Form, FormControl, InputGroup, Modal, Row} from "react-bootstrap";
import {useContext, useState} from "react";
import {MyContext} from '../App';

export default function PopUp({slot}){
    const contesto = useContext(MyContext)
    const [overlap,setOverlap] = useState(false)
    const [open,setOpen] = [contesto.insert,contesto.setInsert]
    const [pren,setPren] = [contesto.click,contesto.setClick]
    const [val,setVal] = useState(false)

    if(new Date(pren.oraI)<new Date()){
        return (
            <Modal show={open} onHide={()=>setOpen(false)}>
                <Modal.Header>
                    <Modal.Title>Errore</Modal.Title>
                    <CloseButton onClick={()=>setOpen(false)}/>
                </Modal.Header>
                <Modal.Body>
                    Non si può prenotare nel passato
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setOpen(false)}>OK</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    let n = slot
    let freeSlotsI = n.filter((x)=>{
        let flag = true
        contesto.prenotazioni.filter((p)=>p.sala===pren.sala).forEach((p)=>{
            if(x.date>=new Date(p.oraI)&&x.date<new Date(p.oraF)) flag = false
        })
        return flag
    })
    let freeSlotsF = n.filter((x)=>{
        let flag = true
        contesto.prenotazioni.filter((p)=>p.sala===pren.sala).forEach((p)=>{
            if(x.date>new Date(p.oraI)&&x.date<=new Date(p.oraF)) flag = false
        })
        return flag
    })
    
    const overlapControl = (oraI,oraF,e) => {
        let flag = false
        n.filter((x)=>{
            return (x.date>new Date(oraI)&&x.date<=new Date(oraF))
        }).forEach((x,i)=>{
            if(!freeSlotsF.includes(x)) {
                flag = true
            }
        })
        setOverlap(flag)
        if(flag){
            e.target.setCustomValidity('sovrapposizione')
        }
        else{
            e.target.setCustomValidity('')
        }
    }

    const handleChange = (e) => {
        setPren({...pren,[e.target.id]: e.target.value})
        if(e.target.id==='oraI') {
            let index = -1
            n.forEach((x,i)=>{
                if(x.date==e.target.value)index=i+1
            })
            let oraf = new Date(n[index].date)
            setPren({...pren,oraI: e.target.value,oraF: oraf})
        }
        if(e.target.id==='oraF'){
            overlapControl(pren.oraI,e.target.value,e)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setVal(true)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            contesto.handleNewPren(pren)
            setVal(false)
            setOpen(false)
        }
    };

    const handleClose = () => {
        setVal(false)
        setOpen(false)
        setOverlap(false)
    }

    return(
        <Modal show={open} onHide={()=>handleClose()}>
            <Modal.Header>
                <Modal.Title>Prenotazione {contesto.click.sala}</Modal.Title>
                <CloseButton onClick={()=>handleClose()}/>
            </Modal.Header>
            <Modal.Body>
                <Form id='f' noValidate validated={val} onSubmit={(e)=>handleSubmit(e)} >
                    <Form.Group controlId='bho'>
                        <Form.Select className='mb-2' id='oraI' defaultValue={pren.oraI} onChange={(e)=> {handleChange(e)}}>
                            {freeSlotsI.map((x,i)=>{
                                return (<option key={i} value={x.date}>{x.time}</option>)
                            })}
                        </Form.Select>
                        <FormControl.Feedback type='invalid'>non si può prenotare nel passato</FormControl.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Select className='mb-2' value={pren.oraF} id='oraF' onChange={(e)=>handleChange(e)}>
                            {freeSlotsF.map((x,i,N)=>{
                                if(x.date>new Date(pren.oraI))return(<option key={i} value={x.date}>{x.time}</option>)
                                else return 0
                            })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">L'orario si sovrappone ad un altra prenotazione</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="name" id='name' className="mb-2" required onChange={(e)=>handleChange(e)}/>
                        <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="surname" id='surname' className="mb-2" required onChange={(e)=>handleChange(e)}/>
                        <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="scopo riunione" id='scopo' className="mb-2" required onChange={(e)=>handleChange(e)}/>
                        <Form.Control.Feedback type="invalid">Campo obbligatorio</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button form='f' type='submit'>
                    Fine
                </Button>
            </Modal.Footer>
        </Modal>
    )
}