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

## INSTRUCTIONS

    Creating the OptionBar

Approach: We will create a react component called OptionBar that will hold our input fields and state variables for the options limit, page, sortBy and order.
In ./src/App.js, create a new component called OptionBar.
In <OptionBar/>, create 4 new state variables along with their setter functions: [1]
limit with an inital value set to 10
page with an initial value set to 1
sortBy with an initial value set to ""
order with an initial value set to ""
In the JSX of <OptionBar/>,
Add a label with the display value of Limit
Add a type="number" input field that has a value attribute equal to the limit state variable and an onChange handler that sets limit to the event value. [2]
Add a label with the display value of Page
Add a type="number" input field that has a value attribute equal to the page state variable and an onChange handler that sets page to the event value.
Add a label with the display value of SortBy
Add a select field with an onChange handler that sets the sortBy state variable to the event value. Additionally, add the following as options to the select field: [3]
An empty option as the default
An option with the value and display text of id
An option with the value and display text of title
An option with the value and display text of createdAt
Add a label with the display value of Order
Add a select field with an onChange handler that sets the order state variable to the event value. Additionally, add the following as options to the select field:
An empty option as the default
An option with the value and display text of asc
An option with the value and display text of desc
Generating URL Params
Approach: Now that we have our input fields setup, we need to use those inputs to generate the parameter portion of our url inside of the useEffect function of <App/>. We will be creating a new function to generate the parameter string and set a new urlParamString state variable in the body of <App/>. We will then pass that generator function down as a prop into <OptionBar/> to update the urlParamString state variable every time a user updates one of the input fields.
Add a new state variable to <App/> called urlParamString and initialize it to an empty string "".
In the body of <App/>, create a new function called generateUrlParams with the parameters limit, page, sortBy and order. [4]
Inside the function generateUrlParams, implement the following:
Create a new variable using let called urlParams that equals the string "?"
For each of the four function parameters limit, page, sortBy and order, concatenate four strings onto urlParams that each have the form {parameter-name}={parameter-value}. Each of these four strings should have the "&" symbol between them.
E.G. If limit = 5 and page = 2, the urlParamString state variable should be set to "?limit=5&page=2". If the limit = 4, page = 3, sortBy = createdAt and order = asc, the urlParamString state variable should be set to "?limit=4&page=3&sortBy=createdAt&order=asc".
Finally, call the setter function setUrlParamString with urlParams passed as an argument to set the state variable urlParamString to our generated urlParams string.
In the fetchBlogs async function, update the url passed into the fetch call to be: {urlEndpoint}/blogs{urlParamString}. This way, the urlParamString we generated will be automatically appended to our blogs API url. [5]
In the JSX of <App/>, add an instance of <OptionBar/> above <BlogList/> with the generateUrlParams function passed in as a prop to <OptionBar/>. [6]
Implementing the useEffects
Approach:
We have already created a useEffect in <App/> that will fetch our blogs on page load. Now we want to trigger this effect to run when our users enter a new value into any of our input fields. To do this, we will first set the urlParamString state variable as a dependency inside the useEffect dependency array.
This way, whenever the function generateUrlParams is called from <OptionBar/>, the urlParamString state variable will update with a new value and the effect function in the useEffect will be triggered, refetching our list of blogs with the updated query params.
Additionally, we will want a way of calling generateUrlParams inside of <OptionBar/> every time the user updates an input field. One way we could do this is to pass generateUrlParams into the onChange handlers of all of our input fields. But remember that useEffect is a way of "kicking off" some functionality as a response to some event. So instead, we will be creating a new useEffect in the body of <OptionBar/> that watches all the input state variables for changes and calls generateUrlParams in the effect function.
Thus once we have everything set up properly, we should be able to:
Update one of the input fields in <OptionBar/>
Which will then in turn trigger the useEffect of <OptionBar/>
Which will then call generateUrlParams
Which will then set urlParamString state to a new value
Which will then trigger the <App/> useEffect
Which will then call the blogs API
Which will then retrieve a new blog list
Which will finally update the blogs state variable to render our blogs to the page.
In the dependency array of the useEffect in <App/> that is calling fetchBlogs, add urlParamString as an item. [7]
In the body of <OptionBar/>, create a new useEffect. The effect function of this useEffect should call props.generateUrlParams with the state variables limit, page, sortBy and order passed as arguments. The dependency array for this useEffect should be watching the state variables limit, page, sortBy and order. [8]
If you implemented all of the above correctly, you should be able to change the input values in <OptionBar/> and have the displayed blog list update in real time.
Note: Due to the way the API works, limit and page must both have numerical values for either one to work; additionally, sortBy and order must both have proper string values in order for either one to work. I.E. For the API to recognize the value of the limit param, the page param must have a value as well. For the sortBy param, the order param must also have a value and vice versa.
