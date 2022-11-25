import logo from './logo.svg';
import './App.css';
import * as Sentry from "@sentry/react";

// class App extends React.Component {
//   render() {
//     return (
//       <Sentry.ErrorBoundary fallback={myFallback} showDialog>
//         <Example />
//       </Sentry.ErrorBoundary>
//     );
//   }
// }



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={function changeThisApp(){ throw new Error("We here"); }}>Change the world</button>
        <p>
          The SDK journey begins here
        </p>
        {/* <button onClick={methodDoesNotExist}>Break the world</button> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
