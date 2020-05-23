import React from 'react';
import './App.css';
import PostCreate from './components/post-create/post-create.component'
import PostList from './components/post-list/post-list.component'

const App = () => (
  <div className='container'>
    <PostCreate />
    <PostList />
  </div>
)

export default App;
