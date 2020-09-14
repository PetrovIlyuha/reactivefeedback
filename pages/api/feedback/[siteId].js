import { getAllFeedback } from "@/lib/db-admin"

export default async (req, res) => {
  const { feedback, error } = await getAllFeedback(req.query.siteId)
  if (error) {
    res.status(500).json({ error })
  }
  res.status(200).json({ feedback })
}
