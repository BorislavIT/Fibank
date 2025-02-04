import { ChangeEvent, useCallback, useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../authentication/userContext";
import { routerPaths } from "../../shared/constant";
import { usePeople } from "./api";
import { FiButton, FiInputText } from "../../base";
import { debounce } from "../../shared/utilts";
import { PeopleTableSkeleton, PeopleTable } from "./content";

import "./starWars.css";

export function StarWarsPage() {
  const { user } = useContext(UserContext);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const {
    data: people,
    error,
    isLoading,
    lastPage,
  } = usePeople(page, debouncedSearch);

  if (!user) {
    return <Navigate to={routerPaths.authenticate} />;
  }

  const debounceSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
    }, 300),
    []
  );

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setPage(1);
    debounceSearch(value);
  };

  return (
    <div className="starWarsPage">
      <h3>Welcome {user.username}</h3>
      {error && (
        <div className="starWarsPageError">
          <p>{error}</p>
        </div>
      )}
      <section className="peopleTableFilters">
        <span className="p-input-icon-left peopleTableSearchContainer">
          <i className="pi pi-search" />
          <FiInputText
            placeholder="Search"
            className="peopleTableSearch"
            value={search}
            onChange={onSearchChange}
          />
        </span>
      </section>
      {Boolean(isLoading) && <PeopleTableSkeleton />}
      {Boolean(!isLoading) && <PeopleTable people={people!} />}
      <section className="peopleTablePaginationContainer">
        <FiButton
          onClick={() => setPage(page - 1)}
          className="prevBtn"
          disabled={page > lastPage || page === 1}
        >
          Previous
        </FiButton>
        <FiButton
          onClick={() => setPage(page + 1)}
          className="nextBtn"
          disabled={page === lastPage || lastPage === 0}
        >
          Next
        </FiButton>
      </section>
    </div>
  );
}
