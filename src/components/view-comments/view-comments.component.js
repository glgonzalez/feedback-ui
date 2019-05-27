import React, { useState, useEffect, Fragment } from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';

export default function ViewCommentsComponent () {
  const [commentFeed, setCommentFeed] = useState([]);
  const [rating, setRating] = useState(null);


  useEffect(() => {
    const url = rating && rating !== 'all' ? `/comments/rating/${rating}` : '/comments';
    fetch(`http://localhost:4000/api${url}`).then(async response => {
      setCommentFeed(await response.json());
    }).catch(err => {
      throw new Error(err);
    });

    return () => {};
  }, [rating]);



  const formatDate = (date) => {
    const options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: true
    };
    const newDate = Intl.DateTimeFormat('en-US', options).format(new Date(date));
    return newDate;
  }

  const filterByRating = (event) => {
    setRating(event.target.value);
  }

  return (
    <Fragment>
      <DropdownButton title="Filter By Rating" variant="secondary">
        <Dropdown.Item as="button" value={'all'} onClick={filterByRating}>All</Dropdown.Item>
        <Dropdown.Item as="button" value={1} onClick={filterByRating}>1</Dropdown.Item>
        <Dropdown.Item as="button" value={2} onClick={filterByRating}>2</Dropdown.Item>
        <Dropdown.Item as="button" value={3} onClick={filterByRating}>3</Dropdown.Item>
        <Dropdown.Item as="button" value={4} onClick={filterByRating}>4</Dropdown.Item>
        <Dropdown.Item as="button" value={5} onClick={filterByRating}>5</Dropdown.Item>
      </DropdownButton>
      <div className="list-group">
        {commentFeed && commentFeed.length > 0 ? commentFeed.map((comment) => {
          comment.date = formatDate(comment.date);
          return (
            <div className="list-group-item" key={comment._id}>
              <div className="d-flex w-100 justify-content-between">
                <h4 className="mb-1">{comment.user}</h4>
                <small>{comment.date}</small>
              </div>
              <p className="mb-1">{comment.message}</p>
              <small>{`Rating: ${comment.rating}/5`}</small>
            </div>
          );
        }): "No Comments available"}
      </div>
    </Fragment>
  );
}