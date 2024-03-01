import { useState } from 'react';
import './App.css';
import BaseSelect from './components/BaseSelect';
import { Option } from './components/BaseSelect/BaseSelect';
import BaseTextField from './components/BaseTextField';

function App() {
  const [option, setOption] = useState<Option>();
  const [text, setText] = useState('');

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  return (
    <>
      <BaseSelect options={options} value={option} onSelect={setOption} />

      <form>
        <BaseTextField onChange={setText} value={text} label="Text Field" required placeholder="e.g Make cofee" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
