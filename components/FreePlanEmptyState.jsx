import React from "react"
import { Box, Heading, Text, Button } from "@chakra-ui/core"
import DashboardShell from "./DashboardShell"

const FreePlanEmptyState = () => (
  <DashboardShell>
    <Box
      width='100%'
      backgroundColor='whiteAlpha.600'
      borderRadius={10}
      p={10}
      shadow={5}
      opacity={1}>
      <Heading>Get feedback on your sites almost instantly</Heading>
      <Text>Start today / Grow faster with our service 🧐</Text>
      <Button>Upgrade plan</Button>
    </Box>
  </DashboardShell>
)

export default FreePlanEmptyState
