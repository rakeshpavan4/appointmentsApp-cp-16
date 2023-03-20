// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formatteddate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatteddate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachContact => {
        if (id === eachContact.id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  starredButton = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  getfilterdlist = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isFavorite === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterdlist = this.getfilterdlist()
    return (
      <div className="bg-container">
        <div className="container">
          <h1>Add Appointment</h1>
          <div className="appointment-input">
            <form className="input-container" onSubmit={this.onAddAppointment}>
              <label htmlFor="title">TITLE</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={titleInput}
              />

              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                onChange={this.onChangeDate}
                value={dateInput}
              />

              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="
https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>
          <hr className="line" />
          <div className="appointments-container">
            <h1 className="appointments-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.starredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filterdlist.map(eachApp => (
              <AppointmentItem
                details={eachApp}
                key={eachApp.id}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
