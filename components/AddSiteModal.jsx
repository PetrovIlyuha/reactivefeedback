import { useRef } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  Input,
  FormControl,
} from "@chakra-ui/core"
import { useToast } from "@chakra-ui/core"
import { useForm } from "react-hook-form"
import { createSiteInFirebase } from "@/lib/firestore"
import { useAuth } from "@/lib/auth"
import { mutate } from "swr"

function AddSiteModal({ children }) {
  const { register, handleSubmit } = useForm()
  const toast = useToast()
  const auth = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { data } = useSWR("/api/sites", fetcher)

  const createSite = ({ name, url }) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }
    createSiteInFirebase(newSite)
    toast({
      title: "Success!",
      description: "We've created your site.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
    mutate(
      ["/api/sites", auth.user.token],
      async data => {
        return { sites: [...data.sites, newSite] }
      },
      false
    )
    onClose()
  }

  const initialRef = useRef()

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        _hover={{ bg: "gray.700" }}
        _active={{ bg: "gray.800", transform: "scale(0.95)" }}>
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(createSite)}>
          <ModalHeader fontWeight='bold'>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                name='name'
                ref={register({ required: true })}
                placeholder='My site Name'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name='url'
                ref={register({ required: true })}
                placeholder='https://website.com'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              mr={3}
              variantColor='gray'
              variant='outline'>
              Cancel
            </Button>
            <Button variantColor='blue' mr={3} type='submit'>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
