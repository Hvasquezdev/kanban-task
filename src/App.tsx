import { useState } from 'react';
import BaseSelect from './components/BaseSelect';
import { Option } from './components/BaseSelect/BaseSelect';
import BaseTextField from './components/BaseTextField';
import BaseMenu from './components/BaseMenu';
import { MenuOptionColor } from './components/BaseMenu/BaseMenu';
import BaseCheckbox from './components/BaseCheckbox';
import BaseModal from './components/BaseModal';
import BaseButton from './components/BaseButton';
import BaseTextarea from './components/BaseTextarea';

function App() {
  const [option, setOption] = useState<Option>();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <div style={{ padding: 16 }}>
      <BaseMenu className="menu-preview" options={menuOptions} />
      <BaseSelect options={options} value={option} onSelect={setOption} label="Label Test" />
      <BaseCheckbox value={isChecked} label="Hovered" onChange={setIsChecked} />

      <form style={{ display: 'flex', gap: '16px', flexDirection: 'column', maxWidth: '640px' }}>
        <BaseTextField onChange={setText} value={text} label="Text Field" required placeholder="e.g Make cofee" />

        <BaseTextarea
          onChange={setDescription}
          value={description}
          label="Description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
        />
        <button type="submit">Submit</button>
      </form>
      <BaseModal isOpen={isOpen} renderHeader={() => <h1>Header Testing</h1>} onClose={setIsOpen}>
        <p>Modal Content</p>
      </BaseModal>
      <BaseButton onClick={() => setIsOpen(!isOpen)}>Open Test Modal</BaseButton>

      <BaseButton variant="contained" color="destructive">
        Contained
      </BaseButton>
      <BaseButton variant="text" color="destructive">
        Text
      </BaseButton>
      <BaseButton variant="outlined" color="destructive">
        Outlined
      </BaseButton>
    </div>
  );
}

export default App;
