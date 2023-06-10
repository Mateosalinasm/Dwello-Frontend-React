import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import EditFormModal from "./EditModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ParentComponent() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [property, setProperty] = useState({});

  function handleEditButtonClick() {
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  function handleEditDwelling(updatedProperty) {
    setProperty(updatedProperty);
  }

  return (
    <div>
      <DotMenu onEditButtonClick={handleEditButtonClick} />
      {isEditModalOpen && (
        <EditFormModal
          showModal={isEditModalOpen}
          onClose={handleCloseEditModal}
          property={property}
          onEditDwelling={handleEditDwelling} // Pass the function to handle updating the dwelling
        />
      )}
    </div>
  );
}

export default function DotMenu({ onEditButtonClick }) {
  return (
    <div className="z-10 flex justify-end  leading-6 text-gray-900">
      <Menu as="div" className="relative ml-auto">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Open options</span>
          <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                  onClick={onEditButtonClick}
                >
                  Edit<span className="sr-only"></span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  href="#"
                  className={classNames(
                    active ? "bg-gray-50" : "",
                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                  )}
                >
                  Delete<span className="sr-only"></span>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
