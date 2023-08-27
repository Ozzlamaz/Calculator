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
  const [history, setHistory] = useState('');

  const updateDisplay = (sign) => {
    
    if(sign == 'C') {
      setResult('0');
      setHistory('');
      // document.querySelector('.result').classList.remove('hide');
      // document.querySelector('.history').classList.add('hide');
      return;
    }

    if (result == '0' && !endsWithNumber.test(sign) && history == '0') {
      return;
    }

    if (checkDecimal.test(result) && sign == '.') {
      return;
    }

    if (endsWithZero.test(result) && !checkZero.test(result) && sign != '.' && history == '0') {
        let newResult = result.slice(0, result.length - 1) + sign;
        setResult(newResult);
        return;
    }

    if (!endsWithNumber.test(result) && !endsWithNumber.test(sign)) {
      
      if(history != '0') {
        setResult(history);
        setHistory('0');
        // document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      }
      if(sign != '-') {
        let newResult = result.replace(/[\D]+$/, sign);
        setResult(newResult);
        return;
      }
      if (checkminus.test(result)) {
        return;
      }
    }

    if(sign == '=') {
      // document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      setHistory(eval(result));
      setResult('');
      return history;
    }
    if(history != '0') {;
      // document.querySelectorAll('.results').forEach((span => span.classList.toggle('hide')));
      setResult(history + sign);
      setHistory('0');
      return;
    }
    setResult(result + sign)
  }

  return (
    <>
      <h1 id='title'>Calculator</h1>
      <div className='numpad'>
        <div id='formula'>{history}</div>
        <div id='display'>{result}</div>
        {buttonMap.map(button => {
          const {sign, id, elementID} = button;
          return (
            <button onClick={() => {updateDisplay(sign)}} key={id} className='button' id={elementID} type="button">{sign}</button>
          )
        })}
      </div>
      <h6 id='author'>by Ahmad Osman</h6>
    </>
  )
}

export default App
