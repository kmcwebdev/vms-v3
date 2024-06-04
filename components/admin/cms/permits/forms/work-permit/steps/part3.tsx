import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon, PlusIcon } from "lucide-react";


export default function Part3() {
  const [items, setItems] = React.useState([
    { description: "", qty: 1, unit: "pcs", remarks: "" },
  ]);
  const [workers, setWorkers] = React.useState([
    { name: "", company: "", description: "" },
  ]);

  const handleAddItem = () => {
    setItems([...items, { description: "", qty: 1, unit: "pcs", remarks: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: any, value: string) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleAddWorker = () => {
    setWorkers([...workers, { name: "", company: "", description: "" }]);
  };

  const handleRemoveWorker = (index: number) => {
    setWorkers(workers.filter((_, i) => i !== index));
  };

  const handleWorkerChange = (index: number, field: any, value: string) => {
    const newWorkers = [...workers];
    newWorkers[index][field] = value;
    setWorkers(newWorkers);
  };
  return (
    <>
      {/* Worker Details */}
      <div className="mb-4 p-2">
        <label className="block text-sm font-medium text-gray-700">
          Worker Details
        </label>
        {workers.map((worker, index) => (
          <div key={index} className="mb-2 flex gap-2">
            <Input
              type="text"
              placeholder="Input Worker Name"
              value={worker.name}
              onChange={(e) =>
                handleWorkerChange(index, "name", e.target.value)
              }
              className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2 text-sm"
              required
            />
            <Input
              type="text"
              placeholder="Company"
              value={worker.company}
              onChange={(e) =>
                handleWorkerChange(index, "company", e.target.value)
              }
              className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
              required
            />
            <Input
              type="text"
              placeholder="Description"
              value={worker.description}
              onChange={(e) =>
                handleWorkerChange(index, "description", e.target.value)
              }
              className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
            />
            <Button
              type="button"
              onClick={() => handleRemoveWorker(index)}
              className="mt-1 rounded-md bg-red-500 px-2 py-1 text-white  hover:bg-red-600"
            >
              <XIcon />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={handleAddWorker}
          className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <div className="flex flex-row items-center justify-center">
            <PlusIcon className="h-4 w-4" />
            Add Worker
          </div>
        </Button>
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
