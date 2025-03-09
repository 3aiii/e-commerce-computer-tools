import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { AiOutlineDelete } from "react-icons/ai";
import React from "react";

const DeleteModal = ({ onConfirm, product }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="delete-button ">
          <AiOutlineDelete size={20} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md bg-white p-6 rounded-2xl shadow-xl -translate-x-1/2 -translate-y-1/2 transition-transform">
          <AlertDialog.Title className="text-lg font-semibold text-gray-800">
            Confirm Deletion
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-gray-600">
            Are you sure you want to delete{" "}
            <span className="font-medium text-red-500">
              {product?.name || "user"}
            </span>
            ? This action cannot be undone.
          </AlertDialog.Description>
          <div className="mt-5 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="cancel-button">Cancel</button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="delete-button" onClick={onConfirm}>
                Delete
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default DeleteModal;
