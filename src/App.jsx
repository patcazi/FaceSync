import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to dashboard
        console.log('User is signed in:', user);
        navigate('/dashboard');
      } else {
        // User is not signed in, redirect to login
        navigate('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>FaceSync</h1>
      <p style={{ textAlign: 'center' }}>Loading...</p>
    </div>
  );
}

export default App;
