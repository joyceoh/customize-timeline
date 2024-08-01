import React, { useState, useEffect } from 'react';
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

//template function for comments
const commentTemplate = (fetcheddata) => {
  return (
    <div className='commentLayout'>
        <div className='userInfo'>
        <span className='user'>${fetcheddata.ign}</span><span className='date'>${fetcheddata.created_at}</span>
        </div>
          <p>
            ${fetcheddata.text_body}
          </p> 
          {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
        </div>
  )
}

function comments() {

  //useState for comments
  const [comments, setComments] = useState()
  const [newcomment, SetComments] = useState()

  //fetch request for comments
  const commentsFetch = () => {
    fetch('/comments')
    .then( res => {
      if (!res.ok) {
        throw new Error(`HTTP error. Status: ${res.status}`);
      }
      return res.json()
    })
    .then( comments => setComments(comments.map(x => commentTemplate(x))) )
    .catch(err => {
      console.error('Comments Data fetch: ERROR: ', err);
    });
  }

  //post new comment to the database
  function postNewComment() {
    const body = {}
    body.topic = formData.get('topic');
    body.text = formData.get('text');
    console.log(body)
    fetch('/comments', {
      method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
      body: JSON.stringify(body)
    })
  .then(data => data.json())
  .then(data => console.log('data: ', data))
  }

  return(
    <section className='afterArcus comments'>
      <button onClick={commentsFetch}>Load More Comments</button>
      <form className='newComment'>
      {/* drop down menu of topics */}
      <input name='topic'></input>
      <textarea rows={3} cols={60} name='text'></textarea><button onSubmit={postNewComment}>Send</button>
      </form>
      {comments}
        <div className='commentLayout'>
        <div className='userInfo'>
        <span className='user'>User4</span><span className='date'>Aug. 25, 2022</span>
        </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse odio ut est iste doloribus incidunt quaerat nulla qui, porro eum vero commodi vitae. Deserunt modi maxime aperiam perferendis quasi.
          </p> 
          {/* <FontAwesomeIcon icon="fa-thin fa-heart" /> */}
        </div>

        <div className='commentLayout'>
        <div className='userInfo'>
        <span className='user'>User4</span><span className='date'>Aug. 15, 2022</span>
        </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse odio ut est iste doloribus incidunt quaerat nulla qui, porro eum vero commodi vitae. Deserunt modi maxime aperiam perferendis quasi.
          </p> 
        </div>

        <div className='commentLayout'>
        <div className='userInfo'>
        <span className='user'>User4</span><span className='date'>Aug. 2, 2022</span>
        </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse odio ut est iste doloribus incidunt quaerat nulla qui, porro eum vero commodi vitae. Deserunt modi maxime aperiam perferendis quasi.
          </p> 
        </div>
    </section>
  )
}

export default comments