Holocron
======

HoloCron, a Facebook clone, is a social media application that allows users to post content which can be viewed by other users as well as building a personalized profile to display their posts that other users can follow.

[Live Site](https://holo-cron.herokuapp.com/)

## Technologies Used

### Backend
* PosgreSQL
* Ruby on Rails

### Frontend
* Javascript
* React
* Redux
* HTML/SCSS

### Asset Management
* AWS S3

## Features

### User Authentication

* Users can securely signup, login, and logout to their individualized experience.
* Demo Login for fast and easy access.

![Login-Page](https://github.com/tasnim-s/GitHubImages/blob/main/Login%20Page.png)

### Profile Pages

* Users can create a customized profile to let others know more about them.
* Users can post content to their page about anything on their mind for friends to see.

![Profile-Page](https://github.com/tasnim-s/GitHubImages/blob/main/Profile-Page.png)

### Friending

* Users can friend other uses to connect and see each others content on their newsfeed
* Users can accept friend requests or decline them.

![Friends-Page](https://github.com/tasnim-s/GitHubImages/blob/main/Friends-Page.png)

### Posts and Comments and Likes

* Users can post on their walls or on their friends walls
* Users can comment on their posts and their friends posts
* Users can comment on comments
* Usrs can like postsa and comments to show support

![Posts-Comments](https://github.com/tasnim-s/GitHubImages/blob/main/Posts-Comments.png)

## Challenges and Solutions

* Friend requests are dually linked on creation so both users will have the other added to their friends list. On unfriending, both connections are destroyed.

![Friending-Code](https://github.com/tasnim-s/GitHubImages/blob/main/Friending-Code.png)

* Asynchronously sets loading animation to allow for backend service requests to fetch data before populating pages such as newsfeed and profile page. 

![Async](https://github.com/tasnim-s/GitHubImages/blob/main/Async.png)

* Dynamically populated form data to allow users to edit profile pages with or without profile pics or cover photos as well as showing preview for users to see before uploading. Utilized AWS for user uploads and storage.

![Form-Data](https://github.com/tasnim-s/GitHubImages/blob/main/Form-Data.png)