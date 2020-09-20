import React from 'react';
import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import Quote from './components/Quote';

function App() {
  return (
    <main className="container">
      <Header />
      <Quote />
      <Footer />
    </main>
  );
}

export default App;
