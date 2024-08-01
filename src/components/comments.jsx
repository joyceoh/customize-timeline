import React from 'react';

const mockDate = Date.now()

function comments() {
  //fetch request for comments
  return(
    <section className='afterArcus comments'>
      <div className='newComment'>
      <textarea></textarea><button>Send</button>
      </div>
        <div className='commentLayout'>
        <div className='userInfo'>
        <span className='user'>User4</span><span className='date'>Aug. 25, 2022</span>
        </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse odio ut est iste doloribus incidunt quaerat nulla qui, porro eum vero commodi vitae. Deserunt modi maxime aperiam perferendis quasi.
          </p> 
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