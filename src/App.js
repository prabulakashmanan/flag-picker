import './App.css';
import StepsComponent from './components/StepsComponent';

function App() {
  return (
    <div className="container">
      <h1 className="mainTitle">Flag Picker</h1>
      <p className="subTitle">This app will help you to learn flags around the world in&nbsp; 
        <span className="grey-br-bottom">3 steps</span>
      </p>
      <StepsComponent />
    </div>
  );
}

export default App;
