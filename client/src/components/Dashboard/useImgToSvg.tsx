import potrace from "potrace";

function useImgToSvg() {
  function convertImgToSvg(file: File) {
    // const fileBuffer = Buffer.from(file, "base64");
    potrace.trace("file", (err, svg) => {
      if (err) throw err;
      console.log(JSON.stringify(svg));
    });
  }

  return [convertImgToSvg];
}

export default useImgToSvg;

// {
//   /* testing svg */
// }
// <form
//   onSubmit={(e) => {
//     e.preventDefault();
//     setshowImgForm(false);
//   }}
// >
//   <label>Image File:</label>
//   <input
//     className="mx-1 border-2 rounded-md"
//     type="file"
//     accept="image/*"
//     // value={profile_img}
//     onChange={(e) => {
//       if (e.target.files) {
//         setimgFile(e.target.files[0]);
//       }
//     }}
//   />
//   <button className="mx-1 px-2 border rounded-md" type="submit">
//     upload
//   </button>
//   <button
//     className="px-2 border rounded-md"
//     onClick={(e) => {
//       e.preventDefault();
//       setshowImgForm((state) => !state);
//     }}
//   >
//     X
//   </button>
// </form>;
