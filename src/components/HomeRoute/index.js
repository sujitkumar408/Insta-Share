import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import HomePosts from '../HomePosts'
import HomeStories from '../HomeStories'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    homeStories: [],
    storiesApiStatus: apiStatusConstants.initial,
    homePosts: [],
    postsApiStatus: apiStatusConstants.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getStories()
    this.getPosts()
  }

  getStories = async () => {
    this.setState({storiesApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      this.setState({
        homeStories: updatedData,
        storiesApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({storiesApiStatus: apiStatusConstants.failure})
    }
  }

  getPosts = async () => {
    this.setState({postsApiStatus: apiStatusConstants.inProgress})

    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachPostComments => ({
          userName: eachPostComments.user_name,
          userId: eachPostComments.user_id,
          comment: eachPostComments.comment,
        })),
        postId: eachPost.post_id,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        profilePic: eachPost.profile_pic,
        imageUrl: eachPost.post_details.image_url,
        caption: eachPost.post_details.caption,
        likesCount: eachPost.likes_count,
        createdAt: eachPost.created_at,
      }))
      this.setState({
        homePosts: updatedData,
        postsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({postsApiStatus: apiStatusConstants.failure})
    }
  }

  onSearchCaption = search => {
    this.setState({searchInput: search}, this.getPosts)
  }

  renderStoriesView = () => {
    const {homeStories} = this.state
    return <HomeStories homeStories={homeStories} />
  }

  renderPostsView = () => {
    const {homePosts, searchInput} = this.state

    return (
      <div>
        {searchInput !== '' && <h1>Search Results</h1>}
        <HomePosts postData={homePosts} />
      </div>
    )
  }

  onRetryStory = () => {
    this.setState(
      {storiesApiStatus: apiStatusConstants.inProgress},
      this.getStories,
    )
  }

  onRetryPost = () => {
    this.setState(
      {postsApiStatus: apiStatusConstants.inProgress},
      this.getPosts,
    )
  }

  renderStoriesFailureView = () => (
    <div className="failure-story-container">
      <img
        src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649236849/InstaShare/failure-image_vrquv4.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryStory}
      >
        Try again
      </button>
    </div>
  )

  renderPostsFailureView = () => (
    <div className="failure-post-container">
      <img
        src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649236849/InstaShare/failure-image_vrquv4.png"
        alt="failure view"
        className="api-failure-img"
      />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        className="failure-button"
        type="button"
        onClick={this.onRetryPost}
      >
        Try again
      </button>
    </div>
  )

  renderStoriesLoadingView = () => (
    <div className="stories-loader-container" testid="loader">
      <Loader
        testid="loader"
        type="TailSpin"
        color="#4094EF"
        height={50}
        width={50}
      />
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

  renderNoSearchResultsView = () => {
    const {homePosts, searchInput} = this.state
    if (homePosts.length === 0 && searchInput !== '') {
      return (
        <div className="zero-search-result">
          <img
            src="https://res.cloudinary.com/dba1mklgz/image/upload/v1649240642/InstaShare/search-not-found_t8kwro.png"
            alt="search not found"
          />
          <h1>Search Not Found</h1>
          <p>Try different keyword or search again</p>
        </div>
      )
    }
    return null
  }

  renderHomeStories = () => {
    const {storiesApiStatus} = this.state

    switch (storiesApiStatus) {
      case apiStatusConstants.success:
        return this.renderStoriesView()
      case apiStatusConstants.failure:
        return this.renderStoriesFailureView()
      case apiStatusConstants.inProgress:
        return this.renderStoriesLoadingView()
      default:
        return null
    }
  }

  renderHomePosts = () => {
    const {postsApiStatus} = this.state

    switch (postsApiStatus) {
      case apiStatusConstants.success:
        return this.renderPostsView()
      case apiStatusConstants.failure:
        return this.renderPostsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header onSearchCaption={this.onSearchCaption} />
        {this.renderHomeStories()}
        <div className="HomePageContainer">{this.renderHomePosts()}</div>
        <div>{this.renderNoSearchResultsView()}</div>
      </>
    )
  }
}

export default HomeRoute
