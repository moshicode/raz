import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import moment from 'moment'

// import axios from 'axios';
import './App.css';
import db from './db'

import Header from './components/Header'
import Navbar from './components/Navbar'
import AddClient from './components/AddClient'
import SelectClient from './components/SelectClient'
import SelectShift from './components/SelectShift'
import ShiftForm from './components/ShiftForm';
import ShiftTimer from './components/ShiftTimer'
import ExportManager from './components/ExportManager'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      shifts: [],
      tempData: {
        selectedUser: null,
        lastedShift: null
      },
      selectedTempClient: null,
      stopWatchIsActive: false
    };
  }

  componentDidMount() {
    let clientsTable = db.table('clients').toArray()
    let shiftsTable = db.table('shifts').toArray()
    let lastShift = db.table('shifts').toCollection().last()
    Promise.all([clientsTable, shiftsTable, lastShift])
      .then(results => {
        let lastShift = false
        if (results[1].length > 0) {
          lastShift = results[2]
        }
        this.setState({
          clients: results[0],
          shifts: results[1],
          lastShift: lastShift
        })
      })
  }

  handleAddShiftByTimer = async (name) => {
    await db.shifts.add({
      name: name,
      date: moment().format("YYYY-MM-DD"),
      startTime: moment().format("HH:mm"),
      isActive: true
    })
  }

  handleAddShift = async (formData, timerState) => {
    await db.shifts.add({
      name: formData.clientName,
      date: formData.date,
      starttime: formData.startTime,
      endtime: formData.endTime,
      mintuescalctime: formData.mintuesCalcTime,
      note: formData.note,
      isActive: timerState
    })
  }

  setSelectedClient = (clientName) => {
    this.setState({
      selectedTempClient: clientName
    })
  }

  // getClientImg = async (name) => {
  //   try {
  //     return await axios.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  handleAddClient = async name => {
    // const img = await this.getClientImg(name)
    // img.data.filter(clientName => clientName.name === name)
    const client = {
      name
    };
    db.table('clients')
      .add(client)
      .then((id) => {
        const newList = [...this.state.clients, Object.assign(client, { id })];
        this.setState({ clients: newList });
      });
  }

  handleDeleteClient = id => {
    db.table('clients')
      .delete(id)
      .then(() => {
        const newList = this.state.clients.filter((client) => client.id !== id);
        this.setState({ clients: newList });
      });
  }

  render() {
    console.log(this.props)
    // if(this.state.selectedClient !== null) {
    //   return (
    //     <Redirect exact from="/" to="/clients/list" /> 
    //   )
    // }
    return (
      <div className="app">
        <Header />
        <Navbar />
        <div className="container">
          {/* {this.state.selectedTempClient !== null ?
            <Redirect from="/" to="/shifts/select" /> :
            <Route exact path="/" render={() =>
              <SelectClient
                clients={this.state.clients}
                setSelectedClient={this.setSelectedClient}
              />
            } />
          } */}

          <Route exact path="/" render={() =>
            <SelectClient
              clients={this.state.clients}
              setSelectedClient={this.setSelectedClient}
            />
          } />


          <Route path="/shifts/select" render={(props) =>
            <SelectShift
              selectedTempClient={this.state.selectedTempClient}
              history={props.history}
              handleAddShiftByTimer={this.handleAddShiftByTimer}
            />
          } />

          <Route path="/clients/add" render={() =>
            <AddClient
              handleAddClient={this.handleAddClient}
            />
          } />

          <Route path="/shifts/form" render={(props) =>
            <ShiftForm
              handleAddShift={this.handleAddShift}
              selectedTempClient={this.state.selectedTempClient}
              clients={this.state.clients}
              history={props.history}
            />
          } />

          <Route path="/shifts/timer" render={() =>
            <ShiftTimer
              status={this.state.stopWatchIsActive}
              runningTime={0}
            />
          } />

          <Route path="/manager/export" render={() =>
            <ExportManager
              data={this.state.shifts}
            />
          } />
        </div>
      </div>
    );
  }
}

export default App;
