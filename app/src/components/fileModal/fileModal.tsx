import React, { useContext, useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useParams } from "react-router-dom";
import prettyBytes from "pretty-bytes";
import moment from "moment";

import useStyles from "./fileModalStyles";
import FilePreview from "../filePreview/filePreview";
import FileCard from "../cards/fileCard";
import ButtonPill from "../buttonPill/buttonPill";
import { ThemeContext } from "../../store/themeContext/themeContext";
import { StoreContext } from "../../store/store";
import urlPath from "../../store/helpers/urlPath";
import writePath from "../../store/helpers/writePath";
import { fileDownload, filePreview, receiveFileInfo } from "../../store/services/fairOS";

export interface Props {
  file: any;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadFile?: boolean;
}

function FileModal(props: Props) {
  const { state, actions } = useContext(StoreContext);
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = React.useState(false);
  const { file } = props;

  const params: any = useParams();
  const path = params.path;
  const [fileSize, setFileSize] = useState("");
  const [fileCreateDate, setFileCreateDate] = useState("");
  const [fileModDate, setFileModDate] = useState("");

  useEffect(() => {
    if (file.size) {
      setFileSize(prettyBytes(parseInt(file.size)));
      setFileCreateDate(moment.unix(file.creation_time).format("DD/MM/YYYY"));
      setFileModDate(moment.unix(file.modification_time).format("DD/MM/YYYY"));
    }
  }, [file]);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleDownload() {
    const newPath = writePath(path);
    await fileDownload(newPath + props.file.name, props.file.name).catch((e) =>
      console.error(e)
    );
  }

  const classes = useStyles({ ...props, ...theme });

  return (
    <div>
      <div onClick={handleOpen}>
        <FileCard file={props.file} />
      </div>
      <Modal
        className={classes.modalContainer}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.fileModal} onClick={handleOpen}>
          <div className={classes.header}>Previewing File</div>

          <div className={classes.iconContainer}>
            <FilePreview contentType={file.content_type} downloadUrl={writePath(path) + file.name} />
          </div>

          <p className={classes.title}>{file.name}</p>
          <div className={classes.fileInfoContainer}>
            <div className={classes.leftContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>Created</p>
                <p>{fileCreateDate}</p>
              </div>
              <div>
                <p className={classes.label}>File size</p>
                <p>{fileSize}</p>
              </div>
            </div>
            <div className={classes.rightContainer}>
              <div className={classes.pair}>
                <p className={classes.label}>Modified</p>
                <p>{fileModDate}</p>
              </div>
              <div>
                <p className={classes.label}>File type</p>
                <p>{file.content_type}</p>
              </div>
            </div>
          </div>
          <div>
            <ButtonPill
              clickFunction={handleDownload}
              text={"Download"}
              textColor={"white"}
            ></ButtonPill>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(FileModal);
