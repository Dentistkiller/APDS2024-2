import logo from '.././logo.svg';
import '.././App.css';


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to APDS 
        </p>
        <a>
          We Are using React for the frontend
        </a>
      </header>
    </div>
  );
}

export default Home;
