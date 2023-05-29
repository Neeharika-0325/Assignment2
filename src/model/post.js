const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    image: {type: String, required: true},
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true}
});

module.exports = mongoose.model('Post', postSchema);

// YourModel.findOne({}).populate('user').exec(function(err, doc) {
//     if (err) {
//       // Handle error
//     } else {
//       console.log(doc.userName); // Access the user's name
//       console.log(doc.user); // Access the full user object
//     }
//   });
  
// YourModel.findOne({}).populate('user', 'name').exec(function(err, doc) {
//     if (err) {
//       // Handle error
//     } else {
//       console.log(doc.user.name); // Access the user's name
//       console.log(doc.user); // Access the full user object with other fields
//     }
//   });


// app.get('/endpoint', (req, res) => {
//     YourModel.findOne({})
//       .populate('user', 'postname')
//       .exec((err, doc) => {
//         if (err) {
//           // Handle error
//           res.status(500).json({ error: 'Internal server error' });
//         } else {
//           // Access the populated document
//           res.json(doc);
//         }
//       });
//   });
  