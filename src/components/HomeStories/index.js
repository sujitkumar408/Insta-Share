import {Link} from 'react-router-dom'
import Slider from 'react-slick'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}

const HomeStories = props => {
  const {homeStories} = props

  return (
    <div className="stories-container">
      <div className="slick-container">
        <Slider {...settings}>
          {homeStories.map(each => {
            const {userId, userName, storyUrl} = each
            return (
              <div className="stories-slick-item" key={userId}>
                <Link to={`/users/${userId}`}>
                  <img
                    className="stories-logo-image"
                    src={storyUrl}
                    alt="user story"
                  />
                </Link>
                <p className="story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}
export default HomeStories
