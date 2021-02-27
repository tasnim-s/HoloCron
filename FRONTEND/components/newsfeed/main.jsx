import React from 'react';
import CreatePost from '../profilepage/create_post';
import PostsIndex from '../profilepage/posts_index';

export default class Main extends React.Component {
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost } = this.props;

        return (
            <div className="main-container">
                {/* <CreatePost createPostForm={createPostForm}  user={currentUser} />

                <PostsIndex currentUser={currentUser} deletePost={deletePost} user={user} posts={posts} editPost={editPost}/> */}
            </div>
        )
    }
}