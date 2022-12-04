import { Box, Typography, Icon, Grid, Card } from "@material-ui/core";


function MiniStatisticsCard({ bgColor, title, count, percentage, icon, direction }) {
  return (
    <Card style={{borderRadius: 10, boxShadow: 3}}>
      <Box 
      bgColor={bgColor} 
      variant="gradient" 
      >
        <Box p={2}>
          <Grid container alignItems="center">
            {/* {direction === "left" ? (
              <Grid item>
                <Box
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  borderRadius="50%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null} */}
            <Grid item xs={8}>
              <Box ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <Typography
                  variant="button"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={bgColor === "white" ? "dark" : "white"}
                >
                  {count}{" "}
                  <Typography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            {/* {direction === "right" ? (
              <Grid item xs={4}>
                <Box
                  variant="gradient"
                  bgColor={bgColor === "white" ? icon.color : "white"}
                  color={bgColor === "white" ? "white" : "dark"}
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="md"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </Box>
              </Grid>
            ) : null} */}
          </Grid>
        </Box>
      </Box>
    </Card>
  );
}

export default MiniStatisticsCard;
