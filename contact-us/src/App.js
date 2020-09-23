import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState();
  const [emailConsent, setEmailConsent] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const validEmailRegex = RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  );

  const handleClear = () => {
    // document.getElementById('contact-us').reset();
    setName('');
    setEmail('');
    setBirthDate();
    setEmailConsent(false);
    setIsSuccessful(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      'https://my-json-server.typicode.com/JustUtahCoders/interview-users-api/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, birthDate, emailConsent }),
      }
    )
      .then((resp) => {
        setIsSuccessful(true);
        document.getElementById('contact-us').reset();
        setName('');
        setEmail('');
        setBirthDate();
        setEmailConsent(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event) => {
    if (document.getElementById('emailConsent').checked) {
      setEmailConsent(true);
    } else {
      setEmailConsent(false);
    }
  };

  const isDisabled =
    name.length === 0 ||
    validEmailRegex.test(email) === false ||
    email.length === 0 ||
    emailConsent === false;

  return (
    <div>
      {isSuccessful ? (
        <div className="App">
          <form id="contact-us">
            <h1>Contact Us</h1>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Type your name here"
              onChange={(evt) => setName(evt.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Type your email here"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <label htmlFor="birthDate">Birth Date</label>
            <input
              id="birthDate"
              type="date"
              placeholder="Type your birth date here"
              onChange={(evt) => setBirthDate(evt.target.value)}
            />
            <input
              type="checkbox"
              id="emailConsent"
              onChange={(evt) => handleChange(evt.target.value)}
            />
            <label htmlFor="emailConsent">
              I agree to be contacted via email.
            </label>
            <input type="button" value="Clear" onClick={handleClear} />
            <input
              type="submit"
              value="Submit"
              onClick={(event) => handleSubmit(event)}
              disabled={isDisabled}
            />
            <p>Contacted Successfully!</p>
          </form>
        </div>
      ) : (
        <div className="App">
          <form id="contact-us">
            <h1>Contact Us</h1>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Type your name here"
              onChange={(evt) => setName(evt.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Type your email here"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <label htmlFor="birthDate">Birth Date</label>
            <input
              id="birthDate"
              type="date"
              placeholder="Type your birth date here"
              onChange={(evt) => setBirthDate(evt.target.value)}
            />
            <div id="consent">
              <input
                type="checkbox"
                id="emailConsent"
                onChange={(evt) => handleChange(evt.target.value)}
              />
              <label htmlFor="emailConsent" id="consent-label">
                I agree to be contacted via email.
              </label>
            </div>

            <input
              id="clear"
              type="button"
              value="Clear"
              onClick={handleClear}
            />
            <input
              id="submit"
              type="submit"
              value="Submit"
              onClick={(event) => handleSubmit(event)}
              disabled={isDisabled}
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
