import { useState } from 'react'
import './App.css'
import buttonMap from './data'


function App() {
  

  return (
    <div className='numpad'>
      <div id='display'>0</div>
      <h1 id='title'>Calculator</h1>
      <h6 id='author'>by Ahmad Osman</h6>
      {buttonMap.map(button => {
        const {sign, id, elementID} = button;
        return (
          <button key={id} className='button' id={elementID} type="button">{sign}</button>
        )
      })}
    </div>
  )
}

export default App
