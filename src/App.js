import logo from './logo.svg';
import './App.css';
import Greet from './Components/greet'
import Welcome from './Components/welcome'
import ParentComponent from './Components/ParentComponent'
import Login from './Components/Login'
import NameList from './Components/NameList';

function App() {
  return (
    <div className="App">
      {/* <Greet name="Mahmud" />
      <Greet name = " Mahmud">
        <p>This is child</p>
        <p>This is child</p>
        </Greet>
      <Greet name="Keya" />
      <Greet name="Mahmud" /> */}
      {/* <Welcome/> */}

      {/* <ParentComponent/> */}
      
     <NameList/>

    </div>
  );
}

export default App;
