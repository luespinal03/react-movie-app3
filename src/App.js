import "./App.css";
import { useEffect, useState } from "react";
import BlogList from "./Components/BlogList";
import OptionBar from "./Components/OptionBar";


const sampleBlogs = [
  {
    createdAt: "2022-06-30T04:03:07.069Z",
    author: "Marion Roberts DDS",
    text: "Vitae quaerat nostrum dolor. Eius non totam autem unde ea consequatur quia. Laborum exercitationem sed.\nQui quam corrupti voluptatem autem. Voluptatum in et voluptas quisquam id doloremque nostrum unde. Consequuntur ea qui.\nSed consequuntur voluptas nemo ea laborum neque distinctio quo iusto. Temporibus aut quisquam. Laboriosam fugit eum sint corporis sequi minus iste molestiae quos. Quae aut earum quasi facilis hic et.",
    title: "sapiente",
    id: "1",
  },
  {
    createdAt: "2022-06-30T04:16:20.950Z",
    author: "Dr. Martha Herman",
    text: "Et consequatur earum et in quam. Tenetur ipsam dolores. Eius aperiam est.\nRerum laborum ut. Accusantium amet qui impedit laudantium. Aut et minus perspiciatis voluptates. Mollitia modi maiores non. Qui animi assumenda distinctio repellendus reiciendis tenetur esse quia magnam. Quo natus minus sed.\nEa quod nulla hic est et libero enim et. Occaecati voluptas ut minus impedit aperiam. Dolore atque cumque ut accusamus enim. Dicta qui minima et doloremque quam veniam voluptatibus. Nihil repellat et. Laboriosam quia voluptatem.",
    title: "nemo",
    id: "2",
  },
  {
    createdAt: "2022-06-30T09:57:45.633Z",
    author: "Francis McDermott",
    text: "Consequatur nostrum adipisci doloribus commodi. Dolore enim minus. Assumenda sint molestiae. Voluptatem repellat ad. Quasi incidunt accusantium ipsum voluptate aut modi.\nSed id labore recusandae commodi. Ullam neque ab. At similique veritatis. Voluptas similique deserunt nihil praesentium qui. Dolore velit ea doloremque quae quo modi.\nOccaecati id nobis architecto ut beatae et. Consequuntur aut eveniet cum optio. Non dolores asperiores optio consequatur sequi.",
    title: "omnis",
    id: "3",
  },
  {
    createdAt: "2022-06-30T01:29:57.446Z",
    author: "Miss Rickey Schmidt",
    text: "In corrupti adipisci. Qui eaque voluptatem at. Libero et omnis ullam. Soluta quas provident iste autem quae saepe et dolor.\nDolores quos voluptate quibusdam qui harum inventore. Quae pariatur reprehenderit dignissimos non qui itaque veniam quod magni. Deserunt veritatis qui natus eligendi. Aut adipisci eum voluptatem libero similique. Aut delectus nam. Ullam dolor nostrum consectetur aut sit illum magni.\nCum nemo harum earum sed. Nobis et in cumque placeat. Odio alias sint ab. Ratione amet fuga vitae aut dolorum.",
    title: "expedita",
    id: "4",
  },
  {
    createdAt: "2022-06-29T19:17:08.325Z",
    author: "Marcella Jacobson",
    text: "Voluptatibus laboriosam culpa ut aut ea ipsum alias itaque. Placeat qui et. Quam ipsa non unde fugiat cupiditate dignissimos.\nUt ut rerum veniam sit deserunt. Molestiae ut quis molestiae quis autem aliquid. Non beatae sequi minus voluptatem enim accusantium quia dolorem.\nDolorum vel aperiam est pariatur id. Sunt et nam. Sit eligendi dolorem ullam dicta quo ipsa omnis. Assumenda accusantium tempora qui temporibus cum rerum error necessitatibus. Nisi consectetur fuga qui nisi eaque maxime quia pariatur.",
    title: "similique",
    id: "5",
  },
];


const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;


const App = () => {

  // The empty function passed into useEffect is known as an effect function.
  // The empty array is called the dependency array and is necessary to prevent repeated calls of the effect function every time < App /> renders.If we did not have the empty array here(try taking it out once you have the app up and running to see what happens), the effect function would trigger every time < App /> rerenders which will happen every time setBlogs is called.This triggering an endless loop of rerendering.

  const [urlParamString, setUrlParamString] = useState("");

  // function below is passing the values we have acquired through useState in OptionBar component into urlParams string value, then updating the whole link with the new values with setUrlParamString at teh bottom of the function
  const generateUrlParams = (limit, page, sortBy, order) => {
    let urlParams = `?limit=${limit}&page=${page}&sortBy=${sortBy}&order=${order}`;
    // console.log('urlParams')
    // console.log(urlParams)
    setUrlParamString(urlParams);
  }




  const [blogs, setBlogs] = useState([...sampleBlogs]);


  useEffect(() => {
    // console.log("fetch blogs")
    const fetchBlogs = async () => {
      // console.log(urlEndpoint)
      // line below is fetching the requested data from the url
      const result = await fetch(
        // here we are passing the information collected from urlParamString into the fetch
        `${urlEndpoint}/blogs${urlParamString}`
      );
      // console.log("result")
      // console.log(result)
      // line below is taking the fetched data and .json() it and setting it as a value to variable "blogs"
      const blogs = await result.json()
      // console.log(blogs)
      // line below is passing the requested data after it was .json()'ed (as blogs) as a parameter into setBlogs from useState
      setBlogs(blogs);
    };
    fetchBlogs();
    // array below is called dependency array. when it is empty, useEffect() will run everytime the page gets refreshed. 
    // here we are passing urlParamString as our dependency in useEffect function. This means when urlParamString changes, useEffect will run the things inside of it aka update the rendereed information based on the parameters the user inputs

    // **** James's explanation below *****
    // This way, whenever the function generateUrlParams is called from <OptionBar/>, the urlParamString state variable will update with a new value and the effect function in the useEffect will be triggered, refetching our list of blogs with the updated query params.
  }, [urlParamString]);

  return (
    <div className="App-header">
      <OptionBar generateUrlParams={generateUrlParams} />
      <BlogList blogs={blogs} />
    </div>
  );
}

export default App;