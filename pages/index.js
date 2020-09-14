import Head from "next/head"
import Link from "next/link"
import {
  Button,
  Heading,
  Text,
  Code,
  Flex,
  Image,
  Icon,
  Box,
} from "@chakra-ui/core"

import { useAuth } from "@/lib/auth"

export default function Home() {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('react-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
        <title>Reactive Feedback</title>
      </Head>
      <Flex
        as='main'
        direction='column'
        align='center'
        justify='center'
        height='100vh'>
        <Icon name='logo' size='120px' mb={-2} mr={4} />
        <Heading mb={4}>Reactive FeedBack</Heading>
        <Box width={500} my={2} shadow={100}>
          <Text
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            p={10}
            textAlign='center'
            fontWeight='bold'
            color='pink.500'>
            "Reactive Feedback" &copy; was made with the consideration of
            creating a SaaS that provides the users an ability to collect all
            sites you are promoting and work with the feedback for those sites
            from one place!
          </Text>
        </Box>
        {!auth.user ? (
          <Button variantColor='teal' onClick={auth.signInWithGithub}>
            Log In
          </Button>
        ) : (
          <Flex direction='row' width='300px' justify='center'>
            <Link href='/dashboard'>
              <Button href='/dashboard' variantColor='teal'>
                Dashboard
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </div>
  )
}
