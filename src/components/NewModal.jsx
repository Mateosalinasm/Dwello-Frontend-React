import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function FormModal({ showModal, onClose, onAddNewDwelling, onSubmit }) {
  const [features, setFeatures] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();

    const newProperty = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      options: event.target.options.value,
      features: event.target.feature.value
        .split(",")
        .map((feature) => feature.trim()),
      imageSrc: event.target.imageSrc.value,
      propertyImages: event.target.propertyImages.value
        .split(",")
        .map((image) => image.trim()),
    };

    try {
      const response = await axios.post(
        "https://dwello-backend.vercel.app/dwellings",
        newProperty, // Pass newProperty as the second argument
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      event.target.reset();
      onAddNewDwelling(response.data.data);
      onSubmit();
      onClose();
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 items-center justify-center text-2xl font-semibold text-amber-500 ">
                    <h1>New Dwelling</h1>
                  </div>
                  <form
                    method="POST"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Rate per night
                      </label>
                      <div className="mt-2">
                        <input
                          id="price"
                          name="price"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="description"
                          name="description"
                          rows={2}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="options"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bed | Baths
                      </label>
                      <div className="mt-2">
                        <input
                          id="options"
                          name="options"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="imageSrc"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Main Image
                      </label>
                      <div className="mt-2">
                        <input
                          id="imageSrc"
                          name="imageSrc"
                          type="text"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="propertyImages"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Images
                      </label>
                      <div className="mt-2">
                        <input
                          id="propertyImages"
                          name="propertyImages"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        {propertyImages.map((image, index) => (
                          <p key={index}>{image}</p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="feature"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Features
                      </label>
                      <div className="mt-2">
                        <input
                          id="feature"
                          name="feature"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div>
                        {features.map((feature, index) => (
                          <p key={index}>{feature}</p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
