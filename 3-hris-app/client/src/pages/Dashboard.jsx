import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

export const positions = [
  { key: 1, value: "Direktur" },
  { key: 2, value: "Project Coordinator" },
  { key: 3, value: "Design Lead" },
  { key: 4, value: "Project Lead" },
  { key: 5, value: "Technical Lead" },
  { key: 6, value: "UI/UX Designer" },
  { key: 7, value: "Project Manager" },
  { key: 8, value: "Developer" },
];

let emp_type = [
  {
    key: "Permanent",
    value: "Permanent",
  },
  {
    key: "Contract",
    value: "Contract",
  },
];

let sortBy = [
  {
    key: "name",
    value: "Name",
  },
  {
    key: "job_position",
    value: "Job Position",
  },
  {
    key: "join_date",
    value: "Join Date",
  },
  {
    key: "last_updated",
    value: "Last Updated",
  },
];
function Dropdown({ name, handleItemClick, data, option }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown dropdown-hover" onBlur={closeDropdown}>
      <div
        tabIndex={0}
        role="button"
        className="btn m-1"
        onClick={toggleDropdown}
      >
        {name}
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ${
          isOpen ? "open" : ""
        }`}
      >
        {data?.map((item) => {
          return (
            <li key={item.key}>
              <a
                onClick={() => {
                  handleItemClick(item.key, option);
                }}
                data-value={item.key}
              >
                {item.value}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [pagination, setPagination] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  async function fetchData() {
    try {
      let response;
      if (query) {
        response = await fetch(
          `http://localhost:3000/api/v1/employee?page=${pagination}&${query}`
        );
      } else {
        response = await fetch(
          `http://localhost:3000/api/v1/employee?page=${pagination}`
        );
      }
      const data = await response.json();
      setData(data?.data);
      setTotalPage(data?.data?.totalPage);
    } catch (error) {
      console.log(error, "<<< error fetchData");
    }
  }

  useEffect(() => {
    fetchData();
  }, [pagination, query]);

  const handleDropdownFilter = (value, category) => {
    setQuery(`filters[${category}]=${value}`);
  };

  const handleDropdownSort = (value, option) => {
    setQuery(`sort=${value}`);
  };
  return (
    <>
      <div className="flex flex-col max-w-screen p-20 ">
        <section className="flex flex-row align-middle  justify-between">
          <button
            className="flex justify-start btn m-1 "
            onClick={() => navigate("/Add")}
          >
            Add Data
          </button>
          <div className="flex justify-end ">
            <Dropdown
              name="Sort by:"
              data={sortBy}
              handleItemClick={handleDropdownSort}
              option="sort"
            />

            <button>Filter: </button>
            <Dropdown
              name="Position"
              data={positions}
              handleItemClick={handleDropdownFilter}
              option="job_position"
            />
            <Dropdown
              name="Employement Type"
              data={emp_type}
              handleItemClick={handleDropdownFilter}
              option="employment_type"
            />
          </div>
        </section>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th className="text-sm">Name</th>
                <th className="text-sm">Job Position</th>
                <th className="text-sm">Employment Type</th>
                <th className="text-sm">Last Updated</th>
                <th className="text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-12">
                            <span className="text-sm">
                              {item.name
                                .split(" ")
                                .map((word) => word.charAt(0))
                                .join("")}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm">{item?.position?.name}</td>
                    <td className="text-sm">{item?.employment_type}</td>
                    <td className="text-sm">{item.last_updated}</td>
                    <td className="text-sm">
                      <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => navigate(`/${item.emp_code}`)}
                      >
                        details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
          </table>
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
            totalPage={totalPage}
          />
        </div>
      </div>
    </>
  );
}
