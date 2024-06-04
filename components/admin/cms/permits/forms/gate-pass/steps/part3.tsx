import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { XIcon, PlusIcon } from "lucide-react";

export default function Part3() {
  const [emailInput, setEmailInput] = React.useState("");
  const [emails, setEmails] = React.useState<string[]>([]);
  const [items, setItems] = React.useState([
    { description: "", qty: 1, unit: "pcs", remarks: "" },
  ]);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && emailInput.trim() !== "") {
      setEmails([...emails, emailInput.trim()]);
      setEmailInput("");
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, unit: "pcs", remarks: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <>
      {/* Relevant Emails to Notify */}
      <div className="mb-4 p-2">
        <label className="block text-sm font-medium text-gray-700">
          Emails to Notify
        </label>
        <Input
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={emailInput}
          onChange={handleEmailInputChange}
          onKeyPress={handleEmailInputKeyPress}
          placeholder="Input an Email and Press Enter to Add"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {emails.map((email, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-200 px-2 py-1 text-sm"
            >
              <span>{email}</span>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveEmail(index)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items being carried */}
      <div className="mb-4 p-2">
        <label className="block text-sm font-medium text-gray-700">
          Items Being Carried
        </label>
        {items.map((item, index) => (
          <div key={index} className="mb-2 flex gap-2">
            <Input
              type="text"
              placeholder="Input Item Description/Name"
              value={item.description}
              onChange={(e) =>
                handleItemChange(index, "description", e.target.value)
              }
              className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2 text-sm"
              required
            />
            <Input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => handleItemChange(index, "qty", e.target.value)}
              className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
            />
            <Input
              type="text"
              placeholder="Unit"
              value={item.unit}
              onChange={(e) => handleItemChange(index, "unit", e.target.value)}
              className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
            />
            <Input
              type="text"
              placeholder="Input Remarks"
              value={item.remarks}
              onChange={(e) =>
                handleItemChange(index, "remarks", e.target.value)
              }
              className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2"
            />
            <Button
              onClick={() => handleRemoveItem(index)}
              className="mt-1 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
            >
              <XIcon />
            </Button>
          </div>
        ))}
        <Button
          onClick={handleAddItem}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <div className="flex flex-row items-center justify-center">
            <PlusIcon className="h-4 w-4" />
            Add Item
          </div>
        </Button>
      </div>
    </>
  );
}
