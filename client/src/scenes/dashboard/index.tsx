import { Box, useMediaQuery } from '@mui/material'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'

//each box in the template is referenced by it's component 'a, b......'. Since there are 10 components, we split them up into letters for formatting
const gridTemplateLargeScreens = `
 "a b c"
 "a b c"
 "a b c"
 "a b f"
 "d e f"
 "d e f"
 "d h i"
 "g h i"
 "g h j"
 "g h j"
`

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dashboard = () => {
  //checks size of screen/window and sizes the components accordingly
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)")
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens ? {
          // below we're splitting the columns into 3, and none of the column shouldn't be smaller than 370px, but if our window is large enough, it can split into 3 columns as opposed to staying as 1
          gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
          // below we're having 10 total values, and each "unit" is 60px, for eg: a = 60*4 = 240px, but if our window is small enough, it can stay in 1 column with 10 units stacked and scrolled with
          gridTemplateRows: "repeat(10, minmax(70px, 1fr))",
          gridTemplateAreas: gridTemplateLargeScreens,
        } : {
          gridAutoColumns: "1fr",
          gridAutoRows: "80px",
          gridTemplateAreas: gridTemplateSmallScreens,
        }
      }
    >
      
      {/* each element represents a component above, i.e use "a" to rep 1st comp, "b" for 2nd and so on.. */}
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  )
}

export default Dashboard