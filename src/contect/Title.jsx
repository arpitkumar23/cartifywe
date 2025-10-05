import React from "react";
import '../css/Title.css'
 

const Title = ({ text1, text2 }) => {
  return (
    <div className="title">
      <h2>
        <span className="highlight">{text1}</span> {text2}
      </h2>
       
    </div>
  );
};

export default Title;


