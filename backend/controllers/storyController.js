import asyncHandler from "express-async-handler"
import generateStory from "../utils/generateStoryAi.js"
import Story from "../models/storyModel.js";
const generateStoryController = asyncHandler(async (req,res)=>{
    const {prompt,genre} = req.body
    let data;
        try {
           const response = await generateStory(prompt,genre);
          let story = response[0].generated_text.replace(/\n/g,'')
            data = await Story.create({
            prompt,
            story,
            email:req.user.email,
            name:req.user.name,
            genre
           })
           res.status(201).json(data)
        } catch (error) {
            res.status(400).json({ error: error.message });

        }
      

    
})



const getUserStories = asyncHandler(async(req,res)=>{

    const stories = await Story.find({email:req.user.email})
    if(stories){
        res.status(201).json({stories})
    }
    else{
        res.status(201).json({stories:[]})
    }

})



const getFeedStories = asyncHandler(async(req,res)=>{
    const stories = await Story.find()
    .sort({ createdAt: -1 });
    if(stories){
        res.status(201).json({stories})
    }
    else{
        res.status(201).json({stories:[]})
    }

})


const upvoteStory =asyncHandler(async(req,res)=>{
   const {storyId} = req.body
   
   try {
    const story = await Story.findById(storyId)

    if(!story){
        return res.status(404).json({ error: 'Story not found' });

    }
    if (story.upvotes.includes(req.user._id)) {
        return res.status(400).json({ error: 'You have already upvoted this story' });
      }
      story.upvotes.push(req.user._id);
      await story.save();
  
      res.status(200).json({ message: 'Story upvoted successfully' });
  


   } catch (error) {
    console.error('Error toggling upvote status:', error);
    res.status(500).json({ error: 'Internal server error' });
   }

})


const getLeaderBoard = asyncHandler(async (req,res)=>{
    try {
        const leaderboard = await Story.find()
          .sort({ upvotes: -1 }) 
          .limit(10); 
    
        res.status(200).json(leaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})


export {generateStoryController,getUserStories,getFeedStories,getLeaderBoard,upvoteStory}

