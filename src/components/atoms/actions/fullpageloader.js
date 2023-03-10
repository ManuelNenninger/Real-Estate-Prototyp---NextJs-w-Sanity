import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import SectionWrapper from "src/components/atoms/wrapperElements/sectionWrapper";

export default function Fullpageloader() {
  return (
    <SectionWrapper fullViewHeight>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "inherit" }}
      >
        {" "}
        <Grid item>
          <CircularProgress color="secondary" />
        </Grid>
      </Grid>
    </SectionWrapper>
  );
}
