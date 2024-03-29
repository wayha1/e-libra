import { Link } from "react-router-dom";

const Sidebar = ({ handleGoBack, activeComponent, isSmScreen, handleCategoryChange, categories }) => {
  const renderCategories = () => {
    if (isSmScreen) {
      return (
        <select
          value={activeComponent}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="z-40 mt-10 bg-gray-300 w-full h-[50px] text-lg cursor-pointer duration-300 border p-2"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      );
    }

    return (
      <ul className="mt-10">
        {categories.map((category) => (
          <li key={category.id} className="flex text-center">
            <Link
              to={category.path}
              className={`${
                activeComponent === category.name ? "bg-gray-600 text-white" : "bg-gray-300"
              } w-full h-[50px] text-lg cursor-pointer duration-300 border p-2`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    <div className="flex flex-col mt-5 w-[20%] max-sm:w-[50%] bg-white h-full book-title max-sm:absolute z-40">
      <button
        className="max-sm:mt-10 bg-gray-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
        onClick={handleGoBack}
      >
        Back
      </button>
      <div className="relative z-20">{renderCategories()}</div>
    </div>
  );
};

export default Sidebar;
