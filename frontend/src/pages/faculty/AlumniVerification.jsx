import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Filter, Download, Eye, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "react-toastify";

const AlumniVerification = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  // Fetch pending requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/alumni/get-all-alumni");
      const pendingRequests = res.data.filter(r => r.verificationStatus === "pending");
      setRequests(pendingRequests || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch requests.");
    } finally {
      setLoading(false);
    }
  };

  // Update verification status
  const updateStatus = async (request, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/alumni/${request.email}/status`,
        { requestId: request._id, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistic UI update
      setRequests(prev =>
        prev.map(r => (r._id === request._id ? { ...r, verificationStatus: newStatus } : r))
      );

      toast.success(`Request ${newStatus}`);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  // Filter requests by search
  const filteredRequests = requests.filter(
    r =>
      r.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      r.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* <h1 className="text-3xl font-bold text-gray-900">Alumni Verification</h1> */}
        {/* <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div> */}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search alumni..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alumni</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">Loading...</td>
                </tr>
              ) : filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{request.name || "-"}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{request.email || "-"}</td>
                    {/* <td className="px-6 py-4 text-sm text-gray-900">{request.type || "-"}</td> */}
                    <td className="px-6 py-4">
                      {request.verificationStatus === "pending" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="w-3 h-3 mr-1" />
                          {request.verificationStatus}
                        </span>
                      )}
                      {request.verificationStatus === "verified" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {request.verificationStatus}
                        </span>
                      )}
                      {request.verificationStatus === "rejected" && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="w-3 h-3 mr-1" />
                          {request.verificationStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">No pending requests.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-y-auto max-h-[90vh] p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Request Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div><span className="font-semibold">Alumni:</span> {selectedRequest.name || "-"}</div>
              <div><span className="font-semibold">Email:</span> {selectedRequest.email || "-"}</div>
              {/* <div><span className="font-semibold">Type:</span> {selectedRequest.type || "-"}</div> */}
              <div><span className="font-semibold">Title:</span> {selectedRequest.title || "-"}</div>
              <div className="sm:col-span-2"><span className="font-semibold">Description:</span> {selectedRequest.description || "-"}</div>
              <div><span className="font-semibold">Department:</span> {selectedRequest.department || "-"}</div>
              <div><span className="font-semibold">Company:</span> {selectedRequest.company || "-"}</div>
              <div><span className="font-semibold">Duration:</span> {selectedRequest.duration || "-"}</div>
              <div><span className="font-semibold">Position:</span> {selectedRequest.position || "-"}</div>
              <div><span className="font-semibold">Salary:</span> {selectedRequest.salary || "-"}</div>
              <div className="sm:col-span-2"><span className="font-semibold">Placement Process:</span> {selectedRequest.placementProcess || "-"}</div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => updateStatus(selectedRequest, "verified")} className="flex items-center justify-center space-x-2 px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <CheckCircle className="h-5 w-5" />
                <span>Verify</span>
              </button>
              <button onClick={() => updateStatus(selectedRequest, "rejected")} className="flex items-center justify-center space-x-2 px-5 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                <XCircle className="h-5 w-5" />
                <span>Reject</span>
              </button>
              <button onClick={() => setShowModal(false)} className="px-5 py-2 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniVerification;
