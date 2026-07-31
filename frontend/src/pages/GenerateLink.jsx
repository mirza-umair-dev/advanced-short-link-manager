import { useState } from "react";
import Button from "../components/Button";
import { instance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { toast } from "react-toastify";
import UserLayout from "../layouts/UserLayout";
import UsersTable from "../components/UsersTable";
import UseLinks from "../hooks/UseLinks";

const GenerateLink = () => {
    const { data } = UseLinks();

 const { latestLinks = [] } = data ?? {};
  const [originalLink, setoriginalLink] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const shortLink = async (e) => {
    try {
      e.preventDefault();
      setloading(true);
      const res = await instance.post(API_PATHS.LINK.GENERATE, {
        originalLink,
      });
      console.log(res);

      toast.success("Link Generated Successfully!");
    } catch (error) {
      seterror(
        error.res.data.message || error.message || "Something went wrong!",
      );
    } finally {
      setloading(false);
      setoriginalLink("");
    }
  };
  return (
    <UserLayout title={"Generate short Link"}>
      <div>
        <div className="flex flex-col">
          <form
            className="flex gap-4 py-6 flex-col"
            onSubmit={shortLink}
          >
            <div className="flex gap-4 items-center">
              <input type="text"
                placeholder="Paste link here..."
                className="px-3 py-2 rounded-lg transition-all bg-surface border-bd border outline-0 focus:border-accent2 font-light font-sm"
                value={originalLink}
                onChange={(e) => setoriginalLink(e.target.value)}
              />

              <Button
                value={loading ? "Generating..." : "Generate"}
                disabled={loading}
              />
            </div>
            {error && <p>{error}</p>}
          </form>

          <div>
            <UsersTable links={latestLinks}/>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default GenerateLink;
