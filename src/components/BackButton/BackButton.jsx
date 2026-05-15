import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import classes from './BackButton.module.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.back_container} onClick={() => navigate(-1)}>
      <IoMdArrowBack size={20} />
      <span>Back to previous page</span>
    </div>
  );
};

export default BackButton;
