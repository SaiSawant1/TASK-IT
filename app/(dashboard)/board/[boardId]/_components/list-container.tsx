"use client";
import { ListWithCards } from "@/types";
import { ListForm } from "./list-form";
import { useEffect, useState } from "react";
import { ListItem } from "./list-item";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/use-action";
import { UpdateListOrder } from "@/actions/update-list-order";
import useCurrentOrg from "@/store";
import { toast } from "sonner";
import { UpdateCardOrderInSameList } from "@/actions/update-card-order-same";
import { UpdateCardOrderInDifferentList } from "@/actions/update-card-order-different";

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);
  const { execute: updateListOrder } = useAction(UpdateListOrder, {
    onSuccess: (_) => {
      toast.success("List reordered");
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const { execute: updateCardOrderInSame } = useAction(
    UpdateCardOrderInSameList,
    {
      onSuccess: (_) => {
        toast.success("card order changed");
      },
      onError: (err) => {
        toast.error(err);
      },
    },
  );
  const { execute: updateCardOrderInDifferentList } = useAction(
    UpdateCardOrderInDifferentList,
    {
      onSuccess: (_) => {
        toast.success(`card moved to different list`);
      },
      onError: (err) => {
        toast.error(err);
      },
    },
  );
  const orgId = useCurrentOrg((state) => state.organizationId);
  useEffect(() => {
    setOrderedData(data);
  }, [data]);
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;
    if (!destination) return;
    // If dropped int the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //move a list
    if (type === "list") {
      let items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );
      setOrderedData(items);
      updateListOrder({ items, boardId }, orgId);
    }
    //user moves a card
    if (type == "card") {
      const newOrderedData = [...orderedData];

      //source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destList) {
        return;
      }
      //check if card exist on source lit
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destList.cards) {
        destList.cards = [];
      }
      //moving the card in same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );
        reorderedCards.forEach((card, index) => (card.order = index));
        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        updateCardOrderInSame({ items: reorderedCards, boardId }, orgId);
      } else {
        //user moves card to another list
        //Remove item from the source list
        const [moveCard] = sourceList.cards.splice(source.index, 1);

        //Assign new listId to moved card
        moveCard.listId = destination.droppableId;
        //add card to destination list
        destList.cards.splice(destination.index, 0, moveCard);
        sourceList.cards.forEach((card, index) => (card.order = index));
        destList.cards.forEach((card, index) => (card.order = index));
        setOrderedData(newOrderedData);
        updateCardOrderInDifferentList(
          {
            SourceCards: sourceList.cards,
            DestinationCards: destList.cards,
            destinationListId: destList.id,
            boardId,
          },
          orgId,
        );
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return <ListItem key={list.id} index={index} data={list} />;
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
