import * as Dialog from "@radix-ui/react-dialog";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";
import { showErrorToast } from "../../../components/ToastNotification";
import { IMAGE_URL } from "../../../secret";

const ReviewModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState({
    ratingMaterial: 0,
    ratingFunction: 0,
    ratingComplementary: 0,
    ratingUsed: 0,
    ratingWorth: 0,
  });

  const handleRatingChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async () => {
    try {
      const totalRating =
        (ratings.ratingMaterial +
          ratings.ratingFunction +
          ratings.ratingComplementary +
          ratings.ratingUsed +
          ratings.ratingWorth) /
        5;

      await onSubmit(product?.id, {
        ...ratings,
        comment,
        totalRating,
      });
      onClose();
    } catch (error) {
      showErrorToast(error);
    }
  };
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed focus:outline-none inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md bg-white p-6 rounded-2xl shadow-xl -translate-x-1/2 -translate-y-1/2 transition-transform z-50">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            # {product?.order?.invoiceNo}
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 text-sm">
            {product?.Product?.name}
          </Dialog.Description>
          <Dialog.Description className="flex flex-col items-center mt-2 text-gray-600">
            <img
              className="w-[250px] h-[250px] object-contain mb-2"
              src={`${IMAGE_URL}/${product?.Product?.ProductImage?.[0]?.url}`}
            />
          </Dialog.Description>
          <div className="mt-4 flex flex-col gap-3">
            {[
              "ratingMaterial",
              "ratingFunction",
              "ratingComplementary",
              "ratingUsed",
              "ratingWorth",
            ].map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex w-56 capitalize text-gray-700">
                  {category.replace("rating", "")}
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={
                      star <= ratings[category]
                        ? "text-yellow-500 cursor-pointer"
                        : "text-gray-300 cursor-pointer"
                    }
                    onClick={() => handleRatingChange(category, star)}
                  />
                ))}
              </div>
            ))}
          </div>
          <textarea
            role="dialog"
            id="radix-:r9:"
            aria-describedby="radix-:rb:"
            aria-labelledby="radix-:ra:"
            data-state="open"
            className="w-full mt-4 p-2 resize-none border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={4}
            placeholder="Write your review here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="mt-5 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition">
                Cancel
              </button>
            </Dialog.Close>
            <button
              className="px-4 py-2 rounded-lg cursor-pointer
                 bg-red-500 hover:bg-red-600 text-white transition"
              onClick={handleSubmit}
              disabled={Object.values(ratings).some((value) => value === 0)}
            >
              Submit
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ReviewModal;
