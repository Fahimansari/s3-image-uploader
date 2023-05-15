"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const TestServer = () => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/test');
        setResponse(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>{response}</p>
    </div>
  );
};

export default TestServer;