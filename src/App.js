import React, { useState, useEffect } from 'react';
import logo from './icons/bacteria (1).svg';
import './App.css';
// import CountUp from 'react-countup';
import Chart from './components/chart'
import Card from './components/card'
import Country from './components/country'
// import { fetchAPI } from './components/fetch'

function App() {

  // const [confirmed, setconfirmed] = useState('');
  // const [deaths, setdeaths] = useState('');
  // const [recovered, setrecovered] = useState('')

  const [allAPI, setallAPI] = useState({
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    lastUpdate: ''
  })

  const url = 'https://covid19.mathdro.id/api';
  const fetchAPI = () => {
    fetch(url).then(res => res.json())
      .then(data => {
        setallAPI({
          confirmed: data.confirmed.value,
          deaths: data.deaths.value,
          recovered: data.recovered.value,
          lastUpdate: data.lastUpdate
        })
      })
      .catch(console.log)
  }

  useEffect(() => {
    fetchAPI()

  }, [setallAPI])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Card style={`card confirmed`} number={allAPI.confirmed} time={allAPI.lastUpdate} />
        <Card style={`card deaths`} number={allAPI.deaths} time={allAPI.lastUpdate} />
        <Card style={`card recovered`} number={allAPI.recovered} time={allAPI.lastUpdate} />
      </main>
      <section>
        <Country />
      </section>
      <section>
        <Chart />
      </section>
    </div>
  );
}

export default App;
