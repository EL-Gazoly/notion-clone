"use client";
import Item from "./item";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { Id, Doc } from "@/convex/_generated/dataModel";

type DocumentListProps = {
  parentDocumentId?: Id<"documents">;
  level?: number;
  documents?: Doc<"documents">[];
};
const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expand, setExpand] = useState<Record<string, boolean>>({});

  const document = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const handleExpand = (id: string) => {
    setExpand((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onRedirect = (id: Id<"documents">) => {
    router.push(`/documents/${id}`);
  };
  if (document === undefined) {
    return (
      <>
        <Item.skeleton level={level} />
        {level === 0 && (
          <>
            <Item.skeleton level={level} />
            <Item.skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className={cn(
          ` hidden text-sm font-medium text-muted-foreground/80 `,
          expand && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages Inside
      </p>
      {document.map((doc) => (
        <div key={doc._id}>
          <Item
            Id={doc._id}
            label={doc.title}
            documentIcon={doc.icon}
            Icon={FileIcon}
            active={params.documentId === doc._id}
            expanded={expand[doc._id]}
            level={level}
            onClick={() => onRedirect(doc._id)}
            onExpand={() => handleExpand(doc._id)}
          />
          {expand[doc._id] && (
            <DocumentList parentDocumentId={doc._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
