import React from 'react';
import { Router } from '@reach/router';
import CommentComponent from './components/comment-component/comment.component';
import ViewCommentsComponent from './components/view-comments/view-comments.component';
import {Navbar, NavDropdown} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar>
        <NavDropdown title="Routes">
          <NavDropdown.Item href="/">Post A Comment</NavDropdown.Item>
          <NavDropdown.Item href="/comments/view">View Comments</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
      <Router>
        <CommentComponent path="/comments" default/>
        <ViewCommentsComponent path="/comments/view" />
      </Router>
    </div>
  );
}

export default App;
