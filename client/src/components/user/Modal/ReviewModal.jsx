import React, { useState } from "react";

export const Button = ({ children, onClick, variant = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md ${
        variant === "outline"
          ? "border border-gray-500 text-gray-500"
          : "bg-blue-500 text-white"
      }`}
    >
      {children}
    </button>
  );
};

const ReviewModal = ({ products, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(
    products.map((product) => ({
      productId: product.id,
      comment: "",
      ratingMaterial: 1,
      ratingFunction: 1,
      ratingComplementary: 1,
      ratingUsed: 1,
      ratingWorth: 1,
    }))
  );

  const handleChange = (index, field, value) => {
    const updatedForm = [...formData];
    updatedForm[index][field] = value;
    setFormData(updatedForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Leave a Review</Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
            <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
            <form onSubmit={handleSubmit}>
              {products.map((product, index) => (
                <div key={product.id} className="mb-4 border p-4 rounded-lg">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <textarea
                    value={formData[index].comment}
                    onChange={(e) =>
                      handleChange(index, "comment", e.target.value)
                    }
                    placeholder="Write your comment"
                    className="w-full p-2 border rounded-md"
                  />
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Material",
                      "Function",
                      "Complementary",
                      "Used",
                      "Worth",
                    ].map((field) => (
                      <label key={field} className="flex flex-col">
                        {field} Rating
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={formData[index][`rating${field}`]}
                          onChange={(e) =>
                            handleChange(
                              index,
                              `rating${field}`,
                              Number(e.target.value)
                            )
                          }
                          className="p-1 border rounded-md"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewModal;
