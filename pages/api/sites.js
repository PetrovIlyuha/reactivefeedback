import { getUserSites } from "@/lib/db-admin"
import { auth } from "@/lib/firebase-admin"

const getSites = async (req, res) => {
  try {
    const { token } = req.headers
    const { uid } = await auth.verifyIdToken(token)
    const sites = await getUserSites(uid)
    res.status(200).json({ sites })
  } catch (err) {
    res.status(500).json({ error: error })
  }
}

export default getSites
