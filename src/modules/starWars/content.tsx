import { IPeopleTableProps } from "./model";

export function PeopleTable(props: IPeopleTableProps) {
  const { people } = props;

  return (
    <>
      <table className="peopleTable">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Mass</th>
            <th scope="col">Height</th>
            <th scope="col">Hair color</th>
            <th scope="col">Skin color</th>
          </tr>
        </thead>
        <tbody>
          {people?.map((p, index) => (
            <tr key={p.name + index}>
              <td data-label="Name">{p.name}</td>
              <td data-label="Mass">{p.mass}</td>
              <td data-label="Height">{p.height}</td>
              <td data-label="Hair color">{p.hair_color}</td>
              <td data-label="Skin color">{p.skin_color}</td>
            </tr>
          ))}
          {people?.length === 0 && (
            <tr>
              <td colSpan={5}>
                <span className="noResultsMessage">No results found.</span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export function PeopleTableSkeleton() {
  return (
    <table className="peopleTable peopleTableSkeleton">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Mass</th>
          <th scope="col">Height</th>
          <th scope="col">Hair color</th>
          <th scope="col">Skin color</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((l, index) => (
          <tr key={index}>
            <td data-label="Name"></td>
            <td data-label="Mass"></td>
            <td data-label="Height"></td>
            <td data-label="Hair color"></td>
            <td data-label="Skin color"></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
