import './Giorno.css'

import {useNavigate, useParams} from "react-router-dom";
import Sala from "./Sala";
import {
    Button,
    Col,
    Container,
    FormSelect,
    Nav,
    Navbar,
    Pagination,
    Row
} from "react-bootstrap";
import PopUp from "./PopUp";
import Info from "./Info";
import {useContext, useState} from "react";
import {MyContext} from "../App";

export default function Giorno(){

    let contesto = useContext(MyContext)
    let param = useParams()
    const navigate = useNavigate()
    const day = new Date(param.day)
    const next = new Date(day)
    next.setDate(day.getDate()+1)
    const prev = new Date(day)
    prev.setDate(day.getDate()-1)

    let n = []
    for(let i=0;i<48;i++){
        day.setHours(i/2)
        if(i%2)day.setMinutes(30)
        else day.setMinutes(0)
        let d = day.toLocaleTimeString().slice(0,5)
        n[i]= {pad: i*10,time: d,date: new Date(day)}
    }

    const handleClick = (e) => {
      switch (e.target.text){
          case '»Last':
              day.setMonth(day.getMonth()+1)
              navigate(`/${day}`)
              break;
          case '«First':
              day.setMonth(day.getMonth()-1)
              navigate(`/${day}`)
              break;
          case '›Next':
              navigate(`/${next}`)
              break;
          case '‹Previous':
              navigate(`/${prev}`)
              break;
          default:
              let giorno = e.target.text.split('/')
              giorno = new Date(giorno[2],parseInt(giorno[1])-1,giorno[0])
              navigate(`/${giorno}`)
              break;
      }
    }

    const mdPageManager={
        active: 'd-md-block',
        hidden: 'd-md-none d-lg-block'
    }

    const [mdPage,setMdPage] = useState({1: mdPageManager.active,2: mdPageManager.hidden})

    const smPageManager={
        active: '',
        hidden: 'd-none'
    }

    const [smPage,setSmPage] = useState([smPageManager.active,smPageManager.hidden,smPageManager.hidden,smPageManager.hidden,smPageManager.hidden])

    return(
        <div>
            <Container fluid className='p-0 cont'>
                <Navbar bg="light" expand="lg" className='mb-3 mt-0 shadow-lg'>
                    <Container>
                        <Navbar.Brand href="/">
                            <img src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMTI3Ljk4IDIwMTYuODciIGZpbGw9IiM0MWUwZmQiPgogIDxwYXRoICBkPSJNODg4IDExMTkuMTdjMTYtMzIuNjIgMzIuODQtNjUuMzcgNTAuMTctOTcuMzVsLjE1LS4yNyAxOC4zOS0zNS42OCAyNy4xNi00NSAuMTctLjI5YzEwLjE0LTE3LjI2IDIwLjY2LTM0LjY4IDMxLjI3LTUxLjc4bDE4LjY5LTMwLjg3YzI0Ljg4LTQxLjE5IDQ0Ljg4LTcxLjIzIDc2LjQzLTExNC43NiAxNy0yMy40MyAzMy4xMi00NCA1OC42Ni03NS45MmwuMDYtLjA2IDEuMjYtMS41OS40OS0uNjNjMTAuMzctMTMuMjIgMjAuODQtMjYuMjUgMzEuMTEtMzguNzNsLjM0LS40Mi4yLS4yNWMyMy44My0yOS41MSA0OC4xMi01OS4xMyA3Mi4xOS04OGw5LjU3LTExLjQ4VjM1Ni41NEgxMjY3Yy05LjIzLTguNjgtMTguNjYtMTcuMy0yOC4wOC0yNS42OS03Ni4zMi02Ny43Mi0xNTIuNDMtMTIwLjg1LTIyNi4yNy0xNTcuNzktNzUuNzEtMzcuOTItMTQ1LjYzLTU3LjE0LTIwNy44LTU3LjE0LTQ0LjM5IDAtODQuMDYgOS45NC0xMTcuOTEgMjkuNTMtMzIuNTUgMTguODQtNTkuOSA0Ni45MS04MS4zMSA4My40NC0yMC4wNiAzNC4yMy0zNC44NCA3NS44OS00My45NSAxMjMuODEtMTcuNTQgOTIuMzctMTMuNzQgMjA4IDExIDMzNC4zNCAzLjEyIDE1LjkgNi41NiAzMiAxMC4yNSA0OC0xOS43NCA2LTM4LjkxIDEyLjE4LTU3LjEzIDE4LjUzLTExOS4yNiA0MS41OC0yMTkgOTUuOTEtMjg4LjQyIDE1Ny4xNC0zNiAzMS43MS02My44NCA2NS4yMy04Mi44OSA5OS42Mi0yMC4yNCAzNi41Ny0zMC41MSA3NC4wOC0zMC41MSAxMTEuNDkgMCA3NSA0MS41NSAxNTEgMTIwLjE1IDIxOS45NCA3NCA2NC45MyAxNzguNjUgMTIxLjYyIDMwMi41NSAxNjQgMTEuNTEgMy45MSAyMy4yMiA3LjcxIDM1IDExLjM0LTQuMTIgMTcuOTMtNy45MyAzNi0xMS4zNiA1NC0yMy41NiAxMjQuMDgtMjYuMzEgMjM3LjYyLTggMzI4LjM1IDkuNTEgNDcgMjQuNjEgODcuODkgNDQuODkgMTIxLjU3IDIxLjU2IDM1LjggNDguOTMgNjMuNDQgODEuMzQgODIuMTMgMzQuMTUgMTkuNjkgNzQuMzQgMjkuNjcgMTE5LjQ1IDI5LjY3IDYxLjQyIDAgMTMwLjA5LTE4LjIxIDIwNC4xMS01NC4xMyA3Mi41Ni0zNS4yMSAxNDYuNjMtODUuNjQgMjIwLjEzLTE0OS44OSAxMS4zMy05LjkgMjMtMjAuNDkgMzQuNjYtMzEuNTNoMTcuNDF2LTE3NC4zOWwtNi4zNC03LjgtMy0zLjY3LTc5LjgyLTk4LjU1LTQ0LjM1LTU0Ljc1Yy0yMi4zOS0yNy42NC01OC4yNS03OC43OS0xMDEtMTQ0LTM0LTUxLjg0LTU4Ljc2LTkzLjQ3LTcwLjUtMTEzLjYzbC0xLjI4LTIuMjFjLTIwLjQ5LTM1LjMzLTM1LjcxLTYzLjc5LTQ3LjkzLTg2LjY0LTE1LjMtMjguNjMtMzAuMzktNTcuODctNDQuOTEtODdsMi42Ni01LjE3em0tODAuODYtMTcyLjg5Yy0xMy41My0zNC43LTI1LjkyLTY5LjEzLTM3LTEwMi44MSAzNC41Ny03LjEzIDcwLjUxLTEzLjUzIDEwNy4zMi0xOS4xMS0xMi4yOCAyMC4xMS0yNC4zNCA0MC40MS0zNiA2MC42NHMtMjMuMTIgNDAuNjktMzQuMzIgNjEuMjh6bS0zOC4yNSA0NjIuMWMxMS40NS0zNC44NiAyNC4zMS03MC41NiAzOC4zOS0xMDYuNTkgMTEuMjkgMjAuNyAyMi44NyA0MS4zIDM0LjU4IDYxLjUzIDEyLjI3IDIxLjE5IDI1IDQyLjQ4IDM3Ljk1IDYzLjU4LTM4LjQ2LTUuMzItNzUuNjItMTEuNTMtMTEwLjkyLTE4LjUxek03MDcuMTggMzk3LjE2YzktNjEuNzQgMjkuMTQtMTA1Ljg3IDU1LjM3LTEyMS4wNiAxMC44OS02LjMxIDI1LjM0LTkuNSA0Mi45My05LjUgMzguNDcgMCA4OC4yNCAxNS4xIDE0My45MSA0My42NyA2MC4zNCAzMSAxMjUuNzcgNzcuMTEgMTg5LjIyIDEzMy40NXE1LjkgNS4yNCAxMi4wNyAxMC44OWMtNTUuODEgNjEuNzEtMTEwLjgxIDEzMC4yOC0xNjMuNjggMjA0LjEtOTAuMDggOC44LTE3Ni42OCAyMS45NC0yNTcuNzYgMzkuMTEtMi45My0xMi44NC01LjY4LTI1Ljc1LTguMi0zOC41bC0uMjQtMS4zMmMtMTkuMzMtOTguNzYtMjQuMDQtMTg5LTEzLjYyLTI2MC44NHptMTEuMzEgNzI3Yy0zOC4xIDg0LTcwLjQ4IDE2Ny4xNi05Ni4zNyAyNDcuNDYtOS0yLjgtMTcuODktNS43Mi0yNi42NS04LjctMTAzLTM1LjIxLTE4OC43OS04MC42Ni0yNDguMDgtMTMxLjQzLTQ1LjM3LTM4Ljg1LTcyLjQ1LTc5LjgzLTcyLjQ1LTEwOS42MyAwLTMwLjU5IDI3LjA5LTcwIDc0LjM0LTEwOC4yIDU1LTQ0LjQ3IDEzMy4yNy04NS4xMSAyMjYuMTktMTE3LjUgMTUuNzktNS40OCAzMS44Ny0xMC43MyA0OC0xNS42NCAyNS41MyA3OS4xMyA1Ny40OCAxNjAuOTkgOTUuMDEgMjQzLjYzem0uMTIgNDc0LjkyYzIuODYtMTUgNi0zMC4wOSA5LjQzLTQ1LjA5IDgwIDE2LjM3IDE2Ny41OSAyOC43MSAyNjAuNzUgMzYuNzEgNTMuMzggNzQuMzQgMTA4Ljg0IDE0My4zNyAxNjUuMDUgMjA1LjQ0LTYuOTQgNi4zOS0xMy45NCAxMi42OC0yMC45IDE4Ljc5LTgxLjM3IDcxLjEzLTE2My4wOSAxMjIuNTUtMjM2LjI4IDE0OC43MWwtMS41Mi41NGMtMzIuOCAxMS41OC02Mi4wOSAxNy40NS04NyAxNy40NS0xOC4zOCAwLTMzLjIyLTMuMTgtNDQuMTEtOS40Ni0yNi41MS0xNS4yOS00Ny4xNC01OC40Ni01Ni42LTExOC40NS0xMS4wNi02OS45MS03LjE5LTE1Ny45NyAxMS4xNy0yNTQuNjV6IgogICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMy45OCAtMTE1LjkyKSIgaWQ9Il9Hcm91cF8iIGRhdGEtbmFtZT0iJmx0O0dyb3VwJmd0OyIgLz4KICA8cGF0aCBkPSJNMjE5NS4wNyAxMjA1LjFxLTU2LjI2LTEwMy40NS0xNjUuNTQtMTM0LjIzYTIuODUgMi44NSAwIDAgMS0xLjc5LTIuODUgMyAzIDAgMCAxIDEuMzctMi42OGM1NC4yNC0zMC4xNiA5NS45My03My4xMSAxMjUuMTUtMTI3LjlxNDQuMTUtODIuODkgNDQuMTYtMTk5LjQ5YzAtMTI4LjI1LTMyLjQ1LTIyMy42NS05Ny4wNi0yODcuMTFzLTE1MC42Mi05NS0yNTcuNy05NWgtNTc4LjM1Yy0xLjI1IDAtMi4yNyAxLjMxLTIuMjcgMi45M1YxODk0LjNjMCAxLjYyIDEgMi45MyAyLjI3IDIuOTNoNTQ2LjU3cTExNS40MiAwIDE5OS4xMS0zMy42OWM1NS45MS0yMi40MiAxMDEuNC01Mi42OCAxMzcuMjEtOTAuNjhzNjEuOTItODMuMzMgNzguNjYtMTM2YzE2Ljc0LTUyLjIzIDI1LjEtMTA4LjggMjUuMS0xNjkuMjQuMDQtMTA1LjM3LTE5LjA4LTE5Mi41Ny01Ni44OS0yNjIuNTJ6bS03MjIuMzItNjI4YzAtMS42MiAxLTIuOTMgMi4yNy0yLjkzaDMzOS40NmM1Ni45NSAwIDEwMC41MSAxNiAxMzAuNjUgNDcuNTVzNDUuMiA4Ni40IDQ1LjIgMTY0LjE4YzAgNjkuMTgtMTYuNzQgMTIxLjkyLTUwLjI1IDE1OS4wOHMtNzUuMzcgNTUuMzItMTI1LjYzIDU1LjMySDE0NzVjLTEuMjUgMC0yLjI3LTEuMzEtMi4yNy0yLjkzem01MTguMTYgMTAzNS44Yy0zNC44NiA0Mi43Ni04NC40MSA2NC0xNDguMDcgNjRIMTQ3NWMtMS4yNSAwLTIuMjctMS4zMS0yLjI3LTIuOTN2LTQ3Ni40YzAtMS42MiAxLTIuOTMgMi4yNy0yLjkzaDM2Ny44MmM2My42NiAwIDExMi41NyAxOS44OSAxNDguMDcgNjEuMzVzNTIuOTMgOTkuODIgNTIuOTMgMTc2LjNjLjAyIDc3Ljc3LTE3Ljc2IDEzOC4yNy01Mi45MSAxODAuNjF6IgogICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEyMy45OCAtMTE1LjkyKSIgLz48L3N2Zz4K" alt="react-bootstrap" height="50"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Row className='m-0 p-0'>
                    <Pagination className='justify-content-center mt-0 mx-auto' size='lg'>
                        <Pagination.First className='d-none d-sm-block' onClick={(e)=>handleClick(e)}/>
                        <Pagination.Prev onClick={(e)=>handleClick(e)}/>
                        <Pagination.Item className='d-none d-md-block' onClick={(e)=>handleClick(e)}>{prev.toLocaleDateString()}</Pagination.Item>

                        <Pagination.Item active><>{day.toLocaleDateString()}</></Pagination.Item>

                        <Pagination.Item className='d-none d-md-block' onClick={(e)=>handleClick(e)}>{next.toLocaleDateString()}</Pagination.Item>
                        <Pagination.Next onClick={(e)=>handleClick(e)}/>
                        <Pagination.Last className='d-none d-sm-block' onClick={(e)=>handleClick(e)}/>
                    </Pagination>
                </Row>
                <Row className='mx-3 mx-sm-4 mx-md-5 pt-2 border border-2 border-dark rounded-3 shadow-lg mb-1'>
                    <Row className='bg-light m-0 titoli position-static shadow'>
                        <Col className={`p-0 ${mdPage[1]}`}>
                            <h2 className='d-none d-md-block'>Sala 1</h2>
                            <FormSelect
                                className='d-md-none m-2'
                                size={"lg"}
                                onChange={(e)=>{
                                    let x =[smPageManager.hidden,smPageManager.hidden,smPageManager.hidden,smPageManager.hidden,smPageManager.hidden]
                                    x[e.target.value]=smPageManager.active
                                    setSmPage(x)
                                }}>
                                <option value={0}>Sala 1</option>
                                <option value={1}>Sala 2</option>
                                <option value={2}>Sala 3</option>
                                <option value={3}>Sala 4</option>
                                <option value={4}>Sala 5</option>
                            </FormSelect>
                        </Col>
                        <Col className={`p-0 d-none ${mdPage[1]}`}>
                            <h2>Sala 2</h2>
                        </Col>
                        <Col className={`p-0 d-none ${mdPage[1]}`}>
                            <h2 className='d-flex flex-nowrap justify-content-between'><div className='d-flex'/>Sala 3<div className='d-none d-lg-flex'/> <Button className='d-lg-none ms-1 me-0'  variant='dark' onClick={()=>{setMdPage({1: mdPageManager.hidden,2: mdPageManager.active})}}>›</Button></h2>
                        </Col>
                        <Col className={`p-0 d-none ${mdPage[2]}`}>
                            <h2 className='d-flex flex-nowrap justify-content-between'><Button className='d-lg-none me-5' variant='dark' onClick={()=>{setMdPage({2: mdPageManager.hidden,1: mdPageManager.active})}}>‹</Button><div className='d-none d-lg-flex'/>Sala 4<div className='d-flex'/></h2>
                        </Col>
                        <Col className={`p-0 d-none ${mdPage[2]}`}>
                            <h2>Sala 5</h2>
                        </Col>
                    </Row>
                    <Row className='overflow-auto orari m-0 d-flex flex-nowrap'>
                        <Col className={`p-0 ${smPage[0]} ${mdPage[1]}`}><Sala nomeS='Sala 1' Data={day} slot={n}/></Col>
                        <Col className={`p-0 ${smPage[1]} ${mdPage[1]}`}><Sala nomeS='Sala 2' Data={day} slot={n}/></Col>
                        <Col className={`p-0 ${smPage[2]} ${mdPage[1]}`}><Sala nomeS='Sala 3' Data={day} slot={n}/></Col>
                        <Col className={`p-0 ${smPage[3]} ${mdPage[2]}`}><Sala nomeS='Sala 4' Data={day} slot={n}/></Col>
                        <Col className={`p-0 ${smPage[4]} ${mdPage[2]}`}><Sala nomeS='Sala 5' Data={day} slot={n}/></Col>
                    </Row>
                </Row>
            </Container>
            <PopUp slot={n}/>
            <Info/>
            <footer className='fixed-bottom bg-light footer'>
                ©2022: Luca Potenza
            </footer>
        </div>
    )
}