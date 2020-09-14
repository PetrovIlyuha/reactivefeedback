import React from "react"
import {
  Flex,
  Icon,
  Link,
  Box,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
} from "@chakra-ui/core"
import { withRouter } from "next/router"

import { useAuth } from "@/lib/auth"
import AddSiteModal from "./AddSiteModal"

const DashboardShell = ({ children, router }) => {
  const { user, signout } = useAuth()

  return (
    <Flex flexDirection='column'>
      <Flex
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        height={60}
        mt={3}
        p={4}>
        <Stack
          isInline
          fontWeight='bold'
          spacing={4}
          justifyContent='space-between'
          alignItems='center'
          ml={4}>
          <Icon name='logo' size={70} />
          <Link>Sites</Link>
          <Link>FeedBack</Link>
        </Stack>
        <Box
          display='flex'
          flexDirection='row'
          width='200px'
          justifyContent='space-around'
          height={30}
          alignItems='center'
          fontWeight='bold'
          textAlign='center'
          color='whiteAlpha.500'>
          <Button
            variantColor='teal'
            mr={2}
            variant='ghost'
            onClick={() => {
              signout()
              router.push("/")
            }}>
            Log Out
          </Button>
          <Avatar size='sm' src={user?.photoUrl} />
        </Box>
      </Flex>
      <Flex
        backgroundColor='gray.200'
        justifyContent='center'
        alignItems='center'
        direction='column'
        mt={5}>
        <Flex maxWidth='900px' m={10} maxWidth={800} direction='column'>
          <Breadcrumb my={2}>
            <BreadcrumbItem>
              <BreadcrumbLink>Sites \</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex width='100%' justifyContent='space-between'>
            <Heading mb={4}>Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default withRouter(DashboardShell)
