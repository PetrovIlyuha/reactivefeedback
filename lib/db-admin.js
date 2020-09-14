import { db } from "./firebase-admin"
import { compareDesc, parseISO } from "date-fns"

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection("feedback")
      .where("siteId", "==", siteId)
      .get()
    const feedback = []

    snapshot.forEach(doc => {
      feedback.push({ id: doc.id, ...doc.data() })
    })
    feedback.sort((prev, next) =>
      compareDesc(parseISO(prev.createdAt), parseISO(next.createdAt))
    )
    return { feedback }
  } catch (err) {
    console.error(`Error fetching feedback from firebase: ${err.message}`)
    return { err }
  }
}

export async function getAllSites() {
  try {
    const snapshot = await db.collection("sites").get()
    let sites = []
    snapshot.forEach(doc => {
      sites.push({ id: doc.id, ...doc.data() })
    })
    return { sites }
  } catch (error) {
    return { error }
  }
}

export async function getUserSites(userId) {
  const snapshot = await db
    .collection("sites")
    .where("authorId", "==", userId)
    .get()
  let sites = []
  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() })
  })
  return sites
}
