import Review from "../models/review.model.js";
import Gig from "../models/gigs.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(
      createError(403, "Sellers are not alowed to review themselves!!")
    );

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.userId,
    desc: req.body.desc,
    star: req.body.star,
  });
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(
        createError(403, "You have already created a review for this gig")
      );

    const savedGig = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: {
        totalStars: req.body.star,
        starNumber: 1,
      },
    });
    res.status(201).send(savedGig);
  } catch (error) {
    next(error);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.boddy.gigId });
    res.status(201).send(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
