import { useState } from 'react';
import BaseModal from './components/BaseModal';
import BoardColumnTask from './components/BoardColumnTask';
import BoardNewColumn from './components/BoardNewColumn';
import BaseLayout from './layouts/BaseLayout';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseLayout>
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <BoardColumnTask name="Build UI for onboarding flow" subtasks={{ completed: 2, total: 5 }} />
        <BoardColumnTask name="Figueron Engineer" subtasks={{ completed: 1, total: 5 }} />
        <BoardColumnTask name="Tite Design" subtasks={{ completed: 4, total: 5 }} />
        <BoardColumnTask name="Dito Python Frameworks" subtasks={{ completed: 5, total: 5 }} />
      </div> 

      <BaseModal isOpen={isOpen} renderHeader={() => <h1>Header Testing</h1>} onClose={setIsOpen}>
        <p>Modal Content</p>
      </BaseModal>

      <BoardNewColumn onClick={() => setIsOpen(!isOpen)} label="+ New column" />
    </BaseLayout>   
  );
}

export default App;
