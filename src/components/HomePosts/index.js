import Cookies from 'js-cookie'
import PostListItem from '../PostListItem'
import './index.css'

const HomePosts = props => {
  const {postData} = props

  const onLikeUnlikePost = async (postId, likeStatus) => {
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const post = {like_status: likeStatus}
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
      method: 'POST',
    }
    await fetch(apiUrl, options)
  }

  return (
    <ul className="post-container">
      {postData.map(eachPost => (
        <PostListItem
          key={eachPost.postId}
          data={eachPost}
          likeUnlike={onLikeUnlikePost}
        />
      ))}
    </ul>
  )
}

export default HomePosts
