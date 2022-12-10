import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserProfileView from '../UserProfileView'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    userDetails: [],
  }

  componentDidMount() {
    this.getUserDetails()
  }

  formattedData = data => ({
    id: data.user_details.id,
    userId: data.user_details.user_id,
    userName: data.user_details.user_name,
    profilePic: data.user_details.profile_pic,
    followersCount: data.user_details.followers_count,
    followingCount: data.user_details.following_count,
    userBio: data.user_details.user_bio,
    postsCount: data.user_details.posts_count,
    posts: data.user_details.posts.map(eachPost => ({
      id: eachPost.id,
      image: eachPost.image,
    })),
    stories: data.user_details.stories.map(eachStory => ({
      id: eachStory.id,
      image: eachStory.image,
    })),
  })

  getUserDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = this.formattedData(data)
      this.setState({
        userDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserProfileView = () => {
    const {userDetails} = this.state
    return <UserProfileView userDetails={userDetails} />
  }

  onRetry = () => {
    this.getUserDetails()
  }

  renderUserProfileFailureView = () => (
    <div className="failure-story-container">
      <img
        src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649236849/InstaShare/failure-image_vrquv4.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
    </div>
  )

  renderUserDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfileView()
      case apiStatusConstants.failure:
        return this.renderUserProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderUserDetailsView()}</div>
      </>
    )
  }
}

export default UserProfile
