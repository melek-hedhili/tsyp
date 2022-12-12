import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
    height: "100px",
    cursor: "pointer",
  },
  mapContainer: {
    height: "85vh",
    width: "100%",
    marginTop: 20,
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  typography: {
    fontSize: 10,
    textAlign: "center",
  },
}));
