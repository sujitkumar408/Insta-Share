import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649335217/InstaShare/not-found-image_dnvtsw.png"
      alt="page not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
