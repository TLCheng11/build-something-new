import { useState } from "react";

function AdminUpload() {
  const [modalData, setModalData] = useState<string>("");

  function uploadData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const jsonData = JSON.parse(modalData);
    // console.log(jsonData);
    fetch("/model_upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: modalData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          alert(data.errors);
        } else if (data.messages) {
          alert(data.messages);
        }
      });
    setModalData("");
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
