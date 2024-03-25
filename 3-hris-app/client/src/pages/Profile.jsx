import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const { emp_code } = useParams();
  async function fetchDetail() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/employee/${emp_code}`
      );
      const data = await response.json();
      setDetail(data.data);
    } catch (error) {
      console.log(error, "<< di profile");
    }
  }
  console.log(detail);

  useEffect(() => {
    fetchDetail();
  }, []);
  return (
    <div className="max-w-screen p-20">
      <section className="overflow-x-auto my-5">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content mask mask-squircle w-20">
            <span className="text-3xl">
              {detail?.name
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{detail?.name}</span>
          <span className="text-md font-medium">{detail?.position.name}</span>
        </div>
      </section>
      <section>
        <div className="bg-white p-3 shadow-sm rounded-sm">
          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
            <span className="text-gray-500">
              <svg
                className="h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
            <span className="tracking-wide">About</span>{" "}
            <span className="text-xs font-thin">
              Last updated: {detail?.last_updated}
            </span>
          </div>
          <div className="text-gray-700">
            <div className="grid md:grid-cols-2 text-sm">
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Employment Type</div>
                <div className="px-4 py-2">{detail?.employment_type}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Contact No.</div>
                <div className="px-4 py-2">
                  {detail?.phone ? detail.phone : "-"}
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Current Address</div>
                <div className="px-4 py-2">{detail?.address}</div>
              </div>

              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Email.</div>
                <div className="px-4 py-2">
                  <a className="text-blue-800" href="#">
                    {detail?.email}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Manager</div>
                <div className="px-4 py-2">{detail?.manager_employee.name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="px-4 py-2 font-semibold">Joined Since</div>
                <div className="px-4 py-2">{detail?.join_date}</div>
              </div>
            </div>
          </div>
          <button
            className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
            onClick={() => navigate(`/edit/${detail.emp_code}`)}
          >
            Edit Data
          </button>
        </div>
      </section>
    </div>
  );
}
