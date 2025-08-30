function App() {
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:15001/api")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("API unavailable"));
  }, []);

  return React.createElement('div', null, message || 'Loading...');
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
