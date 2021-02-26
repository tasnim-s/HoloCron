import React from 'react';
import CreatePost from '../profilepage/create_post';
import UserPostsContainer from '../profilepage/user_posts_container';

export default class Main extends React.Component {
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost } = this.props;

        return (
            <div className="main-container">
                <CreatePost createPostForm={createPostForm}  user={user} />

                <PostsIndex currentUser={currentUser} deletePost={deletePost} user={user} posts={posts} editPost={editPost}/>
            </div>
        )
    }
}