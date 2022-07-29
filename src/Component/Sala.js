import './Sala.css'
import {useContext, useState} from "react";
import {MyContext} from '../App';

export default function Sala({nomeS,slot}){
    let contesto = useContext(MyContext)
    let n = slot
    let skip = 0
    const h = 8

    const handleClick = (i) => {
        let oraf = new Date(i)
        oraf.setMinutes(oraf.getMinutes()+30)
        contesto.setClick({oraI: i.toString(),oraF: oraf.toString(),sala: nomeS})
        contesto.setInsert(true)
    }

    return(
        <div className='Sala m-0'>
            <svg viewBox={`0 0 50 ${h*48}`}>
                {
                    n.map((x,i,N)=>{
                        if(skip>0){
                            skip--
                            return (
                                <g key={i}>
                                    <text x="0" y={h*i+1.5} fontSize='3'>{x.time}</text>
                                    <line x1='8' x2='100' y1={h*i+1} y2={h*i+1} stroke='black' strokeWidth='0.05'/>
                                </g>
                            )
                        }
                        else {
                            let isPren=contesto.prenotazioni.filter((p)=>{
                                return((p.oraI==x.date)&&(p.sala===nomeS))
                            })
                            if (isPren.length===0){
                                return(
                                    <g key={i}>
                                        <text x="0" y={i*h+2} fontSize='3'>{x.time}</text>
                                        <rect x='10' y={i*h+2} height={h-2} width='38' fill='rgba(0,0,0,0.1)' stroke='transparent'  onClick={()=> {handleClick(x.date)}}/>
                                        <line x1='8' x2='100' y1={i*h+1} y2={i*h+1} stroke='black' strokeWidth='0.05'/>
                                    </g>
                                )
                            }
                            else{
                                let height=h-2

                                N.forEach((X,I)=>{
                                    if(X.date==isPren[0].oraF) {
                                        height += h * (I - i - 1)
                                        skip = I - i - 1
                                    }
                                })

                                const col = (isPren[0].scopo==='Pulizie')?'red':'blue'

                                return (
                                    <g key={i}>
                                        <text x="0" y={i*h+1.5} fontSize='3'>{x.time}</text>
                                        <rect x='10' y={i*h+2} height={height} width='38' fill={col} stroke='transparent' rx={1} onClick={()=>{contesto.setInfo({show: true,pren: isPren[0]})}}/>
                                        <text x="11" y={(i+1)*h-1.5} fontSize='5' fill='white' onClick={()=>{contesto.setInfo({show: true,pren: isPren[0]})}}>{isPren[0].scopo}</text>
                                        <line x1='8' x2='100' y1={i*h+1} y2={i*h+1} stroke='black' strokeWidth='0.05'/>
                                    </g>
                                )
                            }
                        }
                    })
                }
            </svg>
        </div>
    )
}