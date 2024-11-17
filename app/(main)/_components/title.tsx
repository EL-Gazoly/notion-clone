import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type TitleProps = {
  initalData: Doc<"documents">;
};
const Title = ({ initalData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initalData.title || "Untitled");

  const update = useMutation(api.documents.update);

  const enableInput = () => {
    setTitle(initalData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({ id: initalData._id, title: event.target.value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  return (
    <div className=" flex items-center gap-x-1">
      {!!initalData.icon && <p>{initalData.icon}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          className=" h-7 px-2 focus-visible:ring-transparent"
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          value={title}
        />
      ) : (
        <Button
          className=" font-normal h-auto p-1"
          variant={"ghost"}
          onClick={enableInput}
          size={"sm"}
        >
          <span className=" truncate">{initalData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className=" h-6 w-20 rounded-md" />;
};
