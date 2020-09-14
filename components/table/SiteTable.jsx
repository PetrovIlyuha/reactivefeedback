import React from "react"
import { Box, Skeleton, Link } from "@chakra-ui/core"
import NextLink from "next/link"
import { Table, Tr, Th, Td } from "./Table"
import { parseISO, format } from "date-fns"

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map(site => (
          <Box as='tr' key={site.url}>
            <Td fontWeight='bold'>{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <NextLink
                href='/feedback/[siteId]'
                as={`/feedback/${site.id}`}
                passHref>
                <Link>View Feedback</Link>
              </NextLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), "PPpp")}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default SiteTable
