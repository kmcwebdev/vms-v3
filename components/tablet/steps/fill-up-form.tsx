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
          <label htmlFor="lastName" className=" text-sm">
            Last name
          </label>
          <Form.Input
            name="lastName"
            placeholder="Type your last name here"
            type="text"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="firstName" className=" text-sm">
            First name
          </label>
          <Form.Input
            name="firstName"
            placeholder="Type your last name here"
            type="text"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className=" text-sm">
            Email Address
          </label>
          <Form.Input
            name="email"
            placeholder="Type your last name here"
            type="text"
          />
        </div>

        <Form.Select
          name="companyToVisit"
          label="Company to visit"
          placeholder="Select the company you want to visit"
          data={[
            {
              label: "KMC Solutions",
              value: "kmc solutions",
            },
          ]}
        />

        <Form.Select
          name="personToVisit"
          label="Person to visit"
          placeholder="Select the person you want to visit"
          data={[
            {
              label: "Cannot find name",
              value: "cannot-find",
            },
          ]}
        />

        <Form.Select
          name="reasonToVisit"
          label="Reason to visit"
          placeholder="Select a reason you're visiting the site"
          data={reasonToVisit}
        />
      </CardContent>
    </Card>
  );
};

export default FillUpForm;
