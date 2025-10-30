import { Dispatch, FC, SetStateAction } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";

type Props = {
  isOpen: boolean;
  ratingValue: number | null;
  setRatingValue: Dispatch<SetStateAction<number | null>>;
  ratingText: string;
  setRatingText: Dispatch<SetStateAction<string>>;
  reviewSubmitHandler: () => Promise<string | undefined>;
  isSubmittingReview: boolean;
  toggleRatingModal: () => void;
};

const RatingModal: FC<Props> = (props) => {
  const {
    isOpen,
    ratingValue,
    setRatingValue,
    ratingText,
    setRatingText,
    reviewSubmitHandler,
    isSubmittingReview,
    toggleRatingModal,
  } = props;

  const starValues = [1, 2, 3, 4, 5];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Enhanced Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleRatingModal}
      />

      {/* Modal Container */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <BsStarFill className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Share Your Experience
              </h2>
              <p className="text-gray-600 text-sm mt-1">How was your stay?</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rating Stars */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-4 text-center">
              Tap to rate your stay
            </label>
            <div className="flex justify-center gap-1 mb-2">
              {starValues.map((value) => (
                <button
                  className={`transition-all duration-200 transform hover:scale-110 active:scale-95 ${
                    ratingValue && value <= ratingValue
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                  onClick={() => setRatingValue(value)}
                  key={value}
                  disabled={isSubmittingReview}
                >
                  {ratingValue && value <= ratingValue ? (
                    <BsStarFill className="w-10 h-10 drop-shadow-sm" />
                  ) : (
                    <BsStar className="w-10 h-10" />
                  )}
                </button>
              ))}
            </div>
            <div className="text-center">
              {ratingValue && (
                <p className="text-sm text-gray-600 mt-2">
                  {ratingValue === 1 && "Poor"}
                  {ratingValue === 2 && "Fair"}
                  {ratingValue === 3 && "Good"}
                  {ratingValue === 4 && "Very Good"}
                  {ratingValue === 5 && "Excellent"}
                </p>
              )}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              Your Review{" "}
              {ratingText.length > 0 && (
                <span className="text-gray-500 font-normal text-xs">
                  ({ratingText.length}/500)
                </span>
              )}
            </label>
            <textarea
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value.slice(0, 500))}
              rows={4}
              placeholder="Share details of your own experience at this property..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none transition-all duration-200 placeholder-gray-400"
              disabled={isSubmittingReview}
            />
            {ratingText.length >= 450 && (
              <p className="text-xs text-orange-600 mt-2">
                {500 - ratingText.length} characters remaining
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={toggleRatingModal}
              disabled={isSubmittingReview}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={reviewSubmitHandler}
              disabled={
                !ratingValue || !ratingText.trim() || isSubmittingReview
              }
              className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {isSubmittingReview ? (
                <span className="flex items-center justify-center gap-2">
                  <ImSpinner8 className="w-4 h-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>

          {/* Helper Text */}
          <p className="text-xs text-gray-500 text-center mt-3">
            Your review helps other travelers make better decisions
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
