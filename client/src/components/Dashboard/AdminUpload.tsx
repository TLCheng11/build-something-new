import { useState } from "react";

function AdminUpload() {
  const [modalData, setModalData] = useState<string>("");

  function uploadData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(modalData);
  }

  return (
    <div className="mt-20 px-2 py-1 rounded bg-blue-400">
      <form onSubmit={uploadData}>
        <div>
          <label>Model Data:</label>
        </div>
        <div>
          <textarea
            className="w-full border-2 rounded-md"
            value={modalData}
            onChange={(e) => setModalData(e.target.value)}
          />
        </div>
        <button className="mx-1 px-2 border rounded-md" type="submit">
          upload
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;
