// NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage(){
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to a certain route after a delay (e.g., 3 seconds)
    const timeoutId = setTimeout(() => {
      navigate('/'); // Redirect to the dashboard route
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Redirecting to the dashboard...</p>
    </div>
  );
};

export default NotFoundPage;