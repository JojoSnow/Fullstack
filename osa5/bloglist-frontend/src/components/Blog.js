import React, {useState} from 'react'

const Blog = ({blog, addLike}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = {display: visible ? 'none': ''}
	const showWhenVisible = {display: visible ? '' : 'none'}

	const toggleVisibility = () => {
		setVisible(!visible)
	}

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      <p>{blog.title} {blog.author}</p>
      <button onClick={toggleVisibility}>View</button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.title} {blog.author} </p>
      <button onClick={toggleVisibility}>Hide</button>
      <p>{blog.url}</p>
      <p>likes {blog.likes}</p>
      <button onClick={addLike}>Like</button>
      <p>{blog.user.name}</p>
    </div>
    
  </div>  
  )
}

export default Blog