"use client";

import { Card } from "@prisma/client";
import { Draggable } from "@hello-pangea/dnd";
import { useCardModal } from "@/hooks/use-card-modal";
import { cn, customColorMap } from "@/lib/utils";
interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const cardModal = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => cardModal.onOpen(data.id)}
          ref={provided.innerRef}
          role="button"
          className={cn(
            `truncate border-2  border-transparent transform transition  hover:border-black py-2 px-3 text-sm  rounded-md shadow-sm`,
            customColorMap(data.bg),
          )}
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
