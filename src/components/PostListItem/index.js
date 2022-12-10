import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'
import {useState} from 'react'

import {Link} from 'react-router-dom'

import './index.css'

const PostListItem = props => {
  const {data, likeUnlike} = props
  const {
    userId,
    postId,
    userName,
    profilePic,
    caption,
    imageUrl,
    likesCount,
    comments,
    createdAt,
  } = data

  const [likeStatus, setLikeStatus] = useState(false)
  const [likesCountstate, setlikesCount] = useState(likesCount)

  const changeLikeStatus = () => {
    if (likeStatus) {
      setlikesCount(likesCountstate - 1)
    } else {
      setlikesCount(likesCountstate + 1)
    }
    setLikeStatus(!likeStatus)
    likeUnlike(postId, !likeStatus)
  }

  return (
    <li className="post-list-item">
      <div className="post-name-div">
        <Link to={`/users/${userId}`} className="link">
          <img
            src={profilePic}
            className="post-profile-pic"
            alt="post author profile"
          />
        </Link>
        <Link to={`/users/${userId}`} className="link">
          <span className="post-username">{userName}</span>
        </Link>
      </div>
      <img src={imageUrl} className="post-image" alt="post" />
      <div className="post-content-div">
        <div className="reaction-div">
          {likeStatus ? (
            <button
              className="reaction-button"
              testid="unLikeIcon"
              type="button"
              onClick={changeLikeStatus}
            >
              <FcLike className="react-image" height="20px" width="23.24px" />
            </button>
          ) : (
            <button
              className="reaction-button"
              testid="likeIcon"
              type="button"
              onClick={changeLikeStatus}
            >
              <BsHeart
                className="react-image"
                height="16.87px"
                width="19.83px"
              />
            </button>
          )}
          <button className="reaction-button" type="button">
            <FaRegComment
              className="react-image"
              height="19.39px"
              width="22px"
            />
          </button>
          <button className="reaction-button" type="button">
            <BiShareAlt className="react-image" height="24px" width="24px" />
          </button>
        </div>
        <p className="likes-count">{likesCountstate} likes</p>
        <p className="post-caption">{caption}</p>
        <ul className="post-comments-container">
          {comments.map(eachComment => (
            <li className="comment" key={eachComment.userId}>
              <p className="com">
                <Link to={`/users/${eachComment.userId}`} className="link">
                  <span className="comment-name">{eachComment.userName}</span>
                </Link>
                {eachComment.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostListItem
