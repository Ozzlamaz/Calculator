import { useState } from 'react'
import './App.css'
import buttonMap from './data'

const endsWithNumber = /\d$/;
const endsWithZero = /0$/;
const checkZero = /(?<=[1-9])0+$/;
const checkDecimal = /(?<=[\d]+)(\.)\d+$/;
const checkminus = /([-]$)/;

function App() {
  
  const [result, setResult] = useState('0'); 
  const [evalResult, setEvalResult] = useState('0');

  const updateDisplay = (sign) => {
    
    if(sign == 'C') {
      console.log(sign);
      setResult('0');
      setEvalResult('0');
      document.querySelector('.result').classList.remove('hide');
      document.querySelector('.evalresult').classList.add('hide');
      return;
    }

    if (result == '0' && !endsWithNumber.test(sign) && evalResult == '0') {
      console.log(sign);
      return;
    }

    if (checkDecimal.test(result) && sign == '.') {
      console.log(sign);
      return;
    }

    if (endsWithZero.test(result) && !checkZero.test(result) && sign != '.' && evalResult == '0') {
        console.log(sign);
        let newResult = result.slice(0, result.length - 1) + sign;
        setResult(newResult);
        return;
    }

    if (!endsWithNumber.test(result) && !endsWithNumber.test(sign)) {
      
      if(evalResult != '0') {
        console.log(sign);
        setResult(evalResult);
        setEvalResult('0');
        document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      }
      if(sign != '-') {
        console.log(sign);
        let newResult = result.replace(/[\D]+$/, sign);
        setResult(newResult);
        return;
      }
      if (checkminus.test(result)) {
        console.log(sign);
        return;
      }
    }

    if(sign == '=') {
      document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      setEvalResult(eval(result));
      setResult('');
      return evalResult;
    }
    if(evalResult != '0') {;
      console.log(sign);
      setResult(evalResult + sign);
      setEvalResult('0');
      document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      return;
    }
    console.log(sign);
    setResult(result + sign)
  }

  return (
    <div className='numpad'>
      <div id='display'><span className='evalresult results hide'>{evalResult}</span><span className='result results'>{result}</span></div>
      <h1 id='title'>Calculator</h1>
      <h6 id='author'>by Ahmad Osman</h6>
      {buttonMap.map(button => {
        const {sign, id, elementID} = button;
        return (
          <button onClick={() => {updateDisplay(sign)}} key={id} className='button' id={elementID} type="button">{sign}</button>
        )
      })}
    </div>
  )
}

export default App
