/* eslint-disable no-unused-vars */
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  Chip
} from "@material-tailwind/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DialogWithForm from "./DialogWithForm";
import { API_URL } from "../utils/api";
import { useState, useCallback } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Live",
    value: "live",
  },
  {
    label: "Expired",
    value: "expired",
  },
];

const TABLE_HEAD = ["Long Url", "Short", "Status", "Traffic"];

// const TABLE_ROWS = [
//   {
//     longUrl: "https://www.youtube.com/",
//     shortUrl: "056bb2ba",
//     expiryDate: "2024-02-22T01:27:25.019702",
//     clickCount: 1,
//   },
//   {
//     longUrl: "https://google.com",
//     shortUrl: "ad11a182",
//     expiryDate: "2024-02-22T01:06:29.071939",
//     clickCount: 1,
//   },
//   {
//     longUrl: "https://www.wikipedia.org",
//     shortUrl: "6fe75499",
//     expiryDate: "2024-02-22T01:06:16.824915",
//     clickCount: 1,
//   },
//   {
//     longUrl: "https://tinyurl.com/app",
//     shortUrl: "4a7cfe50",
//     expiryDate: "2024-02-22T01:06:05.007770",
//     clickCount: 1,
//   },
//   {
//     longUrl: "https://app.flowcv.com/",
//     shortUrl: "ali",
//     expiryDate: "2024-02-22T01:28:39.187750",
//     clickCount: 3,
//   },
// ];

const SortableTable = ({ TABLE_ROWS }) => {
  const[copied, setCopied] = useState(false);
  // console.log(copied);
  return (
    <div className="h-full w-[80%] mx-auto">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div className="w-[100%] mx-auto">
            <Typography variant="h5" color="blue-gray" className="text-center">
              Your Links
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-center">
              see all info about your links
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <DialogWithForm />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              variant="outlined"
              color="cyan"
              className="focus:outline-none focus:border-blue-500"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.length > 0 ? (
              TABLE_ROWS.map(
                ({ longUrl, shortUrl, expiryDate, clickCount }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const status =
                    new Date(expiryDate).getTime() > new Date().getTime()
                      ? "Live"
                      : "expired";
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={longUrl}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {longUrl}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Tooltip content="Visit Link">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {shortUrl}
                            </Typography>
                          </Tooltip>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
                            color={status === "Live" ? "green" : "red"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {clickCount}
                        </Typography>
                      </td>
                      {/* <td className={classes}>
                      <CopyToClipboard text={`${API_URL}/${shortUrl}`} onCopy={()=>setCopied(true)}>
                        <Tooltip content="Copy Link">
                          <IconButton variant="text" color={copied?"green":"gray"}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </CopyToClipboard>
                    </td> */}
                    </tr>
                  );
                }
              )
            ) : (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                You Dont have any links yet
              </Typography>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

SortableTable.propTypes = {
  TABLE_ROWS:PropTypes.array
}

export default SortableTable;
