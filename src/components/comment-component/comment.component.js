import React, {Fragment, useState, useRef} from 'react';

const ERRORS = {
  user: 'Username Required. Let us know who you are.',
  message: 'Comment Required. Please provide feedback',
  rating: 'Rating Required. How would you rate your game session'
};

export default function CommentComponent() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [user, setUser] = useState('');
  const [session] = useState('test session');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const commentRef = useRef();
  const formRef = useRef();
  const userRef = useRef();

  const handleCommentChange = event => {
    setComment(event.target.value);
  }

  const submit = async event => {
    const data = {
      user: userRef.current.value,
      message: commentRef.current.value,
      rating: rating,
      session: session
    };
    try {
      setLoading(true);
      setSuccess(false);
      const response = await fetch('http://localhost:4000/api/comments', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setComment('');
        setUser('');
        setLoading(false);
        setError(null);
        setSuccess(true);
      }

      if (!response.ok) {
        const error = await response.json();
        if (error) {
          setError(ERRORS[error.field]);
        } else {
          setError('The was an issue posting your comment');
        }
        setSuccess(false);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  const handleCommentKeyDown = event => {
    if (event.metaKey && event.key === "Enter") {
      console.log('pressed enter');
      submit()
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    submit();
  }

  const selectRating = (event) => {
    event.target.className += ' btn-success';
    const value = event.target.value;
    setRating(value);
  }

  return (
    <Fragment>
      <div className="card">
        <div className="card-header">
          <h2>Leave Us A Comment</h2>
        </div>
        <div className="card-body">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                className="form-control" 
                type='text' 
                name="username" 
                value={user} onChange={event => setUser(event.target.value)} 
                ref={userRef}
                placeholder="Username"/>
            </div>
            <div className="form-group">
              <textarea 
                className="form-control"
                ref={commentRef}
                onChange={handleCommentChange}
                onKeyDown={handleCommentKeyDown}
                value={comment}
                placeholder="Tell us about your game session..."/>
            </div>
            <label>How would you rate your session?</label>
            <div className="form-group">
              <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary" value={1} onClick={selectRating}>1</button>
                <button type="button" className="btn btn-secondary" value={2} onClick={selectRating}>2</button>
                <button type="button" className="btn btn-secondary" value={3} onClick={selectRating}>3</button>
                <button type="button" className="btn btn-secondary" value={4} onClick={selectRating}>4</button>
                <button type="button" className="btn btn-secondary" value={5} onClick={selectRating}>5</button>
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary btn-lg">
                {loading && !error? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : 'Comment'}
              </button>
            </div>
            {error ? <div className="text-danger">{error}</div> : null}
            {success ? <div className="text-success">Your comment has been submitted</div> : null}
          </form>
        </div>
      </div>
    </Fragment>
  );
}

