import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, PaperClipIcon } from "@heroicons/react/24/outline";

export default function ViewWorkPermitApplication({
  isOpen,
  onClose,
  submission,
}: {
  isOpen: boolean;
  onClose: any;
  submission: any;
}) {
  return (
    <Transition show={isOpen}>
      <Dialog className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-2xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                          Work Permit Application Details
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={onClose}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div>
                        <div className="px-4 sm:px-0">
                          <h3 className="text-base font-semibold leading-7 text-gray-900">
                            Applicant Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            Personal details and application
                          </p>
                        </div>

                        <div className="mt-6 border-t border-gray-100">
                          <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Personal Details
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.name} ({submission?.type})
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email Address
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.email}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Job Scope
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.work_area} for {submission?.tenant}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Contractor Name / POC
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.contractor} /{" "}
                                {submission?.person_in_charge} (
                                {submission?.number})
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Location
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.site} (Level {submission?.floor})
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Date Range (Y-M-D)
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.date_from.split("T")[0]} to{" "}
                                {submission?.date_to.split("T")[0]}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Work Types
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.work_types.join(", ")}
                                {submission?.work_types.includes("Others") &&
                                  submission?.other_work_types && (
                                    <>
                                      , Other Work Type:{" "}
                                      {submission.other_work_types}
                                    </>
                                  )}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Work Requirements
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.work_requirements.join(", ")}
                                {submission?.work_requirements.includes(
                                  "other",
                                ) &&
                                  submission?.other_work_requirements && (
                                    <>, {submission.other_work_requirements}</>
                                  )}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Other Info
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {submission?.scope}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Workers
                              </dt>
                              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {submission?.workers?.map(
                                  (worker: any, index: number) => (
                                    <div key={index} className="mb-2">
                                      <strong>Worker {index + 1}</strong>
                                      <div>
                                        <i>Name:</i> {worker.name}
                                      </div>
                                      <div>
                                        <i>Company:</i> {worker.company}
                                      </div>
                                      <div>
                                        <i>Description:</i> {worker.description}
                                      </div>
                                      <br></br>
                                    </div>
                                  ),
                                )}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Items
                              </dt>
                              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                {submission?.items?.map(
                                  (item: any, index: number) => (
                                    <div key={index} className="mb-2">
                                      <strong>Item {index + 1}</strong>
                                      <div>
                                        <i>Description:</i> {item.description}
                                      </div>
                                      <div>
                                        <i>Quantity:</i> {item.qty}
                                      </div>
                                      <div>
                                        <i>Unit:</i> {item.unit}
                                      </div>
                                      <div>
                                        <i>Remarks:</i> {item.remarks}
                                      </div>
                                      <br></br>
                                    </div>
                                  ),
                                )}
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Attachments
                              </dt>
                              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul
                                  role="list"
                                  className="mb-2 divide-y divide-gray-100 rounded-md border border-gray-200"
                                >
                                  {submission?.files?.map(
                                    (file: any, index: number) => (
                                      <li
                                        key={index}
                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                      >
                                        <div className="flex w-0 flex-1 items-center">
                                          <PaperClipIcon
                                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                                            aria-hidden="true"
                                          />
                                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-light text-gray-900">
                                              {file}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                          <a
                                            href={file}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                            download
                                          >
                                            Download
                                          </a>
                                        </div>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Add more details as needed */}
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}