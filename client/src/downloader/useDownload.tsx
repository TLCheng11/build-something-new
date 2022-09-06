import JSZip from "jszip";
import { saveAs } from "file-saver";
import { showModelComponent } from "./ShowModel";
import { readmeText } from "./README";

function useDownload(fileName: string) {
  const OBJ = { one: [{ one: "one" }], two: [{ two: "two" }] };
  const newObj = JSON.stringify(OBJ);

  // zipping files
  const zip = new JSZip();

  zip.file("README.md", readmeText);
  const folder = zip.folder(`model`);
  if (folder) {
    folder.file("model.json", newObj);
    folder.file("ShowModel.tsx", showModelComponent);
  }

  function handleZip() {
    console.log("zipping");
    zip.generateAsync({ type: "blob" }).then((content) => {
      // see FileSaver.js
      saveAs(content, `${fileName}.zip`);
    });
  }

  return [handleZip];
}

export default useDownload;
