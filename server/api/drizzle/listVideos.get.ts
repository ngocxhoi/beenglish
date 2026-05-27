export default defineEventHandler((event) => {
  const { level, topic } = getQuery(event)

  return {
    level,
    topic
  }
})
