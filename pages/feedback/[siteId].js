import React, { useRef, useState } from "react"
import { useRouter } from "next/router"

import Feedback from "@/components/feedback/Feedback"
import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/core"

import { getAllFeedback, getAllSites } from "@/lib/db-admin"
import { useAuth } from "@/lib/auth"
import { createFeedback } from "@/lib/firestore"

export async function getStaticProps(context) {
  const siteId = context.params.siteId
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: { initialFeedback: feedback },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString(),
    },
  }))
  return {
    paths,
    fallback: false,
  }
}

const SiteFeedback = ({ initialFeedback }) => {
  const auth = useAuth()
  const router = useRouter()
  const inputEl = useRef(null)
  const [allFeedback, setAllFeedback] = useState(initialFeedback)
  const { siteId } = router.query
  const onSubmit = e => {
    e.preventDefault()
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: "pending",
    }
    setAllFeedback([newFeedback, ...allFeedback])
    createFeedback(newFeedback)
  }
  return (
    <Box
      display='flex'
      flexDirection='column'
      mt={3}
      width='full'
      maxWidth='700px'
      margin='0 auto'>
      <Box as='form' onSubmit={onSubmit}>
        <FormControl my={8}>
          <FormLabel htmlFor='comment'>Comment</FormLabel>
          <Input ref={inputEl} type='comment' id='comment' />
          <Button
            mt={4}
            type='submit'
            backgroundColor='green.900'
            color='white'
            _hover={{ bg: "green.700" }}
            _active={{ bg: "gray.800", transform: "scale(0.95)" }}>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map(feedback => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  )
}

export default SiteFeedback
