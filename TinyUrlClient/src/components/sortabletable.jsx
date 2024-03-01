/* eslint-disable no-unused-vars */
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";
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
  Chip,
} from "@material-tailwind/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DialogWithForm from "./DialogWithForm";
import { API_URL } from "../utils/api";
import { useState, useEffect } from "react";
import axios from "axios";

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

const TABLE_HEAD = ["Long Url", "Short", "Status", "Traffic", " "];

const SortableTable = ({ TABLE_ROWS }) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setData(TABLE_ROWS);
  }, [TABLE_ROWS]);

  const handleDelete = async (shortUrl) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${API_URL}/delete/${shortUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const upDateLinks = TABLE_ROWS.filter(
          (link) => link.shortUrl !== shortUrl
        );
        setData(upDateLinks);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const onCopyText = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleCopyClick = () => {
    onCopyText();
  };

  return (
    <div className="mt-35">
      {isLoading && (<div
          className="inline-block h-8 w-8 bg-gray-900 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-gray-800">
            Loading...
          </span>
        </div>
      )}
      <div className="h-full w-[80%] mx-auto">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div className="w-[100%] mx-auto">
              <Typography
                variant="h5"
                color="blue-gray"
                className="text-center"
              >
                Your Links
              </Typography>
              <Typography color="gray" className="mt-1 font-normal text-center">
                see all info and metrics related to your links
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
                        <ChevronUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(
                  ({ longUrl, shortUrl, expiryDate, clickCount }, index) => {
                    const isLast = index === data.length - 1;
                    const now = new Date();
                    const exp = new Date(expiryDate);
                    const newDate = new Date(exp.getTime() + 122 * 60 * 1000);
                    const status = newDate > now ? "Live" : "Expired";
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
                            <Tooltip
                              content={
                                status === "Live" ? "Visit Link" : "Expired"
                              }
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {status === "Live" ? (
                                  <a href={`${API_URL}/${shortUrl}`}>
                                    {shortUrl}
                                  </a>
                                ) : (
                                  shortUrl
                                )}
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
                              color={status == "Live" ? "green" : "red"}
                            />
                            {/* {newDate} */}
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
                        <td className={classes}>
                          {status == "Live" ? (
                            <CopyToClipboard
                              text={`${API_URL}/${shortUrl}`}
                              onCopy={() => setCopied(true)}
                            >
                              <button onClick={handleCopyClick}>
                                <Tooltip
                                  content={copied ? "Copied" : "Copy Link"}
                                >
                                  <Typography variant="text" color="gray">
                                    <PencilIcon className="h-4 w-4" />
                                  </Typography>
                                </Tooltip>
                              </button>
                            </CopyToClipboard>
                          ) : (
                            <Tooltip content="Delete Link">
                              <button
                                onClick={() => {
                                  handleDelete(shortUrl);
                                }}
                              >
                                <TrashIcon className="tex-red-500 h-4 w-4" />
                              </button>
                            </Tooltip>
                          )}
                        </td>
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
    </div>
  );
};

SortableTable.propTypes = {
  TABLE_ROWS: PropTypes.array,
};

export default SortableTable;
