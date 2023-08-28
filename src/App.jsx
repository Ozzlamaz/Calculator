import { useState } from 'react'
import './App.css'
import buttonMap from './data'

const endsWithNumber = /\d$/;
const checkDecimal = /(\.)/;
const checkminus = /([-]$)/;
const checkEquals = /=/;

function App() {
  
  const [result, setResult] = useState('0'); 
  const [history, setHistory] = useState('');

  const updateDisplay = (sign) => {
    
    if(sign == 'C') {
      setResult('0');
      setHistory('');
      return;
    }

    if(sign == '=') {
      let newResult = eval(history);
      setResult(eval(history));
      setHistory(history + sign + newResult);
      return;
    }

    if (checkEquals.test(history)) {

      if (!endsWithNumber.test(sign)) {
        setHistory(result + sign);
        setResult(sign);
        return;
      }

      if (endsWithNumber.test(sign)) {
        setHistory(sign);
        setResult(sign);
        return;
      }
    }

    if(history == '' && sign != '0') {
      setResult(sign);
      setHistory(sign);
      return;
    }

    if(sign == '.') {
      if(checkDecimal.test(result)) {
        return;
      }
    }

    if (result == '0') {
      if(!endsWithNumber.test(sign) && sign != '.') {
        return;
      }
      if (sign == '0') {
        return;
      }
    }
    
    if(!endsWithNumber.test(sign) && sign != '.') {
      if(sign != '-') {
        let newResult = history + sign;
        setHistory(newResult.replace(/[\D]+$/, sign));
        setResult(sign);
        return;
      }
      if (checkminus.test(history)) {
        return;
      }
      setHistory(history + sign);
      setResult(sign);
      return;
    }
    setHistory(history + sign);
    let newHistory = history + sign;
    setResult(newHistory.match(/(?=[+|-|*|//]*)[\d]+\.*[\d]*$/));
    
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
