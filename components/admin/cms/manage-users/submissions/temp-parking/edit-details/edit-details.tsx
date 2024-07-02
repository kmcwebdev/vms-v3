import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { buildings } from "@/components/global/sites";

export default function EditTempParkingApplication({
  isOpen,
  onClose,
  submission,
  onUpdate, // New prop for updating the parent component
}: {
  isOpen: boolean;
  onClose: any;
  submission: any;
  onUpdate: any;
}) {
  const [status, setStatus] = useState(submission?.status || "");
  const [type, setType] = useState(submission?.type || "");
  const [name, setName] = useState(submission?.name || "");
  const [email, setEmail] = useState(submission?.email || "");
  const [site, setSite] = useState(submission?.site || "");
  const [floor, setFloor] = useState(submission?.floor || "");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
  const [vehicle_model, setVehicleModel] = useState(
    submission?.vehicle_model || "",
  );
  const [vehicle_color, setVehicleColor] = useState(
    submission?.vehicle_color || "",
  );
  const [vehicle_number, setVehicleNumber] = useState(
    submission?.vehicle_number || "",
  );
  const [parking_number, setParkingNumber] = useState(
    submission?.parking_number || "",
  );
  const [manager_email, setManagerEmail] = React.useState(
    submission?.manager_email || "",
  );
  const [selectedSubmission, setSelectedSubmission] = useState(submission);

  React.useEffect(() => {
    const selectedSite = buildings.find((b) => b.name === site);
    if (selectedSite) {
      setAvailableFloors(selectedSite.floors);
      setFloor("");
    } else {
      setAvailableFloors([]);
    }
  }, [site]);

  useEffect(() => {
    if (submission) {
      setStatus(submission.status);
      setType(submission.type);
      setName(submission.name);
      setEmail(submission.email);
      setSite(submission.site);
      setFloor(submission.floor);
      setVehicleModel(submission.vehicle_model);
      setVehicleColor(submission.vehicle_color);
      setVehicleNumber(submission.vehicle_number);
      setParkingNumber(submission.parking_number);
      setManagerEmail(submission.manager_email);
    }
  }, [submission]);

  const updateSubmission = async (updatedSubmission: any) => {
    setSelectedSubmission(updatedSubmission);
    try {
      const response = await fetch(
        `/api/permits/post-temp-parking/${updatedSubmission.submission_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSubmission),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Update successful:", data);
      onUpdate(updatedSubmission); // Notify parent component of the update
      return data; // Return the updated data for further handling if needed
    } catch (error) {
      console.error("Error updating submission:", error);
      return { message: "An error occurred while updating the submission" };
    }
  };

  const handleSave = async () => {
    const updatedSubmission = {
      ...submission,
      status,
      type,
      name,
      email,
      site,
      floor,
      vehicle_model,
      vehicle_color,
      vehicle_number,
      parking_number,
      manager_email,
    };

    try {
      const updatedData = await updateSubmission(updatedSubmission);
      console.log("Updated data:", updatedData);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error("Error while updating submission:", error);
      // Handle error cases here
    }
  };

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
                          Edit Gate Pass Application
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
                                Status
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                                      {status}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                    defaultValue={status}
                                  >
                                    {["Pending", "Approved", "Declined"].map(
                                      (status) => (
                                        <DropdownMenuItem
                                          key={status}
                                          onSelect={() => setStatus(status)}
                                        >
                                          {status}
                                        </DropdownMenuItem>
                                      ),
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Type
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                                      {type}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                    defaultValue={type}
                                  >
                                    {["Client", "Internal", "Vendor"].map(
                                      (type) => (
                                        <DropdownMenuItem
                                          key={type}
                                          onSelect={() => setType(type)}
                                        >
                                          {type}
                                        </DropdownMenuItem>
                                      ),
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Name
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email Address
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Location
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                                      {site || "Select Site"}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                  >
                                    {buildings.map((building) => (
                                      <DropdownMenuItem
                                        key={building.name}
                                        onSelect={() => {
                                          setSite(building.name);
                                        }}
                                      >
                                        {building.name}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                                      {floor || "Select Floor"}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                  >
                                    {availableFloors.map((floor) => (
                                      <DropdownMenuItem
                                        key={floor}
                                        onSelect={() => {
                                          setFloor(floor.toString());
                                        }}
                                        disabled={!availableFloors.length}
                                      >
                                        {floor}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Vehicle Details
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={vehicle_model}
                                  onChange={(e) =>
                                    setVehicleModel(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={vehicle_color}
                                  onChange={(e) =>
                                    setVehicleColor(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={vehicle_number}
                                  onChange={(e) =>
                                    setVehicleNumber(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={parking_number}
                                  onChange={(e) =>
                                    setParkingNumber(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Manager Email
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="email"
                                  value={manager_email}
                                  onChange={(e) =>
                                    setManagerEmail(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>

                            {/* Additional fields can be added here in the same manner */}
                          </dl>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 sm:px-6">
                      <button
                        type="button"
                        className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleSave}
                      >
                        Save Changes
                      </button>
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
