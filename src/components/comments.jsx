import React, { useState, useEffect } from 'react';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//template function for comments
const CommentTemplate = (fetcheddata) => {
  return (
    <div className='commentLayout'>
        <div className='userInfo' key={fetcheddata.id}>
        <span className='user'>{fetcheddata.ign}</span><span className='date'>{fetcheddata.created_at}</span>
        </div>
          <p>
            {fetcheddata.text_body}
          </p> 
          {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
        </div>
  )
}

function comments() {

  //useState for comments
  const [comments, setComments] = useState()
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');

  //fetch request for comments
  const commentsFetch = () => {
    fetch('/comments')
    .then( res => {
      if (!res.ok) {
        throw new Error(`HTTP error. Status: ${res.status}`);
      }
      return res.json()
    })
    .then( comments => setComments(comments.map((x) => CommentTemplate(x))) )
    .catch(err => {
      console.error('Comments Data fetch: ERROR: ', err);
    });
  }

  //post new comment to the database
  const postNewComment = (event) => {
    
    event.preventDefault()
      const body = {
        topic,
        text,
        user: '3329433b-0ad2-46b9-b2a9-443c24e63d2b'
      }
    console.log('newcomment', newcomment)
    fetch('/comments', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    })
  .then(data => data.json())
  .then(data => {
    console.log('data: ', data)
    setTopic('');
    setText('');
    commentsFetch();
    })
  .catch(err => 'Error in making new comment. ', err)
  }

  return(
    <section className='afterArcus comments'>
      <button onClick={commentsFetch}>Load More Comments</button>
      {/* new comments */}
      <form className='newComment'>
      {/* drop down menu of topics */}
      <div className='textbox'>
      <label>Comment Topic:
      <input 
        name='topic'
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      </label>
      <textarea rows={3} cols={60} 
        name='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      </div>
      <button onSubmit={postNewComment} formMethod='post' formAction='/comments'>Send</button>
      {/* formMethod='post' */}
      </form>
        {comments}
    </section>
  )
}

export default comments