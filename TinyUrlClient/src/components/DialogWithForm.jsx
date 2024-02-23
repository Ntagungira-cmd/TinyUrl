import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import {UserPlusIcon } from "@heroicons/react/24/solid";

const DialogWithForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="flex items-center gap-3 bg-[#12A3ED]"
      >
        <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
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
              Generate short url for your long url
            </Typography>
          
            <Input label="long url" size="lg" />
            <Input label="alias" size="lg" />
            <Input label="YYYY-MM-DD(optional)" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleOpen} fullWidth className="bg-[#12A3ED]">
              Generate
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default DialogWithForm;
