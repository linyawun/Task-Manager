import React from 'react';

export default function ErrorScreen({ error }) {
  //接收傳入的 error 屬性
  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <div className='text-center'>
        <h4 className='display-1'>Terribly Sorry!</h4>
        <p className='fs-3'> Seems like something went wrong.</p>
        <p className='lead'>We were unable to process your request</p>
        <p>
          The error message is: <code>{error.message}</code>
        </p>
        {/* <Link to='/' className='btn btn-primary actionBtn rounded-pill'>
          Go Home
        </Link> */}
      </div>
    </div>
  );
}
