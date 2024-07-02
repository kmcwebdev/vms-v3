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
import { Item } from "@/types/global/item";
import { XIcon, PlusIcon } from "lucide-react";

export default function EditGatePassApplication({
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
  // State for editable fields
  const [status, setStatus] = useState(submission?.status || "");
  const [type, setType] = useState(submission?.type || "");
  const [name, setName] = useState(submission?.name || "");
  const [email, setEmail] = useState(submission?.email || "");
  const [service_category, setServiceCategory] = useState(
    submission?.service_category || "",
  );
  const [carrier_name, setCarrierName] = useState(
    submission?.carrier_name || "",
  );
  const [company, setCompany] = useState(submission?.company || "");
  const [site, setSite] = useState(submission?.site || "");
  const [floor, setFloor] = useState(submission?.floor || "");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
  const [reason, setReason] = React.useState(submission?.reason || "");
  const [items, setItems] = useState(submission?.items || []);

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

  // Effect to update state when submission changes
  useEffect(() => {
    if (submission) {
      setStatus(submission.status);
      setType(submission.type);
      setName(submission.name);
      setEmail(submission.email);
      setServiceCategory(submission.service_category);
      setCarrierName(submission.carrier_name);
      setCompany(submission.company);
      setSite(submission.site);
      setFloor(submission.floor);
      setReason(submission.reason);
      setItems(submission.items || []);
    }
  }, [submission]);
  
  const updateSubmission = async (updatedSubmission: any) => {
    setSelectedSubmission(updatedSubmission);
    try {
      const response = await fetch(
        `/api/permits/post-gate-pass/${updatedSubmission.submission_id}`,
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
      onUpdate(updatedSubmission.submission_id, updatedSubmission);
      return data;
    } catch (error) {
      console.error("Error updating submission:", error);
      return {message: "An error occurred while updating the submission"};
    }
  };

  // Function to handle saving changes
  const handleSave = async () => {
    const updatedSubmission = {
      ...submission,
      status,
      type,
      name,
      email,
      service_category,
      carrier_name,
      company,
      site,
      floor,
      reason,
      items: [...items],
    };

    try {
      const updatedData = await updateSubmission(updatedSubmission);
      console.log("Updated data:", updatedData);
      onClose(); 
    } catch (error) {
      console.error("Error while updating submission:", error);
    }
  };

  const handleItemChange = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddItem = () => {
    const newItems = [
      ...items,
      { description: "", qty: "", unit: "", remarks: "" },
    ];
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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
                                Service Category
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button className="block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                                      {service_category || "Select Category"}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                  >
                                    {[
                                      "Delivery",
                                      "Pull-Out",
                                      "Transfer Between Floors",
                                    ].map((category) => (
                                      <DropdownMenuItem
                                        key={category}
                                        onSelect={() => {
                                          setServiceCategory(category);
                                          console.log(
                                            `Service Category selected: ${category}`,
                                          );
                                        }}
                                      >
                                        {category}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Carrier Name
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={carrier_name}
                                  onChange={(e) =>
                                    setCarrierName(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Company
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={company}
                                  onChange={(e) => setCompany(e.target.value)}
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
                                Reason
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Items
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {items.map((item: any, index: any) => (
                                  <div
                                    key={index}
                                    className="mt-2 flex items-center gap-4"
                                  >
                                    <Input
                                      type="text"
                                      value={item.description}
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Desc"
                                    />
                                    <Input
                                      type="number"
                                      value={item.qty}
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "qty",
                                          e.target.value.toString(),
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Qty"
                                    />
                                    <Input
                                      type="text"
                                      value={item.unit}
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "unit",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Unit"
                                    />
                                    <Input
                                      type=""
                                      value={item.remarks}
                                      onChange={(e) =>
                                        handleItemChange(
                                          index,
                                          "remarks",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Remarks"
                                    />
                                    <Button
                                      onClick={() => handleRemoveItem(index)}
                                      className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="mt-5 flex justify-end">
                                  <Button
                                    onClick={handleAddItem}
                                    className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                  >
                                    <div className="flex items-center">
                                      <PlusIcon className="mr-2 h-4 w-4" />
                                      Add Item
                                    </div>
                                  </Button>
                                </div>
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
