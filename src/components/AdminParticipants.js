import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AdminParticipants = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [removal, setRemoval] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [disable, setDisable] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    const response = await axios.get(
      "https://rotarcthitk-voting-application.herokuapp.com/getParticipants"
    );
    setParticipants(response.data);
    console.log(response.data);
  };

  const handleClose = () => {
    setOpen(false);
    fetchParticipants();
  };

  const handleAddParticipants = async (e) => {
    e.preventDefault();
    setDisable(true);
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/admin/addParticipants",
      method: "post",
      withCredentials: true,
      data: {
        name,
      },
    });

    if (response.status === 201) {
      setOpen(true);
      setName("");
    }
    setDisable(false);
  };

  const deleteParticipants = async () => {
    setDisableBtn(true);
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/admin/deleteParticipants",
      method: "post",
      withCredentials: true,
    });
    if (response.status === 200) {
      fetchParticipants();
    }
    setDisableBtn(false);
  };

  return (
    <div className="participants">
      <Card className="participant-details">
        <CardContent>
          <p className="pdetails-h">Participants Details</p>
          <Divider />
          {participants.map((participant) => (
            <div key={participant._id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p className="pdetails-p">{participant.name}</p>
                <p className="pdetails-p">{participant.votes}</p>
              </div>
              <Divider />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="participant-form">
        <CardContent>
          <p className="pform-p">Add Participants</p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "20vh",
              justifyContent: "space-around",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Name of Participants"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddParticipants}
              disabled={disable}
            >
              {disable ? "Please Wait" : "Add Participants"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Button
        style={{ marginTop: "15px" }}
        variant="contained"
        color="secondary"
        onClick={deleteParticipants}
        disabled={disableBtn}
      >
        {disableBtn ? "Please Wait" : "Delete all Participants"}
      </Button>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="User Created"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default AdminParticipants;
