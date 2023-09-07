import { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    // const cloudName = "meme-topia";
    // const uploadPreset = "kgw5hznb";

    var myWidget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'meme-topia',
        uploadPreset: 'kgw5hznb',
        folder: "Home/Cups", 
        tags: ["Cups"], 
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.secure_url);
          (document as any)
          .getElementById("uploadedimage")
          .setAttribute("src", result.info.secure_url);
        } else {
            console.log("Broken")
        }
      }
    );
    (document as any ).getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
