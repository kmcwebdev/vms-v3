import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Form from "@/components/global/form";
import { Input } from "@/components/ui/input";

const reasonToVisit = [
  {
    label: "Company event",
    value: "company-event",
  },
  {
    label: "Company visit",
    value: "company-visit",
  },
  {
    label: "Delivery",
    value: "delivery",
  },
  {
    label: "Event Organizer",
    value: "event-organizer",
  },
  {
    label: "Interview",
    value: "interview",
  },
  {
    label: "Meeting",
    value: "meeting",
  },
  {
    label: "Repair Service",
    value: "repair-service",
  },
];

const FillUpForm = () => {
  return (
    <Card className="border-none shadow-none">
      <CardContent className="space-y-6 p-0">
        <div className="space-y-1">
          <label
            htmlFor="lastName"
            className=" text-sm font-medium text-neutral-700"
          >
            Last Name
          </label>
          <Form.Input
            name="fillUpForm.lastName"
            placeholder="Your Last Name"
            type="text"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="firstName"
            className=" text-sm font-medium text-neutral-700"
          >
            First Name
          </label>
          <Form.Input
            name="fillUpForm.firstName"
            placeholder="Your First Name"
            type="text"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className=" text-sm font-medium text-neutral-700"
          >
            Email Address
          </label>
          <Form.Input
            name="fillUpForm.email"
            placeholder="Your Email Address"
            type="text"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className=" text-sm font-medium text-neutral-700"
          >
            Company to Visit
          </label>
          <Form.Input
            name="fillUpForm.companyToVisit"
            placeholder="Name of the Company you are visiting"
            type="text"
          />
        </div>

        {/* <Form.Select
          name="fillUpForm.companyToVisit"
          label="Company to visit"
          placeholder="Select the company you want to visit"
          data={[
            {
              label: "KMC Solutions",
              value: "kmc solutions",
            },
          ]}
        /> */}

        <div className="space-y-1">
          <label
            htmlFor="email"
            className=" text-sm font-medium text-neutral-700"
          >
            Person to Visit
          </label>
          <Form.Input
            name="fillUpForm.personToVisit"
            placeholder="Name of the Person you are visiting"
            type="text"
          />
        </div>

        {/* <Form.Select
          name="fillUpForm.personToVisit"
          label="Person to visit"
          placeholder="Select the person you want to visit"
          data={[
            {
              label: "Cannot find name",
              value: "cannot-find",
            },
          ]}
        /> */}

        <Form.Select
          name="fillUpForm.reasonToVisit"
          label="Reason to Visit"
          placeholder="Select a Reason"
          data={reasonToVisit}
        />
      </CardContent>
    </Card>
  );
};

export default FillUpForm;
