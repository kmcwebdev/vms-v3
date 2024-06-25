import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  EyeOpenIcon,
  Pencil1Icon,
  Cross1Icon,
} from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import ViewTempParkingApplication from "./view-details/view-details";

const TempParkingSubmissions = () => {
  const [tempParkingSubmissions, setTempParkingSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    //console.log(isModalOpen);
  }, [isModalOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/permits/get-temp-parking");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTempParkingSubmissions(data.data);
        //console.log("Data from API:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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
          `/api/permits/delete-temp-parking/${submissionId}`,
          {
            method: "DELETE",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to delete submission");
        }

        setTempParkingSubmissions((prevSubmissions: any) =>
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

  return (
    <>

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
                  {Array.isArray(tempParkingSubmissions) &&
                  tempParkingSubmissions.length > 0 ? (
                    tempParkingSubmissions.map((submission: any) => (
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
      <ViewTempParkingApplication
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        submission={selectedSubmission}
      />
    </>
  );
};

export default TempParkingSubmissions;

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
