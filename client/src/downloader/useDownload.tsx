import JSZip from "jszip";
import { saveAs } from "file-saver";
import { showModelComponent } from "./ShowModel";
import { readmeText } from "./README";

function useDownload() {
  function handleZip(fileName: string, data: any) {
    const jsonData = JSON.stringify(data);

    // zipping files
    const zip = new JSZip();

    zip.file("README.md", readmeText);
    const folder = zip.folder(`model`);
    if (folder) {
      folder.file("model.json", jsonData);
      folder.file("ShowModel.tsx", showModelComponent);
    }

    // console.log("zipping");
    zip.generateAsync({ type: "blob" }).then((content) => {
      // see FileSaver.js
      saveAs(content, `${fileName}.zip`);
    });
  }

  return [handleZip];
}

export default useDownload;
