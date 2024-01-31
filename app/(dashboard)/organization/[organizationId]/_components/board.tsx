import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";

interface BoardProps {
  title: string;
  id: string;
}
export const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);
  return (
    <form
      action={deleteBoardWithId}
      className="flex items-center gap-x-2 "
      key={id}
    >
      <p>{title}</p>
      <Button type="submit" size={"sm"} variant={"destructive"}>
        Delete
      </Button>
    </form>
  );
};
