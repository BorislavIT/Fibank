import { useNavigate } from "react-router";
import { FiButton } from "../../base";
import { routerPaths } from "../../shared/constant";

import "./notFound.css";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFoundPageContainer">
      <h1>Page not found.</h1>
      <FiButton onClick={() => navigate(routerPaths.home)}>
        Navigate to home page
      </FiButton>
    </div>
  );
}
