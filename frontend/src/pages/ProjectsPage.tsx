import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProjectList from "../components/ProjectList";
import WelcomeBand from "../components/WelcomeBand";
import CartSummary from "../components/CartSummary";

function Projects() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <WelcomeBand />
      <CartSummary />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default Projects;