import React, { useEffect, useState } from "react";
import Form from "@/components/global/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  MagnifyingGlassIcon,
  EyeOpenIcon,
  Pencil1Icon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import DateRangePicker from "@/components/global/date-range-picker";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { buildings } from "@/components/global/sites";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ViewWorkPermitApplication from "./view-details.tsx/view-details";

const WorkPermitSubmissions = () => {
  const [workPermitSubmissions, setWorkPermitSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [selectedStatus, setSelectedStatus] = React.useState("");
  const [selectedSite, setSelectedSite] = React.useState("");
  const [selectedName, setSelectedName] = useState("");

  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm();

  useEffect(() => {
    //console.log(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/get-work-permit");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setWorkPermitSubmissions(data.data);
        //console.log("Data from API:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [selectedStatus, selectedSite, selectedName, workPermitSubmissions]);

  const filterSubmissions = () => {
    let filtered = workPermitSubmissions;

    if (selectedStatus) {
      filtered = filtered.filter(
        (submission: any) => submission.status === selectedStatus,
      );
    }

    if (selectedSite) {
      filtered = filtered.filter(
        (submission: any) => submission.site === selectedSite,
      );
    }

    if (selectedName) {
      const lowerCaseName = selectedName.toLowerCase();
      filtered = filtered.filter((submission: any) =>
        submission.name.toLowerCase().includes(lowerCaseName),
      );
    }

    setFilteredSubmissions(filtered);
  };

  const onFormSubmit = (data: any) => {};

  const handleViewClick = (submission: any) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
  };

  const handleDelete = async (submissionId: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this submission?",
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `/api/delete-work-permit/${submissionId}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to delete submission");
        }

        setWorkPermitSubmissions((prevSubmissions: any) =>
          prevSubmissions.filter(
            (submission: any) => submission.submission_id !== submissionId,
          ),
        );

        console.log("Submission deleted successfully");
      } catch (error) {
        console.error("Error deleting submission:", error);
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(e.target.value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSiteChange = (site: string) => {
    setSelectedSite(site);
  };

  const reset = () => {
    setSelectedName("");
    setSelectedStatus("");
    setSelectedSite("");
    setFilteredSubmissions([...workPermitSubmissions]);
  };

  return (
    <>
      <Form
        name="submission-filter"
        useFormReturn={form}
        onSubmit={onFormSubmit}
      >
        <div className="mt-5 flex flex-row gap-5 p-2">
          {/* <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <DateRangePicker
              className="mt-1 border-gray-300 shadow-none "
              name="dateRange"
            />
          </div> */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 font-light"
              placeholder="Input Customer Name"
              onChange={handleNameChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                  {selectedStatus || "Select a Status"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={5}
                className="max-h-60 w-40 overflow-y-auto text-sm"
              >
                {["Pending", "Approved", "Declined"].map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onSelect={() => handleStatusChange(type)}
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Site
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent p-2 text-left font-light text-muted-foreground shadow-none hover:bg-transparent">
                  {selectedSite || "Select Site"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={5}
                className="max-h-60 w-40 overflow-y-auto text-sm"
              >
                {buildings.map((building) => (
                  <DropdownMenuItem
                    key={building.name}
                    onSelect={() => handleSiteChange(building.name)}
                  >
                    {building.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-1/2 content-end">
            <Button onClick={reset} className="w-full">
              Reset Filters
            </Button>
          </div>
        </div>
      </Form>
      <div className="mt-5 px-4 sm:px-6 lg:px-8">
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Details
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      User Type
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Actions
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Array.isArray(filteredSubmissions) &&
                  filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission: any) => (
                      <tr key={submission.submission_id}>
                        <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">
                                {submission.name}
                              </div>
                              <div className="mt-1 text-gray-500">
                                {submission.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          <div className="text-gray-900">{submission.site}</div>
                          <div className="mt-1 text-gray-500">
                            <p>Level {submission.floor}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {submission.status}
                        </td>
                        <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                          {submission.type}
                        </td>
                        <td className="flex justify-between self-stretch whitespace-nowrap px-3 py-8 text-sm font-medium">
                          <Button
                            onClick={() => handleViewClick(submission)}
                            className="bg-transparent text-green-600 hover:bg-gray-50 hover:text-green-900"
                          >
                            <EyeOpenIcon
                              className="inline h-5 w-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            onClick={() => {}}
                            className="bg-transparent text-indigo-600 hover:bg-gray-50 hover:text-indigo-900"
                          >
                            <Pencil1Icon
                              className="inline h-5 w-5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            onClick={() =>
                              handleDelete(submission.submission_id)
                            }
                            className="bg-transparent text-red-600 hover:bg-gray-50 hover:text-red-900"
                          >
                            <Cross1Icon
                              className="inline h-5 w-5"
                              aria-hidden="true"
                            />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                      >
                        <SkeletonLoaderForSubmissions />
                        <SkeletonLoaderForSubmissions />
                        <SkeletonLoaderForSubmissions />
                        <SkeletonLoaderForSubmissions />
                        <SkeletonLoaderForSubmissions />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      <ViewWorkPermitApplication
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submission={selectedSubmission}
      />
    </>
  );
};

export default WorkPermitSubmissions;

const SkeletonLoaderForSubmissions = () => {
  return (
    <Skeleton className="flex h-16 w-full flex-col justify-between rounded-xl border border-neutral-100 bg-transparent p-6">
      <div>
        <div className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
          <div className="flex items-center">
            <div></div>
          </div>
          <div className="whitespace-nowrap px-3 py-5 text-sm text-gray-500"></div>
        </div>
      </div>
    </Skeleton>
  );
};