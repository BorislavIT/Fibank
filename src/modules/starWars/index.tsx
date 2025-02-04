import { ChangeEvent, useCallback, useContext, useState } from "react";
import { Navigate } from "react-router";
import { UserContext } from "../authentication/userContext";
import { routerPaths } from "../../shared/constant";
import { usePeople } from "./api";
import { FiButton, FiInputText } from "../../base";
import { debounce } from "../../shared/helper";
import { PeopleTableSkeleton, PeopleTable } from "./content";
import { debounceDelay } from "./constant";

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
    }, debounceDelay),
    []
  );

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setPage(1);
    debounceSearch(value);
  };

  const isPreviousBtnDisabled = page > lastPage || page === 1;
  const isNextBtnDisabled = page === lastPage || lastPage === 0;

  return (
    <div className="starWarsPage">
      <h3>Welcome {user.username}</h3>
      {Boolean(error) && (
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
          disabled={isPreviousBtnDisabled}
        >
          Previous
        </FiButton>
        <FiButton
          onClick={() => setPage(page + 1)}
          className="nextBtn"
          disabled={isNextBtnDisabled}
        >
          Next
        </FiButton>
      </section>
    </div>
  );
}
