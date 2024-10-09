import AddToDo from './components/addtodo';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import './App.css';

const App = () => {
  return (
    <main>
      <h1 style={{ margin: '0px 0px 20px' }}>TODO REACT + TYPESCRIPT</h1>
      <Navbar />
      <AddToDo />
      <Todos />
    </main>
  );
};

export default App;
