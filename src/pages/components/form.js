import React, { useReducer } from 'react';
import styles from './form.module.css';

const INITIAL_STATE = {
  name: '',
  email: '',
  subject: '',
  body: '',
  status: 'IDLE'
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'updateStatus':
      return {
        ...state,
        status: action.value
      };
    case 'resetVallue':
      return INITIAL_STATE;
    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const handleSubmit = async e => {
    e.preventDefault();
    fetch('/api/sendMail', {
      method: 'POST',
      body: JSON.stringify(state)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        updateStatus('SUCCESS');
      })
      .catch(e => {
        console.log(e);
        updateStatus('ERROR');
      });
  };
  const updateStatus = status => {
    dispatch({
      type: 'updateStatus',
      value: status
    });
  };
  const updateFieldValue = field => event => {
    dispatch({
      type: 'updateFieldValue',
      field,
      value: event.target.value
    });
  };

  if (state.status === 'SUCCESS') {
    return (
      <div className={styles.success}>
        <p> Message sent success </p>{' '}
        <button
          className={styles.button}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: 'resetValue'
            });
          }}
        >
          Reset{' '}
        </button>{' '}
      </div>
    );
  }
  return (
    <>
      {state.status === 'ERROR' && <p className={styles.error}> Something went wrong </p>}{' '}
      <form
        className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name:
          <input
            type="text"
            className={styles.input}
            name="name"
            value={state.name}
            onChange={updateFieldValue('name')}
          />{' '}
        </label>{' '}
        <label className={styles.label}>
          Email:
          <input
            type="email"
            className={styles.input}
            name="email"
            value={state.email}
            onChange={updateFieldValue('email')}
          />{' '}
        </label>{' '}
        <label className={styles.label}>
          Subject:
          <input
            type="text"
            className={styles.input}
            name="subject"
            value={state.subject}
            onChange={updateFieldValue('subject')}
          />{' '}
        </label>{' '}
        <label className={styles.label}>
          body:
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue('body')}
          />{' '}
        </label>{' '}
        <button className={styles.button}> Send </button>{' '}
        <button
          className={styles.button}
          onClick={e => {
            e.preventDefault();
            dispatch({
              type: 'resetValue'
            });
          }}
        >
          Reset{' '}
        </button>{' '}
      </form>{' '}
    </>
  );
};

export default Form;
