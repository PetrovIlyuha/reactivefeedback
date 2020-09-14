import React from "react"
import { Heading, Text, Button, Flex } from "@chakra-ui/core"
import AddSiteModal from "./AddSiteModal"

const EmptyState = () => (
  <Flex
    width='100%'
    backgroundColor='whiteAlpha.800'
    borderRadius={10}
    justify='center'
    align='center'
    direction='column'
    p={16}
    shadow={5}
    opacity={1}>
    <Heading style={{ textAlign: "center" }} mb={2}>
      You haven't added sites to track feedback yet
    </Heading>
    <Text p={3}>
      Welcome, let's get started{" "}
      <span role='img' aria-label='wit-face'>
        🧐
      </span>{" "}
    </Text>
    <AddSiteModal>
      Add your First Site{" "}
      <span role='img' aria-label='power to you'>
        💪
      </span>{" "}
    </AddSiteModal>
  </Flex>
)

export default EmptyState
