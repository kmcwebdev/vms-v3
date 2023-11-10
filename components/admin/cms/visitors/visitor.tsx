"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Visitors = () => {
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="flex w-full justify-end">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select site" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">
                  Armstrong Corporate Center
                </SelectItem>
                <SelectItem value="banana">Picadilly Inc.</SelectItem>
                <SelectItem value="blueberry">Uptown Place Tower 2</SelectItem>
                <SelectItem value="grapes">Four/Neo</SelectItem>
                <SelectItem value="pineapple">SM Aura</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/03.png" alt="Avatar" />
            <AvatarFallback>IN</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
            <p className="text-sm text-muted-foreground">
              isabella.nguyen@email.com
            </p>
          </div>
          <div className="ml-auto font-medium">
            <Badge>12:46 PM Nov. 8, 2023</Badge>
          </div>
        </div>
        <Separator className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default Visitors;
