import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

const VoteParticipants = () => {
  let { token } = useParams();

  const [participants, setParticipants] = useState([]);
  const [value, setValue] = useState("");
  const [voter, setVoter] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [allow, setAllow] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://rotarcthitk-voting-application.herokuapp.com/voteVoter/gauravmishra.190699@gmail.com",
      { ParticipantId: value }
    );
    window.location.reload();
  };

  useEffect(() => {
    validateVoter();
  }, []);

  const validateVoter = async () => {
    try {
      const url = `https://rotarcthitk-voting-application.herokuapp.com/validateEmail/${token}`;
      const response = await axios.post(url);
      if (response.status === 200) {
        setVoter(response.data);
        setAllow(true);
        fetchParticipants();
      }
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    } catch (e) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
      console.log(e);
    }
  };

  const fetchParticipants = async () => {
    const response = await axios.get(
      "https://rotarcthitk-voting-application.herokuapp.com/getParticipantsVoter"
    );
    setParticipants(response.data);
  };

  return (
    <>
      {loaded ? (
        <>
          {allow ? (
            <div
              style={{
                minHeight: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "aliceblue",
              }}
            >
              {voter.voted ? (
                <p
                  className="voter-p"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Thank You for voting. Please proceed to the meeting and wait
                  for the results
                </p>
              ) : (
                <>
                  <h1 style={{ marginBottom: "10px" }}>Hello {voter.name}</h1>
                  <p className="voter-p" style={{ fontWeight: "bold" }}>
                    Welcome to the Panel Discussion 2021!
                  </p>
                  <p className="voter-p" style={{ fontWeight: "bold" }}>
                    You have {voter.quantityVotes} vote left
                  </p>
                  <p className="voter-p" style={{ textAlign: "center" }}>
                    Please cast your vote by selecting the desired participant.
                  </p>
                  <Card className="voter-card">
                    <CardContent>
                      <FormControl className="form-voter" component="fieldset">
                        <FormLabel
                          className="form-voter-heading"
                          component="legend"
                        >
                          Candidates
                        </FormLabel>
                        <RadioGroup
                          aria-label="Candidates"
                          name="Candidates"
                          value={value}
                          onChange={handleChange}
                          className="form-voter-options"
                        >
                          {participants.map((participant) => (
                            <FormControlLabel
                              key={participant._id}
                              value={participant._id}
                              control={<Radio />}
                              label={participant.name}
                            />
                          ))}
                        </RadioGroup>
                        <Button
                          type="button"
                          variant="outlined"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          Vote
                        </Button>
                      </FormControl>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "90vh",
              }}
            >
              <p>You may be seeing this message for various reasons.</p>
              <p>1. Time for voting is up.</p>
              <p>2. You are not authorized to see this content</p>
              <p>Contact Malisa Ghosh if you think this is a mistake.</p>
            </div>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "90vh",
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default VoteParticipants;
