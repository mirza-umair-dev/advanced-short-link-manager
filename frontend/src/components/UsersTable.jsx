import {  BASE_URI } from "../utils/apiPaths";


const UsersTable = ({links}) => {

 
  const baseUrl = BASE_URI;

  

  return (
    <div className="border border-bd bg-surface rounded-2xl">
      <div className="px-4 py-5 font-semibold border-b border-bd">
        <h2 className="text-lg">Recent links</h2>
      </div>

      {links.length > 0 ? 
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-bd uppercase text-lightext text-sm text-left ">
            <th className="py-3 px-4">Short Link</th>
            <th className="py-3 px-4">Destination</th>
            <th className="py-3 px-4">Clicks</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {links.map((link) => (
            <tr key={link._id} className="border-t transition-all border-bd hover:bg-glasss">
              <td className="px-4 py-3">
                <div className="text-accent font-semibold bg-accentdim px-3 py-1 rounded-lg inline-block cursor-copy">{`${baseUrl}/${link.shortId}`}</div>
              </td>

              <td className="px-4 py-3">
                <div className="truncate cursor-default" title={link.originalLink}>{link.originalLink}</div>
              </td>
              <td className="px-4 py-3">
                <div>{link.clicks}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <div>
        No Links found!
      </div> }
    </div>
  );
};

export default UsersTable;
