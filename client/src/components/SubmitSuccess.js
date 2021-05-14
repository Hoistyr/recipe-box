import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router';

const SubmitSuccess = (props) => {
  const timerAmount = 5000;
  const successDiv = 
    <div className="submitSuccess">
      <h1>{props.location.state.name} is now in the box</h1>
    </div>
  const [returnDiv, setReturnDiv] = useState(successDiv);
  const [switchPages, setSwitchPages] = useState(false);

  useEffect(() => {
    const redirect = <Redirect to="/"/>;
    if (switchPages === true) {
      setReturnDiv(redirect);
    }
    
  }, [switchPages]);
  setTimeout(setSwitchPages.bind(this, true), timerAmount);


  return (
    returnDiv
  );
}

export default SubmitSuccess;