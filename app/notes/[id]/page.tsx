import { fetchNoteById } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NoteDetails({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <button>Edit</button>
    </div>
  );
}
