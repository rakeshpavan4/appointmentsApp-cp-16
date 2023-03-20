// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {details, toggleIsFavorite} = props
  const {title, date, id, isFavorite} = details
  const onstarClicked = () => {
    toggleIsFavorite(id)
  }

  const starImgurl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="appointment-data">
        <p>{title}</p>
        <button type="button" data-testid="star" onClick={onstarClicked}>
          <img src={starImgurl} alt="star" />
        </button>
      </div>
      <p>Date {date} </p>
    </li>
  )
}

export default AppointmentItem
