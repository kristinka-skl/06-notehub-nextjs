import { Note } from "@/types/note";
import css from "./NoteList.module.css";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { deleteNote } from "@/lib/api";
import toast from "react-hot-toast";
interface NoteListProps {
  note: Note;
}
export default function NoteList({ note }: NoteListProps) {
  const queryClient = new QueryClient();
  const { mutate } = useMutation({
    mutationFn: (id: Note["id"]) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note"],
      });
    },
    onError: () => toast("Sorry, something went wrong, please try again"),
  });
  return (
    <li className={css.listItem} key={note.id}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <div className={css.footer}>
        <span className={css.tag}>{note.tag}</span>
        <button className={css.button} onClick={() => mutate(note.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
