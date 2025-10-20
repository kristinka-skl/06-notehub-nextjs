import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "../../lib/api";

export default async function NotePage() {
  const queryClient = new QueryClient();
  const query = "";
  const currentPage = 1;

  await queryClient.prefetchQuery({
    queryKey: ["note", query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

// import { useEffect, useState } from "react";
// import css from "./App.module.css";
// import NoteList from "./Notes.client";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { fetchNotes } from "../../lib/api";
// import { useDebouncedCallback } from "use-debounce";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import Pagination from "../../components/Pagination/Pagination";
// import Modal from "../../components/Modal/Modal";
// import NoteForm from "../../components/NoteForm/NoteForm";
// import Loader from "../../components/Loader/Loader";
// import toast, { Toaster } from "react-hot-toast";

// export default function App() {
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const { data, isSuccess, isLoading, isError } = useQuery({
//     queryKey: ["note", query, currentPage],
//     queryFn: () => fetchNotes(query, currentPage),
//     placeholderData: keepPreviousData,
//   });

//   useEffect(() => {
//     if (isError) {
//       toast("Sorry, something went wrong, please try again");
//     }
//   }, [isError]);

//   const changeQuery = useDebouncedCallback((query: string) => {
//     setQuery(query);
//     setCurrentPage(1);
//   }, 1000);
//   return (
//     <>
//       <div className={css.app}>
//         <header className={css.toolbar}>
//           {<SearchBox onChange={changeQuery} />}
//           {isSuccess && data.totalPages > 1 && (
//             <Pagination
//               totalPages={data.totalPages}
//               onPageChange={({ selected }) => setCurrentPage(selected + 1)}
//               forcePage={currentPage - 1}
//             />
//           )}
//           {
//             <button className={css.button} onClick={openModal}>
//               Create note +
//             </button>
//           }
//         </header>
//         {isLoading && <Loader />}
//         <Toaster position="top-right" reverseOrder={false} />
//         {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
//         {isModalOpen && (
//           <Modal onClose={closeModal}>
//             <NoteForm onClose={closeModal} />
//           </Modal>
//         )}
//       </div>
//     </>
//   );
// }
