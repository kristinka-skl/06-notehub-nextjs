"use client";

import type { Note } from "../../types/note";
import css from "../../components/NoteList/NoteList.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export default function NotesClient() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["note", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      toast("Sorry, something went wrong, please try again");
    }
  }, [isError]);

  const changeQuery = useDebouncedCallback((query: string) => {
    setQuery(query);
    setCurrentPage(1);
  }, 1000);
  return (
    <ul className={css.list}>
      {isSuccess &&
        data.notes.length > 0 &&
        data.notes.map((note) => {
          return <NoteList key={note.id} note={note} />;
        })}
    </ul>
  );
}
