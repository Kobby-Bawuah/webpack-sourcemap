import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import App2 from './App2';
import reportWebVitals from './reportWebVitals';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import { RewriteFrames as RewriteFramesIntegration } from "@sentry/integrations";

function FallbackComponent() {
  return <div>An error has occurred</div>;
}

//const myFallback = <FallbackComponent />;
// Alternatively:
const myFallback = () => <FallbackComponent />;

Sentry.init({
  dsn: process.env.SENTRYDSN,
  // release: "SDK-rangers@1.0.0",
  release: "1.0.2",
  environment: "production",
  integrations: [new BrowserTracing(), new RewriteFramesIntegration(
    {
      // function that takes the frame, applies a transformation, and returns it
      iteratee: frame => {
        if (frame.filename) {
          console.log(frame.filename)
          //get everything after the final slash
          const noPathFilename = frame.filename.split("/").pop();

          console.log(noPathFilename)
    
          //match with uploaded source map's path
          const frameFilename = `~/`;
          
          console.log(frameFilename)
          
          //set it and give it back
          // frame.filename = frameFilename;
          return frame;
        }
    
        //if there was no filename, return the frame untouched
        return frame;
      }
    }
  )],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  autoSessionTracking: true, //Release Health
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Sentry.ErrorBoundary fallback={myFallback} showDialog> */}
    <Sentry.ErrorBoundary fallback={myFallback}>
    <App/>
    </Sentry.ErrorBoundary>
    <App2/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
