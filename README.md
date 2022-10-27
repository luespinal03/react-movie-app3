# Fullstack Intro Day 2

## .env files

- _Reminder_: .env files hold our environment variables. When we start a server/terminal process, the variables in a .env file are loaded into the global scope and are accessable using the process.env.VARIABLE_NAME syntax. When we create a .env file in our file system, it will go on the top level of our repository; i.e, the same file level as the package.json.
  - _Note_: After you create a .env file in your folder, you need to restart the terminal process for your environment variables to be loaded into the scope.
- _Requirement_: React applications REQUIRE environment variables to be prepended with the string REACT_APP. I.E. All environment variables you will create for react MUST start with REACT_APP. Everything after the REACT_APP prefix is up to you to name for your variable.
- All environment variables coming from the .env file will be strings

## useEffect

- _Convention_: (and due to variable scope), useEffect goes into the body of a component (above the JSX return) and below the state variables.
- The starting definition for useEffect will always be:
  - useEffect(()=>{}, [])
  - The first argument is the effect function and the second argument is the dependency array.
- _Convention_: If there is an async function that is going to be invoked in the useEffect, the function definition should go inside of the useEffect effect function. The async function is then invoked inside of the useEffect effect function after the definition.

## React Component Composition

- The top most code for react components will be the props or destructured props.
- After the destructured props comes the state variables.
- After the state variables comes the useEffects.
- After the useEffects comes any handler functions or pre-processing code for variables that are rendered in the JSX.
- Last comes the JSX return statement.

## fetch

- The fetch API is a globally available API to browser applications. I.E. If you are running a browser client app such as a react app or a jQuery app, the fetch API will be available to you. The fetch API is a lightweight module that allows you to make HTTP requests to specific urls along with optional parameters.
  - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- For react applications, your fetch async functions/invocations are going to live inside of an async function that lives inside of a useEffect.
- _Convention_: Since await fetch() returns the response data, we assign that response data to a variable called result.
- If the response to the fetch() has an OK status/status code (such as 200), the payload/body of the fetch will be retrieved by calling the awaited .json() method on result. Usually we assign that to a variable whose name represents the data we are expecting.

## API

- The majority of API's across the internet have what is known as a rate limit. Which means that you can either request the API a certain number of times per second/minute/hour or you can only request the API a certain number of times per day (unless you pay more).
