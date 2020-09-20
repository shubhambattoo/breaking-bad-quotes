import React, { useEffect, useReducer } from 'react';
import Button from './Button';
import './Quote.scss';

function stateReducer(state, action) {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        status: 'rejected',
        error: action.error,
      };
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        quote: action.quote,
      };
    }
    case 'started': {
      return {
        ...state,
        status: 'pending',
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const Quote = () => {
  const [state, dispatch] = useReducer(stateReducer, {
    status: 'idle',
    quote: null,
    error: null,
  });

  useEffect(() => {
    getQuote();
  }, []);

  function getQuote() {
    const baseURI = 'https://www.breakingbadapi.com/api/';
    const quoteURI = `${baseURI}quote/random`;
    dispatch({ type: 'started' });
    fetch(quoteURI)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((body) => {
        dispatch({ type: 'success', quote: body[0] });
      })
      .catch((error) => {
        dispatch({ type: 'error', error });
      });
  }

  function getNewQuote() {
    getQuote();
  }

  function tweetQuote() {
    const location = `https://twitter.com/intent/tweet?hashtags=quotes,breakingbad&related=breakingbad&text=${state.quote.quote}- ${state.quote.author}`;
    window.open(location);
  }

  if (state.status === 'idle' || state.status === 'pending') {
    return <div className='loading'>Loading</div>;
  }

  if (state.status === 'resolved') {
    return (
      <div className="quote">
        <div className="quote__content">{state.quote.quote}</div>
        <div className="quote__author">- {state.quote.author}</div>
        <div className="quote__actions">
          <Button title="tweet" onClick={tweetQuote} type="info" />
          <Button title="new quote" onClick={getNewQuote} />
        </div>
      </div>
    );
  }

  if (state.status === 'rejected') {
    return (
      <div>
        <div>Oh no, there was a problem getting a quote:</div>
        <pre>{state.error.message}</pre>
      </div>
    );
  }
};

export default Quote;
