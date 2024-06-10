import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { XIcon, PlusIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Item } from "@/types/global/item";
import { Worker } from "@/types/global/worker";


export default function Part3({ formControl }: { formControl: any }) {
  const { setValue } = useFormContext();
  const [items, setItems] = React.useState([
    { description: "", qty: "", unit: "", remarks: "" },
  ]);
  const [workers, setWorkers] = React.useState([
    { name: "", company: "", description: "" },
  ]);

  const handleAddItem = (e:any) => {
    e.preventDefault();
    const newItems = [...items, { description: "", qty: "", unit: "", remarks: "" }];
    setItems(newItems);
    setValue("items", newItems); // Update form value
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setValue("items", newItems); // Update form value
  };

  const handleItemChange = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    setValue("items", newItems); // Update form value
  };

  const handleAddWorker = (e:any) => {
    e.preventDefault();
    const newWorkers = [...workers, { name: "", company: "", description: "" }]
    setWorkers(newWorkers);
    setValue("workers", newWorkers);
  };

  const handleRemoveWorker = (index: number) => {
    const newWorkers = workers.filter((_, i) => i !== index)
    setWorkers(newWorkers);
    setValue("workers", newWorkers)
  };

  const handleWorkerChange = (index: number, field: keyof Worker, value: any) => {
    const newWorkers = [...workers];
    newWorkers[index][field] = value;
    setWorkers(newWorkers);
    setValue("workers", newWorkers);
  };

  return (
    <>
      {/* workers */}
      <FormField
        control={formControl.control}
        name="workers"
        render={() => {
          return (
            <FormItem className="flex flex-col p-2">
              <FormLabel>Workers</FormLabel>
              <FormControl>
                <div>
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
                      />
                      <Input
                        type="text"
                        placeholder="Input Company"
                        value={worker.company}
                        onChange={(e) =>
                          handleWorkerChange(index, "company", e.target.value)
                        }
                        className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
                      />
                      <Input
                        type="text"
                        placeholder="Input Description"
                        value={worker.description}
                        onChange={(e) =>
                          handleWorkerChange(index, "description", e.target.value)
                        }
                        className="mt-1 block w-1/2 rounded-md border border-gray-300 p-2"
                      />
                      <Button
                        onClick={() => handleRemoveWorker(index)}
                        className="mt-1 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                      >
                        <XIcon />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddWorker}
                    className="rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                  >
                    <div className="flex flex-row items-center justify-center">
                      <PlusIcon className="h-4 w-4" />
                      Add Worker
                    </div>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* items */}
      <FormField
        control={formControl.control}
        name="items"
        render={() => {
          return (
            <FormItem className="flex flex-col p-2">
              <FormLabel>Items Being Carried</FormLabel>
              <FormControl>
                <div>
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
                      />
                      <Input
                        type="number"
                        placeholder="Qty"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(
                            index,
                            "qty",
                            e.target.value.toString(),
                          )
                        }
                        className="mt-1 block w-1/4 rounded-md border border-gray-300 p-2"
                      />
                      <Input
                        type="text"
                        placeholder="Unit"
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(index, "unit", e.target.value)
                        }
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
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
}
