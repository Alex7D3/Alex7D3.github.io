import logo from './logo.svg';
import './App.css';
import Title from "./components/Title";
import Nav from "./components/Nav";
import About from "./components/About";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
        <Nav />
        <Title />
        <About />
        <Projects />
    </div>
  );
}

export default App;