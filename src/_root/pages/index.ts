/* This way home will not be imported in one line, it will be grouped
    e.g. instead of
     import Home from lalal
     import aka from lalal
    it will be import {Home, aka} from lalal
*/

export { default as Home } from "./Home";
export { default as Explore } from "./Explore";
export { default as AllUsers } from "./AllUsers";
export { default as CreatePost } from "./CreatePost";
export { default as EditPost } from "./EditPost";
export { default as PostDetails } from "./PostDetails";
export { default as Profile } from "./Profile";
export { default as Saved } from "./Saved";
export { default as UpdateProfile } from "./UpdateProfile";
export { default as LikedPosts } from "./LikedPosts";
