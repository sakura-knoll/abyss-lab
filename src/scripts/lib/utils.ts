export function runScript(method: () => Promise<void>) {
  return method()
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
