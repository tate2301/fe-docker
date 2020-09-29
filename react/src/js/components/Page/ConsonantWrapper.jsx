/* eslint-disable */
import React from 'react';
import { useState, useEffect } from 'react';

function ConsonantWrapper(){
    const [name, setName] = useState('World');
    useEffect(() => {
        document.title = `Hello, ${name}`;
    });

    return (
      <div className="App">
        <h1>Hello, {name}!</h1>
        <button onClick={() => setName('James')}>
          Click me to change the name 2
        </button>
      </div>
    );
}

export default ConsonantWrapper;