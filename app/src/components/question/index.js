import React, { useEffect,useState } from 'react'
import './questionStyle.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

import { createFeddback } from '../../services'

export default function Index ({
    arrQuestens,
    arrAns,
    setAns
  }) {
      
      const navigate=useNavigate();
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [isNextButtonDisable,setButtonStatus] = useState(true)
      const [objAns,setAnsItem] = useState(arrAns[currentQuestionIndex - 1] || null);
      const handleAnsInput = (objCurrentAns) =>{
        setAnsItem(objCurrentAns);
        setButtonStatus(false)
      }
      useEffect(()=>{
        console.log(arrAns,"currentQuestionIndex",currentQuestionIndex);
      })
  const handleNextQuestionClick = (objAns) => {
    if(currentQuestionIndex>=(arrQuestens.length)-1){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit !'
    }).then((result) => {
      if (result.isConfirmed) {
        createFeddback({arrList:[...arrAns,objAns]}).then((res)=>{
          setAns([])
          Swal.fire(
            'submitted!',
            'Your response has been recorded.',
            'success'
          )
          navigate('/')
        })
      }
    })
      }
      else{
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnsItem(null)
        setButtonStatus(true)
      }
      setAns([...arrAns,objAns])
  };

  const handleBackQuestionClick = () => {
      setAnsItem(arrAns[currentQuestionIndex - 1])
      setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

   const currentQuestion = arrQuestens[currentQuestionIndex]
    return (
    <div className='question-card'>
        <aside className='question-page-count'>{currentQuestionIndex+1}/{arrQuestens.length}</aside>
        <h2 className='question-head'>{currentQuestion.strQuesten}</h2>
      <ul className='question-options'>
        {(currentQuestion.type=="Rating" &&  Array.from({ length: Number(currentQuestion.intRateLimit) }, (_, index) => {
                     return (
                      <li className='list' key={index+1}>
                        <label>
                          <input
                            type="radio"
                            name="answer"
                            value={index+1}
                            checked={(objAns && (objAns.rating == (index+1)))}
                            onChange={() =>{
                              handleAnsInput({
                                q_id:currentQuestion._id,
                                rating:index+1,
                                intSlNo:currentQuestion.intSlNo
                              })
                              }}
                          />
                          <span className='rb-txt'>{index+1}</span>
                        </label>
                      </li>);
                }))}
        {
          (currentQuestion.type=="Text" && (<>
         <TextField
          id="outlined-multiline-static"
          label="feedback"
          multiline
          onChange={(e)=> handleAnsInput({
            q_id:currentQuestion._id,
            text:e.target.value,
            intSlNo:currentQuestion.intSlNo
          })}
          InputProps={{ style: { width: 300 } }}
          rows={3}
          defaultValue={(objAns && objAns.text || '')}
        />
          </>))
        }
      </ul>
      <div className='btn-grp'>
        <Button variant="outlined"  onClick={()=>{
          handleBackQuestionClick()
        }} size='small' disabled={!currentQuestionIndex} startIcon={<ArrowBackIosIcon />}>
                Previuos
        </Button>
        <Button variant="contained" disabled={isNextButtonDisable} onClick={()=>
          {
          handleNextQuestionClick(objAns)
          }} endIcon={<SendIcon />}>
                Next
        </Button>
      </div>
    </div>
  )
}
