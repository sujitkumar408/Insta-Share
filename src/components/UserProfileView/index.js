import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const UserProfileView = props => {
  const {userDetails} = props
  const {stories, posts} = userDetails

  return (
    <>
      <div className="user-info-container-mobile">
        <h1 className="user-name-heading">{userDetails.userName}</h1>

        <div className="user-bio-container-mobile">
          <img
            className="user-profile-pic"
            src={userDetails.profilePic}
            alt="user profile"
          />
          <div className="user-stats-container">
            <p className="stat-container">
              <span className="stat-variable">{userDetails.postsCount}</span>{' '}
              posts
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {userDetails.followersCount}
              </span>{' '}
              followers
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {userDetails.followingCount}
              </span>{' '}
              following
            </p>
          </div>
        </div>
        <div className="user-bio-container-mobile2">
          <p className="user-id-container">{userDetails.userId}</p>
          <p className="user-quote-container">{userDetails.userBio}</p>
        </div>
      </div>
      <div className="user-info-container">
        <img
          className="user-profile-pic"
          src={userDetails.profilePic}
          alt="user profile"
        />
        <div className="user-bio-container">
          <h1 className="user-name-heading">{userDetails.userName}</h1>
          <div className="user-stats-container">
            <p className="stat-container">
              <span className="stat-variable">{userDetails.postsCount}</span>{' '}
              posts
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {userDetails.followersCount}
              </span>{' '}
              followers
            </p>
            <p className="stat-container">
              <span className="stat-variable">
                {userDetails.followingCount}
              </span>{' '}
              following
            </p>
          </div>
          <p className="user-id-container">{userDetails.userId}</p>
          <p className="user-quote-container">{userDetails.userBio}</p>
        </div>
      </div>
      <div className="user-story-container">
        <ul className="story-list-container">
          {stories.map(each => (
            <li className="story-item-container" key={each.id}>
              <img
                className="user-story-image"
                src={each.image}
                alt="user story"
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
                  alt="user post"
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

export default UserProfileView
