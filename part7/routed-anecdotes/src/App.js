import React, { useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to={"/"} style={padding}>
        anecdotes
      </Link>
      <Link to={"/create"} style={padding}>
        create new
      </Link>
      <Link to={"/about"} style={padding}>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => {
  if (anecdote) {
    const { content, author, info, votes } = anecdote;
    return (
      <div>
        <h1>
          {content} by {author}
        </h1>
        <p>
          Has {votes} votes
          <br />
          for more info see <a href={info}>{info}</a>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p>This anecdote does not exist</p>
      </div>
    );
  }
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/JasirZaeem/fullstackopen/tree/main/part7/routed-anecdotes">
      github.com/JasirZaeem/fullstackopen/tree/main/part7/routed-anecdotes
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  // const [content, setContent] = useState("");
  const { clearValue: clearContent, ...content } = useField("text");
  // const [author, setAuthor] = useState("");
  const { clearValue: clearAuthor, ...author } = useField("text");
  const { clearValue: clearInfo, ...info } = useField("text");
  const history = useHistory();

  const clearFields = () => {
    clearContent();
    clearAuthor();
    clearInfo();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    props.createNotification(`a new anecdote ${content.value} created!`, 10);
    clearFields();
    history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button type={"button"} onClick={clearFields}>
          reset
        </button>
      </form>
    </div>
  );
};
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState({
    content: "",
    removalTimeoutID: null,
  });

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match ? anecdoteById(match.params.id) : null;

  const createNotification = (content, durationInSeconds) => {
    setNotification((prevState) => {
      if (prevState.removalTimeoutID) {
        clearTimeout(prevState.removalTimeoutID);
      }
      return {
        content,
        removalTimeoutID: setTimeout(
          () =>
            setNotification({
              content: "",
              removalTimeoutID: null,
            }),
          durationInSeconds * 1000
        ),
      };
    });
  };
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification.content ? <p>{notification.content}</p> : null}
      <Switch>
        <Route path={"/anecdotes/:id"}>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} createNotification={createNotification} />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};
export default App;
