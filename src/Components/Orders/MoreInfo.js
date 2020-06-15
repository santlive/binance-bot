import React from 'react';
import PropTypes from 'prop-types';

const MoreInfo = ({ openTS, triggerTS, messages }) => {
  return (
    <details>
      <summary>More Info</summary>
      <div>
        {openTS ? <p>Open: {dateConvert(openTS)}</p> : ''}
        {messages.map((message) => (
          <p
            key={Math.round(Math.random() * 10 ** 10)}
            className={messageClass(message.type)}
          >
            {message.message}
          </p>
        ))}
        {triggerTS ? <p>Triggered: {dateConvert(triggerTS)}</p> : ''}
      </div>
    </details>
  );
};

const dateConvert = (d) => {
  return new Date(d).toLocaleString('en-GB');
};

const messageClass = (m) => {
  let resp = '';
  switch (m) {
    case 'S':
      resp = 'msg-success';
      break;
    case 'E':
      resp = 'msg-error';
      break;
    default:
      break;
  }
  return resp;
};

MoreInfo.propTypes = {
  openTS: PropTypes.number.isRequired,
  triggerTS: PropTypes.number,
  messages: PropTypes.array.isRequired,
};

export default MoreInfo;
