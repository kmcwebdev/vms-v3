import React from "react";
import SiteDetails from "@/components/admin/cms/area-sites/details/site-details";
interface pageProps {
  params: {
    "site-id": string;
  };
}

const page: React.FC<pageProps> = (props) => {
  console.log(props.params);

  return <SiteDetails siteId={props.params["site-id"]} />;
};

export default page;
