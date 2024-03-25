import { useNavigate } from "react-router-dom";
import { positions } from "./Dashboard";

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

export default function Add() {
  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:3000/api/v1/employee", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-8">
          <h1 className="text-left text-4xl font-bold">
            Add New Employee Data
          </h1>
          <p className="text-left mt-2 text-lg text-gray-600">
            Fill the form with employee data
          </p>
        </div>
        <div className="py-12">
          <form onSubmit={handleSubmit}>
            <div className="mt-8 max-w-md">
              <div className="grid grid-cols-1 gap-6">
                <label className="block">
                  <span className="text-gray-700">Full name</span>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder=""
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Email</span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="john@example.com"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Address</span>
                  <input
                    type="text"
                    name="address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Phone</span>
                  <input
                    type="number"
                    name="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Employment Type</span>
                  <select
                    name="employment_type"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option defaultValue={"DEFAULT"} disabled>
                      Select
                    </option>
                    <option key={1} value="Permanent">
                      Permanent
                    </option>
                    <option key={2} value="Contract">
                      Contract
                    </option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-gray-700">Join Date</span>
                  <input
                    type="date"
                    name="join_date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Position</span>
                  <select
                    name="job_position"
                    className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option defaultValue={"DEFAULT"} disabled>
                      Select position
                    </option>
                    {positions.map((position) => {
                      return (
                        <option key={position.key} value={position.key}>
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
                        <option key={manager.emp_code} value={manager.emp_code}>
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
