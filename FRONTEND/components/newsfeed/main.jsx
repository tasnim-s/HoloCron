import React from 'react';
import CreatePost from '../profilepage/create_post';
import NewsfeedPosts from './newsfeed_posts';
import Spinner from '../loading/spinner';

export default class Main extends React.Component {
    
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost } = this.props;

        return !posts ? <Spinner /> : (
            <div className="main-container">
                <CreatePost createPostForm={createPostForm}  user={currentUser} />

                <NewsfeedPosts currentUser={currentUser} deletePost={deletePost} posts={posts} editPost={editPost}/>
            </div>
        )
    }
}