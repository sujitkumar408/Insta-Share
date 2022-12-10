import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const MyProfileView = props => {
  const {myProfileDetails} = props
  const {stories, posts} = myProfileDetails

  return (
    <>
      <div className="user-info-container-large">
        <img
          className="user-profile-pic"
          src={myProfileDetails.profilePic}
          alt="my profile"
        />
        <div className="user-bio-container">
          <h1 className="user-name-heading">{myProfileDetails.userName}</h1>
          <div className="user-stats-container">
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.postsCount}
              </span>{' '}
              posts
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.followersCount}
              </span>{' '}
              followers
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.followingCount}
              </span>{' '}
              following
            </p>
          </div>
          <p className="user-id-container">{myProfileDetails.userId}</p>
          <p className="user-quote-container">{myProfileDetails.userBio}</p>
        </div>
      </div>
      <div className="user-info-container-mobile">
        <h1 className="user-name-heading">{myProfileDetails.userName}</h1>

        <div className="user-bio-container-mobile">
          <img
            className="user-profile-pic"
            src={myProfileDetails.profilePic}
            alt="my profile"
          />

          <div className="user-stats-container">
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.postsCount}
              </span>{' '}
              posts
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.followersCount}
              </span>{' '}
              followers
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {myProfileDetails.followingCount}
              </span>{' '}
              following
            </p>
          </div>
        </div>
        <div className="user-bio-container-mobile2">
          <p className="user-id-container">{myProfileDetails.userId}</p>
          <p className="user-quote-container">{myProfileDetails.userBio}</p>
        </div>
      </div>
      <div className="user-story-container">
        <ul className="story-list-container">
          {stories.map(each => (
            <li className="story-item-container" key={each.id}>
              <img
                className="user-story-image"
                src={each.image}
                alt="my story"
              />
            </li>
          ))}
        </ul>
      </div>
      <hr className="horizontal-line" />
      <div className="user-posts-container">
        <div className="post-heading-container">
          <BsGrid3X3 className="grid-icon" />
          <h1 className="grid-icon-label">Posts</h1>
        </div>
        {posts.length > 0 ? (
          <ul className="post-list-container">
            {posts.map(each => (
              <li className="post-item-container" key={each.id}>
                <img
                  className="user-post-image"
                  src={each.image}
                  alt="my post"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-posts-view">
            <BiCamera className="no-posts-image" />
            <h1 className="no-posts-heading">No Posts</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default MyProfileView
