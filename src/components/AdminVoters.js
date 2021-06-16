import {
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

const AdminVoters = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [votes, setVotes] = useState("");
  const [open, setOpen] = useState(false);
  const [voters, setVoters] = useState([]);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/admin/getVoters",
      method: "get",
      withCredentials: true,
    });
    setVoters(response.data);
  };

  const sendEmail = async () => {
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/sendMailtoVoters",
      method: "post",
      withCredentials: true,
    });
    if (response.status === 200) {
      setOpen1(true);
    }
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose = () => {
    setOpen(false);
    fetchVoters();
  };

  const handleAddVoters = async (e) => {
    e.preventDefault();
    const response = await axios({
      url: "https://rotarcthitk-voting-application.herokuapp.com/admin/addVoters",
      method: "post",
      withCredentials: true,
      data: {
        name,
        email,
        quantityVotes: votes,
      },
    });

    if (response.status === 201) {
      setOpen(true);
      setName("");
      setEmail("");
      setVotes("");
    }
  };
  return (
    <div className="participants">
      <Card className="participant-details">
        <CardContent>
          <p className="pdetails-h">Voters Details</p>
          <Divider />
          {voters.map((voter) => (
            <div key={voter._id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p className="pdetails-p">{voter.name}</p>
                {voter.voted ? (
                  <p className="pdetails-p">Voted</p>
                ) : (
                  <p className="pdetails-p">Not Voted</p>
                )}
              </div>
              <Divider />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="participant-form">
        <CardContent>
          <p className="pform-p">Add Voters</p>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "20vh",
              justifyContent: "space-around",
            }}
          >
            <TextField
              style={{ marginBottom: "15px" }}
              id="outlined-basic"
              label="Name of Voter"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              style={{ marginBottom: "15px" }}
              id="outlined-basic"
              label="Email of Voter"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              style={{ marginBottom: "15px" }}
              id="outlined-basic"
              label="No of Votes"
              variant="outlined"
              value={votes}
              onChange={(e) => {
                setVotes(e.target.value);
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddVoters}
            >
              Add Voter
            </Button>
          </form>
        </CardContent>
      </Card>
      <Button
        style={{ marginTop: "15px" }}
        variant="contained"
        color="secondary"
        onClick={sendEmail}
      >
        Send Email to Voters
      </Button>
      {/* <Card>
        <CardContent></CardContent>
      </Card> */}
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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open1}
        autoHideDuration={3000}
        onClose={handleClose1}
        message="Emails Sent"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose1}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default AdminVoters;
