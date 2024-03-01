import{ useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../utils/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DialogWithForm = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((cur) => !cur);
  };

  const [longUrl, setLongUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlChange = (e) => setLongUrl(e.target.value);
  const handleAliasChange = (e) => setAlias(e.target.value);
  const handleExpiresOnChange = (e) => setExpiryDate(e.target.value);

  const token = localStorage.getItem("token");
  const userId = jwtDecode(token).id;

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!longUrl) {
      toast("URL is required", {
        position: "top-right",
        hideProgressBar: false,
        type: "error",
        closeOnClick: true,
      });
      return;
    } else {
      try {
        const response = await axios.post(
          API_URL + "/generate",
          {
            longUrl,
            userId,
            alias,
            expiryDate
          },
          //add auth header
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response?.status === 200) {
          toast("Link created", {
            position: "top-right",
            hideProgressBar: false,
            type: "success",
            closeOnClick: true,
          });
          //clear form inputs
          setLongUrl("");
          setAlias("");
          setExpiryDate("");

          setIsLoading(false);
          handleOpen();
          window.location.reload();
        } else {
          setIsLoading(false);
          toast(response?.data?.message, {
            position: "top-right",
            hideProgressBar: false,
            type: "error",
            closeOnClick: true,
          });
        }
      } catch (error) {
        setIsLoading(false);
        toast(error || "An error occured", {
          position: "top-right",
          hideProgressBar: false,
          type: "error",
          closeOnClick: true,
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button
        onClick={handleOpen}
        className="flex items-center gap-3 bg-[#12A3ED]"
      >
        Create Link
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              className="mb-3 font-normal text-center"
              variant="paragraph"
              color="gray"
            >
              Generate short URL
            </Typography>
            <Input
              label="URL"
              placeholder="Long URL"
              size="lg"
              color="cyan"
              value={longUrl}
              onChange={handleUrlChange}
            />
            <Input
              label="Alias"
              placeholder="Alias"
              size="lg"
              color="cyan"
              value={alias}
              onChange={handleAliasChange}
            />
            <Input
              label="Expires On (optional)"
              placeholder="YYYY-MM-DD"
              size="lg"
              color="cyan"
              value={expiryDate}
              onChange={handleExpiresOnChange}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              onClick={handleFormSubmit}
              fullWidth
              className="bg-[#12A3ED]"
            >
              {isLoading ? "..." : "Generate"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default DialogWithForm;
