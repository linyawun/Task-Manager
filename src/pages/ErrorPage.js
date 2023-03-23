import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ErrorPage() {
  const path = useParams();
  console.log(path['*']);
  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
      <div className='text-center'>
        <h1 className='display-1 fw-bold'>404</h1>
        <p className='fs-3'>
          {' '}
          <span className='text-danger'>Oops!</span> Page not found.
        </p>
        <p className='lead'>
          Sorry, the page <code>{path['*']}</code> could not be found.
        </p>
        <Link to='/' className='btn btn-primary actionBtn rounded-pill'>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
