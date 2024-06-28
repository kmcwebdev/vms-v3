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
import { Worker } from "@/types/global/worker";
import { XIcon, PlusIcon } from "lucide-react";
import { workTypes, workRequirements } from "@/components/global/workdata";

export default function EditWorkPermitApplication({
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
  const [work_area, setWorkArea] = useState(submission?.work_area || "");
  const [tenant, setTenant] = useState(submission?.tenant || "");
  const [contractor, setContractor] = useState(submission?.contractor || "");
  const [person_in_charge, setPersonInCharge] = useState(
    submission?.person_in_charge || "",
  );
  const [number, setNumber] = useState(submission?.number || "");
  const [site, setSite] = useState(submission?.site || "");
  const [floor, setFloor] = useState(submission?.floor || "");
  const [availableFloors, setAvailableFloors] = React.useState<number[]>([]);
  const [work_types, setWorkTypes] = useState(submission?.work_types || []);
  const [other_work_types, setOtherWorkTypes] = useState(
    submission?.other_work_types || "",
  );
  const [work_requirements, setWorkRequirements] = useState(
    submission?.work_requirements || [],
  );
  const [other_work_requirements, setOtherWorkRequirements] = useState(
    submission?.other_work_requirements || "",
  );
  const [scope, setScope] = useState(submission?.scope || "");
  const [workers, setWorkers] = useState(submission?.workers || []);
  const [items, setItems] = useState(submission?.items || []);

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
      setWorkArea(submission.work_area);
      setTenant(submission.tenant);
      setContractor(submission.contractor);
      setPersonInCharge(submission.person_in_charge);
      setNumber(submission.number);
      setSite(submission.site);
      setFloor(submission.floor);
      setWorkTypes(submission.work_types || []);
      setOtherWorkTypes(submission.other_work_types);
      setWorkRequirements(submission.work_requirements || []);
      setOtherWorkRequirements(submission.other_work_requirements);
      setScope(submission.scope);
      setWorkers(submission.workers || []);
      setItems(submission.items || []);
    }
  }, [submission]);

  const handleSave = () => {
    const updatedSubmission = {
      ...submission,
      status,
      type,
      name,
      email,
      work_area,
      tenant,
      contractor,
      person_in_charge,
      number,
      site,
      floor,
      work_types: [...work_types],
      other_work_types,
      work_requirements: [...work_requirements],
      other_work_requirements,
      scope,
      items: [...items],
      workers: [...workers],
    };
    if (onUpdate) {
      onUpdate(updatedSubmission);
    }

    // Close the modal
    onClose();
  };

  const handleWorkTypesSelect = (type: string) => {
    const currentTypes = [...work_types];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter((item: string) => item !== type)
      : [...currentTypes, type];

    setWorkTypes(updatedTypes);
  };

  const handleWorkRequirementsSelect = (type: string) => {
    const currentRequirements = [...work_requirements];
    const updatedRequirements = currentRequirements.includes(type)
      ? currentRequirements.filter((item: string) => item !== type)
      : [...currentRequirements, type];

    setWorkRequirements(updatedRequirements);
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

  const handleWorkerChange = (
    index: number,
    field: keyof Worker,
    value: any,
  ) => {
    const newWorkers = [...workers];
    newWorkers[index][field] = value;
    setWorkers(newWorkers);
  };

  const handleAddWorker = () => {
    const newWorkers = [...workers, { name: "", company: "", description: "" }];
    setWorkers(newWorkers);
  };

  const handleRemoveWorker = (index: number) => {
    const newWorkers = [...workers];
    newWorkers.splice(index, 1);
    setWorkers(newWorkers);
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
                                Job Scope
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={work_area}
                                  onChange={(e) => setWorkArea(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={tenant}
                                  onChange={(e) => setTenant(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Contractor Name / POC
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={contractor}
                                  placeholder="Contractor Name"
                                  onChange={(e) =>
                                    setContractor(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={person_in_charge}
                                  placeholder="Person in Charge (POC)"
                                  onChange={(e) =>
                                    setPersonInCharge(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                                <Input
                                  type="text"
                                  value={number}
                                  placeholder="POC number"
                                  onChange={(e) => setNumber(e.target.value)}
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
                                Work Types
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground shadow-none hover:bg-transparent"
                                    >
                                      {work_types.length > 0
                                        ? work_types.join(", ")
                                        : "Select Types"}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                  >
                                    {workTypes.map((type) => (
                                      <DropdownMenuItem
                                        key={type}
                                        onSelect={() =>
                                          handleWorkTypesSelect(type)
                                        }
                                      >
                                        <label className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            checked={work_types.includes(
                                              type,
                                            )}
                                            readOnly
                                            className="form-checkbox h-4 w-4 text-indigo-500 shadow-none"
                                          />
                                          <span className="text-xs text-gray-700">
                                            {type}
                                          </span>
                                        </label>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Input
                                  type="text"
                                  value={other_work_types}
                                  placeholder="Other Work Types"
                                  onChange={(e) =>
                                    setOtherWorkTypes(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Work Requirements
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {/* Add dropdown with preselected work reqs here */}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      className="mt-1 flex h-16 w-full items-start justify-start overflow-scroll whitespace-pre-line rounded-md border border-gray-300 bg-transparent p-2 font-light text-muted-foreground shadow-none hover:bg-transparent"
                                    >
                                      {work_requirements.length > 0
                                        ? work_requirements.join(", ")
                                        : "Select Requirements"}
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    sideOffset={5}
                                    className="max-h-60 w-40 overflow-y-auto text-sm"
                                  >
                                    {workRequirements.map((type) => (
                                      <DropdownMenuItem
                                        key={type}
                                        onSelect={() =>
                                          handleWorkRequirementsSelect(type)
                                        }
                                      >
                                        <label className="flex items-center space-x-2">
                                          <input
                                            type="checkbox"
                                            checked={work_requirements.includes(
                                              type,
                                            )}
                                            readOnly
                                            className="form-checkbox h-4 w-4 text-indigo-500 shadow-none"
                                          />
                                          <span className="text-xs text-gray-700">
                                            {type}
                                          </span>
                                        </label>
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                <Input
                                  type="text"
                                  value={other_work_types}
                                  placeholder="Other Work Requirements"
                                  onChange={(e) =>
                                    setOtherWorkRequirements(e.target.value)
                                  }
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Other Info
                              </dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                <Input
                                  type="text"
                                  value={scope}
                                  onChange={(e) => setScope(e.target.value)}
                                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
                                />
                              </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">
                                Workers
                              </dt>
                              <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {workers.map((worker: any, index: any) => (
                                  <div
                                    key={index}
                                    className="mt-2 flex items-center gap-4"
                                  >
                                    <Input
                                      type="text"
                                      value={worker.name}
                                      onChange={(e) =>
                                        handleWorkerChange(
                                          index,
                                          "name",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Name"
                                    />
                                    <Input
                                      type="number"
                                      value={worker.company}
                                      onChange={(e) =>
                                        handleWorkerChange(
                                          index,
                                          "company",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Company"
                                    />
                                    <Input
                                      type="text"
                                      value={worker.description}
                                      onChange={(e) =>
                                        handleWorkerChange(
                                          index,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                      className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                      placeholder="Desc"
                                    />

                                    <Button
                                      onClick={() => handleRemoveWorker(index)}
                                      className="rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                                    >
                                      <XIcon className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ))}
                                <div className="mt-5 flex justify-end">
                                  <Button
                                    onClick={handleAddWorker}
                                    className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                  >
                                    <div className="flex items-center">
                                      <PlusIcon className="mr-2 h-4 w-4" />
                                      Add Worker
                                    </div>
                                  </Button>
                                </div>
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
