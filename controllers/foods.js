
//===============inputs================//
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

//===============Routes================//
//
router.get('/new', async(req, res) => {
  res.render('foods/new.ejs')
});

// Index Route
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);   
    res.render('foods/index.ejs', {
      foods: currentUser.pantry,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

  // Create Route
router.post('/', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body)
        
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods/`);
      } catch (error) {
        console.log(error);
        res.redirect('/')
      }
    });

    // Delete Route
    router.delete('/:foodsId', async (req, res)=> {
      try{
        const currentUser = await User.findById(req.session.user._id);
        const foodItem = currentUser.pantry.id(req.params.foodsId);
        foodItem.deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
      } catch (error) {
        console.log(error);
        res.redirect('/');
      }
    });
    

  

module.exports = router;