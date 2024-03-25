import { useNavigate, useParams } from "react-router-dom";
import { positions } from "./Dashboard";
import { useEffect, useState } from "react";

export const managers = [
  {
    emp_code: "A0001",
    name: "Wati Waruwu",
  },
  {
    emp_code: "A0002",
    name: "Astuti Aisyah",
  },
  {
    emp_code: "A0003",
    name: "Salma Rohimah",
  },
  {
    emp_code: "A0004",
    name: "Citra Hadi",
  },
  {
    emp_code: "A0005",
    name: "Yanti Susilawati",
  },
];

export default function EditProfile() {
  const { emp_code } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);

  async function fetchDetail() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/employee/${emp_code}`
      );
      const data = await response.json();
      setDetail(data.data);
    } catch (error) {
      console.log(error, "<< di edit");
    }
  }
  useEffect(() => {
    fetchDetail();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      employment_type: formData.get("employment_type"),
      join_date: formData.get("join_date"),
      job_position: Number(formData.get("job_position")),
      manager: formData.get("manager"),
    };
    try {
      console.log(data);
      const response = await fetch(
        `http://localhost:3000/api/v1/employee/${emp_code}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        navigate(`/${emp_code}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto pt-2 divide-y md:max-w-4xl">
        <div className="py-8">
          <h1 className="text-left text-4xl font-bold">Edit Employee Data</h1>
          <p className="text-left mt-2 text-lg text-gray-600">
            Fill the form with new employee data
          </p>
        </div>
        <div className="py-2">
          <form onSubmit={handleSubmit}>
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Full name</span>
                  <input
                    type="text"
                    name="name"
                    defaultValue={detail?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder=""
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    defaultValue={detail?.email}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="john@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Address</span>
                  <input
                    type="text"
                    name="address"
                    defaultValue={detail?.address}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Phone</span>
                  <input
                    type="number"
                    name="phone"
                    defaultValue={detail?.phone}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Employment Type</span>
                  <select
                    name="employment_type"
                    defaultValue={detail?.employment_type}
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option defaultValue={"DEFAULT"} disabled>
                      Select
                    </option>
                    <option value="Permanent">Permanent</option>
                    <option value="Contract">Contract</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Join Date</span>
                  <input
                    type="date"
                    name="join_date"
                    defaultValue={detail?.join_date}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Position</span>
                  <select
                    name="job_position"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {positions.map((position) => {
                      return (
                        <option
                          key={position.key}
                          value={position.key}
                          selected={detail?.job_position}
                        >
                          {position.value}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Manager</span>
                  <select
                    name="manager"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option defaultValue={"DEFAULT"} disabled>
                      Select manager
                    </option>
                    {managers.map((manager) => {
                      return (
                        <option
                          key={manager.emp_code}
                          value={manager.emp_code}
                          selected={detail?.manager}
                        >
                          {manager.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <button type="submit" className="btn mt-5">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
