/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import defaultImage from "assets/img/Upload.png";

const styles = {
  organizationUpload: {
    height: "206px",
    marginRight: "16px",
    border: "1px dashed #25345C",
    boxSizing: "border-box",
    borderRadius: "12px",
    background: "rgba(37, 52, 92, 0.05)",
  },
  pictureContainer: {
    width: "30px !important",
    height: "32px !important",
    margin: "80px auto 0 auto !important",
    backgroundColor: "transparent !important",
    border: "none !important",
    borderRadius: "0 !important",
  },
  txtChooseFile: {
    fontWeight: "normal",
    fontSize: "12px",
    lineHeight: "14px",
    textDecorationLine: "underline",
    color: "#25345C",
  }
};

const useStyles = makeStyles(styles);

export default function OrganizationUpload() {
  const classes = useStyles();

  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(defaultImage);
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };
    if (newFile) {
      reader.readAsDataURL(newFile);
    }
  };
  // eslint-disable-next-line
  const handleSubmit = e => {
    e.preventDefault();
    // this.state.file is the file/image uploaded
    // in this function you can save the image (this.state.file) on form submit
    // you have to call it yourself
  };
  return (
    <div className={ `picture-container ${classes.organizationUpload}` }>
      <div className={`picture ${ classes.pictureContainer }`}>
        <img src={imagePreviewUrl} className="picture-src" alt="..." />
        <input type="file" onChange={e => handleImageChange(e)} />
      </div>
      <div className={ `${classes.txtChooseFile}` }>Choose file</div>
    </div>
  );
}
