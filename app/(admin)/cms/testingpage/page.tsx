"use client";

import React from "react";
import DateRangePicker from "@/components/global/date-range-picker";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  date: z.any(),
});

const handleSubmit = (values: z.infer<typeof formSchema>) => {
  console.log("VALUES", { values });
};

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [selectedDate, setSelectedDate] = React.useState("");

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full max-w-md flex-col gap-4"
        >
          <DateRangePicker
            onChange={(e) => console.log("date", e)}
            name="date"
          />
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <DateRangePicker
                      {...field}
                      className="border-gray-300"
                      name="dateRange"
                      onChange={(e) => {
                        console.log(e);
                      }}

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}
          <Button
            type="submit"
            className="mt-4 max-h-11 rounded-md bg-yellow-500 px-4 py-2 text-white hover:bg-orange-500"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
