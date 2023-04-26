import React, { useState, useEffect } from "react";
import Question from '../components/question/index'
import '../globalStyles.css'
import { getQuestens} from '../services'


function App() {
  const [arrQuestens,setQuestens] = useState([])
  const [arrAns,setAns] = useState([])
  useEffect(()=>{
    getQuestens().then(({arrList})=>{
      setQuestens(arrList)
    })
  },[])

   
  return (
    <div className="main">
      {(arrQuestens.length && <Question 
        arrQuestens = {arrQuestens}
        arrAns={arrAns}
        setAns={setAns}
        />)}
    </div>
  );
}

export default App;
