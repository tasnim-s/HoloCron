import React from 'react';
import CreatePost from '../profilepage/create_post';
import NewsfeedPosts from './newsfeed_posts';

export default class Main extends React.Component {
    
    render() {
        const { posts, currentUser, createPostForm, deletePost, editPost, addLike, removeLike, createComment, editComment, deleteComment, users } = this.props;

        return (
            <div className="main-container">
                <CreatePost createPostForm={createPostForm}  user={currentUser} currentUser={currentUser}/>

                <NewsfeedPosts currentUser={currentUser} deletePost={deletePost} posts={posts} editPost={editPost} addLike={addLike} removeLike={removeLike} createComment={createComment} editComment={editComment} deleteComment={deleteComment} users={users} />
            </div>
        )
    }
}