import React, { useState, useEffect } from 'react';
// We'll implement this using emojis instead of FontAwesome to keep it simple
// but you can add FontAwesome later if you want

// Template function for comments with improved styling
const CommentTemplate = (fetcheddata) => {
  // Format date for better display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return dateString; // Return original if not valid
    }
    
    const timeAgo = getTimeAgo(date);
    return timeAgo;
  };
  
  // Calculate time ago
  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 30) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    } else if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Get user's icon based on their name - a simple avatar placeholder
  const getUserInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };
  
  // Detect if comment is about a specific health topic
  const getTopicEmoji = (text) => {
    const lowercaseText = text.toLowerCase();
    
    if (lowercaseText.includes('diagnosis') || lowercaseText.includes('diagnosed')) {
      return '🔍';
    } else if (lowercaseText.includes('treatment') || lowercaseText.includes('therapy') || lowercaseText.includes('chemo')) {
      return '💊';
    } else if (lowercaseText.includes('surgery')) {
      return '🏥';
    } else if (lowercaseText.includes('milestone') || lowercaseText.includes('progress')) {
      return '🏆';
    } else if (lowercaseText.includes('test') || lowercaseText.includes('scan') || lowercaseText.includes('checkup')) {
      return '🔬';
    } else if (lowercaseText.includes('recovery')) {
      return '🌱';
    }
    
    return '💬';
  };
  
  const emoji = getTopicEmoji(fetcheddata.text_body);
  
  return (
    <div className='commentLayout' key={fetcheddata.id}>
      <div className='userInfo'>
        <div className='user-with-avatar'>
          <div className='avatar'>{getUserInitial(fetcheddata.ign)}</div>
          <span className='user'>{fetcheddata.ign}</span>
          <span className='topic-emoji'>{emoji}</span>
        </div>
        <span className='date'>{formatDate(fetcheddata.created_at)}</span>
      </div>
      <p>
        {fetcheddata.text_body}
      </p>
      <div className='comment-actions'>
        <button className='action-button'>❤️ Support</button>
        <button className='action-button'>💬 Reply</button>
      </div>
    </div>
  );
};

function Comments() {
  // useState for comments
  const [comments, setComments] = useState([]);
  const [topic, setTopic] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Topics for dropdown
  const topics = [
    { value: '', label: 'Select a topic (optional)' },
    { value: 'general', label: 'General Discussion' },
    { value: 'treatment', label: 'Treatment Experiences' },
    { value: 'diagnosis', label: 'Diagnosis Support' },
    { value: 'recovery', label: 'Recovery Journey' },
    { value: 'milestone', label: 'Milestones & Celebrations' },
    { value: 'question', label: 'Questions & Advice' },
  ];

  // Fetch request for comments
  const commentsFetch = () => {
    setLoading(true);
    setError(null);
    
    fetch('/comments')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error. Status: ${res.status}`);
        }
        return res.json();
      })
      .then(commentsData => {
        setComments(commentsData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Comments Data fetch: ERROR: ', err);
        setError('Failed to load comments. Please try again.');
        setLoading(false);
      });
  };

  // Load comments on component mount
  useEffect(() => {
    commentsFetch();
  }, []);

  // Post new comment to the database
  const postNewComment = (event) => {
    event.preventDefault();
    
    if (!text.trim()) {
      setError('Please enter a comment before sending.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    const body = {
      topic,
      text,
      user: '3329433b-0ad2-46b9-b2a9-443c24e63d2b'
    };
    
    fetch('/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(data => data.json())
      .then(data => {
        console.log('Comment added:', data);
        setTopic('');
        setText('');
        commentsFetch();
        setLoading(false);
      })
      .catch(err => {
        console.error('Error in making new comment:', err);
        setError('Failed to add your comment. Please try again.');
        setLoading(false);
      });
  };

  return (
    <section className='afterArcus comments'>
      <h3>Community Support</h3>
      <p className="description">
        Share your experiences, ask questions, and connect with others on similar health journeys.
      </p>
      
      {/* New comment form */}
      <form className='newComment' onSubmit={postNewComment}>
        <div className='textbox'>
          <label>
            Topic:
            <select 
              name='topic'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics.map(topic => (
                <option key={topic.value} value={topic.value}>{topic.label}</option>
              ))}
            </select>
          </label>
          
          <textarea 
            placeholder="Share your thoughts, experiences, or questions with the community..."
            rows={3} 
            name='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          {error && <div className="error-message">{error}</div>}
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className={`success ${loading ? "loading" : ""}`}
        >
          {loading ? "Sending..." : "Share"}
        </button>
      </form>
      
      {/* Comments display */}
      <div className="comments-container">
        {loading && !comments.length ? (
          <div className="loading-message">Loading comments...</div>
        ) : (
          <>
            {comments.length === 0 ? (
              <div className="no-comments">
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              <>
                {comments.map(commentData => CommentTemplate(commentData))}
                
                <button 
                  onClick={commentsFetch} 
                  disabled={loading}
                  className="secondary load-more"
                >
                  {loading ? "Loading..." : "Refresh Comments"}
                </button>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Comments;