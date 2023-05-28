import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
   //25-27  we save the post beacuse ofwe want our new post added
    //26 we are storinf the find of Post and store in post
    //27 we then return this constpost as response becuae it is now having your current post 



/* READ */
export const getFeedPosts = async (req, res) => {
   try {
     const posts = await Post.find().then(console.log(posts))
     res.status(200).json(posts);
     
   } catch (err) {
      console.log({ message: err.message })
     res.status(404).json({ message: err.message });
   }
 };
 
 

 export const  getUserPosts= async(req ,res)=>{

try {
   const {userId} = req.params
   const post = await Post.findOne({userId})

   res.status(200).json(post)
} catch (err) {
   res.status(404).json({ message: err.message });
}

 }

 /* UPDATE */

 export const likePost = async () =>{
try {
   const {userId} = req.body
const {id} = req.params

const post =  await Post.findById(userId)
const isLiked = post.like.get(userId)

isLiked ? post.like.delete(userId) : post.like.set(userId, true);

const updatedPost = await post.findByIdAndUpdate(id , {likes:post.likes } , {new:true}) //new true

res.status(200).json(updatedPost) // we need to enesure that our frontend is getting the right response  
} catch (err) {
   res.status(404).json({ message: err.message });

}

 }

 