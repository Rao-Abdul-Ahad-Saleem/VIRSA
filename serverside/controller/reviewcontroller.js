// Adding a Review
// When a user reviews a product:

// Review is created in the Review collection with references to the user (userId) and product (productId).
// The productId and userId ensure the review is linked to both the product and the user.
// The reviews array in the Product document is updated with the review's ID.

// const addReview = async (userId, productId, rating, comment) => {
//     const review = new Review({ userId, productId, rating, comment });
//     await review.save(); // Save the review

//     // Link the review to the product
//     await Product.findByIdAndUpdate(productId, {
//         $push: { reviews: review._id },
//     });

//     console.log("Review added successfully!");
// };

