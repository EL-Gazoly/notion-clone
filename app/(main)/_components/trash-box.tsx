"use client";

import { Spinner } from "@/components/Spinner";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Undo, Trash } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import ConfirmModel from "@/components/modals/confirm-model";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  if (documents === undefined)
    return (
      <div className=" h-full items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    );

  const onClick = (documentId: Id<"documents">) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Failed to restore document",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing document...",
      success: "Document removed",
      error: "Failed to remove document",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Filter by page title ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" h-7 px-2 focus-visible:ring-transparent bg-secondary"
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className=" hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className=" text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primray justify-between"
          >
            <span className=" truncate pl-2">{doc.title}</span>
            <div className=" flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                role="button"
                className=" rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                <Undo className=" h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModel onConfirm={() => onRemove(doc._id)}>
                <div>
                  <div
                    role="button"
                    className=" rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  >
                    <Trash className=" h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </ConfirmModel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
