import BoardColumnTask from './components/BoardColumnTask';
import BaseLayout from './layouts/BaseLayout';

function App() {
  return (
    <BaseLayout>
      <div style={{ width: '30%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <BoardColumnTask name="Build UI for onboarding flow" subtasks={{ completed: 2, total: 5 }} />
        <BoardColumnTask name="Figueron Engineer" subtasks={{ completed: 1, total: 5 }} />
        <BoardColumnTask name="Tite Design" subtasks={{ completed: 4, total: 5 }} />
        <BoardColumnTask name="Dito Python Frameworks" subtasks={{ completed: 5, total: 5 }} />
      </div>
    </BaseLayout>
  );
}

export default App;
