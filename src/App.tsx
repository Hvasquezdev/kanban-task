import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import BaseSelect from './components/BaseSelect';
import { Option } from './components/BaseSelect/BaseSelect';

function App() {
  const [count, setCount] = useState(0);
  const [option, setOption] = useState<Option>();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <>
      <BaseSelect options={options} value={option} onSelect={setOption} />
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((currentCount) => currentCount + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
