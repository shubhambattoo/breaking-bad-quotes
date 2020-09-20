import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ title, type = 'normal', onClick }) => {
  const btnClass = classNames({
    btn: true,
    info: type === 'info',
    normal: type === 'normal',
  });

  return (
    <button className={btnClass} onClick={onClick}>
      {title}
    </button>
  );
};

export default React.memo(Button);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};
