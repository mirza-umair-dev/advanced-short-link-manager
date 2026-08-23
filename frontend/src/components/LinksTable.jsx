import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { instance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import DeleteModel from "./DeleteModel";
import { BASE_URI } from "../utils/apiPaths";

function LinksTable({ links }) {
  const [selectedLink, setselectedLink] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDeleteLink = (shortId) => {
    console.log("Clicked", shortId);
    setselectedLink(shortId);
    setOpenModal(true);
    
    console.log(selectedLink);
  };

  const deleteLink = async () => {
    try {
      setLoading(true);
      console.log(`/${selectedLink}`);

      const res = await instance.delete(`/${selectedLink}`);
      toast.success(res.data.message);

      setOpenModal(false);

      setselectedLink(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const baseUrl = BASE_URI;
  return (
    <div className="border border-bd bg-surface rounded-2xl">
      <div className="px-4 py-5 font-semibold border-b border-bd">
        <h2 className="text-lg">Recent links</h2>
      </div>

      {links.length > 0 ? (
        <>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-bd uppercase text-lightext text-sm text-left ">
                <th className="py-3 px-4">Short Link</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">Delete</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {links.map((link) => (
                <tr
                  key={link._id}
                  className="border-t transition-all border-bd hover:bg-glasss"
                >
                  <td className="px-4 py-3">
                    <div className="text-accent font-semibold bg-accentdim px-3 py-1 rounded-lg inline-block cursor-copy">{`${baseUrl}/${link.shortId}`}</div>
                  </td>

                  <td className="px-4 py-3">
                    <div
                      className="truncate cursor-default"
                      title={link.originalLink}
                    >
                      {link.originalLink}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>{link.clicks}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <button onClick={() => handleDeleteLink(link.shortId)}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-glasss border border-bd hover:bg-red-100 ">
                          <AiFillDelete size={20} fill="red" />
                        </div>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DeleteModel
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={deleteLink}
            loading={loading} />
        </>
      ) : (
        <div className="px-4 py-3">No Links found!</div>
      )}
    </div>
  );
}

export default LinksTable;
