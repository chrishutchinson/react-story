export default {
  story: () => ({
    position: "relative",
    width: "100%",
    height: "100%"
  }),
  controls: () => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "space-between"
  }),
  page: ({ isActive }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF",
    opacity: isActive ? 1 : 0
  }),
  progress: () => ({
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0
  })
};
