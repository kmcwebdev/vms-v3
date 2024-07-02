import { Input } from "@/components/ui/input";
import React from "react";
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

export default function Part3({ formControl }: { formControl: any }) {
  const { setValue } = useFormContext();
  const [emailInput, setEmailInput] = React.useState("");
  const [emails, setEmails] = React.useState<string[]>([]);
  const [items, setItems] = React.useState([
    { description: "", qty: "", unit: "", remarks: "" },
  ]);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handleEmailInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" && emailInput.trim() !== "") {
      const newEmails = [...emails, emailInput.trim()];
      setEmails(newEmails);
      setEmailInput("");
      setValue("emailsToNotify", newEmails); 
      e.preventDefault();
    }
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
    setValue("emailsToNotify", newEmails); 
  };

  const handleAddItem = (e:any) => {
    e.preventDefault();
    const newItems = [...items, { description: "", qty: "", unit: "", remarks: "" }];
    setItems(newItems);
    setValue("items", newItems); 
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    setValue("items", newItems);
  };

  const handleItemChange = (index: number, field: keyof Item, value: any) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
    setValue("items", newItems);
  };

  return (
    <>
      {/* Relevant Emails to Notify */}
      <FormField
        control={formControl.control}
        name="emailsToNotify"
        render={() => {
          return (
            <FormItem className="flex flex-col p-2">
              <FormLabel>Emails to Notify</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  value={emailInput}
                  onChange={handleEmailInputChange}
                  onKeyPress={handleEmailInputKeyPress}
                  placeholder="Input an Email and Press Enter to Add"
                />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Items being carried */}
      <FormField
        control={formControl.control}
        name="items"
        defaultValue={"No Items Indicated"}
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
                          handleItemChange(index, "qty", e.target.value.toString())
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
