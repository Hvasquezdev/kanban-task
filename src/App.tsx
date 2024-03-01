import { useState } from 'react';
import './App.css';
import BaseSelect from './components/BaseSelect';
import { Option } from './components/BaseSelect/BaseSelect';
import BaseTextField from './components/BaseTextField';
import BaseMenu from './components/BaseMenu';
import { MenuOptionColor } from './components/BaseMenu/BaseMenu';

function App() {
  const [option, setOption] = useState<Option>();
  const [text, setText] = useState('');

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const menuOptions = [
    {
      label: 'Edit Board',
      action: () => console.log('Action edit')
    },
    {
      label: 'Delete Board',
      color: MenuOptionColor.Danger,
      action: () => console.log('Action delete')
    }
  ];

  return (
    <>
      <BaseMenu className="menu-preview" options={menuOptions} />

      <BaseSelect options={options} value={option} onSelect={setOption} />

      <form>
        <BaseTextField onChange={setText} value={text} label="Text Field" required placeholder="e.g Make cofee" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
